import { useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

const TX_SELECT = `
  *,
  category:categories(name, icon, color),
  card:bank_cards(card_name, color),
  wallet:e_wallets(wallet_name, color)
`;

// Helper: atomically update a bank card or wallet balance by a delta
const applyBalanceDelta = async (cardId, walletId, delta) => {
  if (cardId) {
    await supabase.rpc("update_card_balance", { p_id: cardId, p_delta: delta });
  } else if (walletId) {
    await supabase.rpc("update_wallet_balance", { p_id: walletId, p_delta: delta });
  }
};

export const useTransactions = ({ page = 1, pageSize = 10, search = '', type = 'all' } = {}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const transactionsQuery = useQuery({
    queryKey: ["transactions", user?.id, page, pageSize, search, type],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("transactions")
        .select(TX_SELECT, { count: 'exact' })
        .eq("user_id", user?.id)
        .order("transaction_date", { ascending: false })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (type !== 'all') {
        query = query.eq('type', type);
      }

      if (search) {
        query = query.ilike('description', `%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) throw error;
      return { 
        data: data || [], 
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize)
      };
    },
    enabled: !!user,
  });

  const invalidateAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["recent_transactions", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["monthly_stats", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["bank_cards", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["e_wallets", user?.id] });
  }, [queryClient, user?.id]);

  const addMutation = useMutation({
    mutationFn: async (transactionData) => {
      const { data, error } = await supabase
        .from("transactions")
        .insert([{ ...transactionData, user_id: user?.id }])
        .select()
        .single();

      if (error) throw error;

      // Update account balance
      const amount = Number(data.amount);
      const delta = data.type === "income" ? amount : -amount;
      await applyBalanceDelta(data.card_id, data.wallet_id, delta);

      return data;
    },
    onSuccess: () => {
      invalidateAll();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (transaction) => {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transaction.id);

      if (error) throw error;

      // Revert account balance
      const amount = Number(transaction.amount);
      const revertDelta = transaction.type === "income" ? -amount : amount;
      await applyBalanceDelta(transaction.card_id, transaction.wallet_id, revertDelta);
    },
    onSuccess: () => {
      invalidateAll();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates, oldTransaction }) => {
      const { data, error } = await supabase
        .from("transactions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      const newData = { ...oldTransaction, ...updates };

      // Calculate and apply balance delta atomically
      const oldAmount = Number(oldTransaction.amount);
      const newAmount = Number(newData.amount);
      const oldDelta = oldTransaction.type === "income" ? oldAmount : -oldAmount;
      const newDelta = newData.type === "income" ? newAmount : -newAmount;

      const sameAccount =
        oldTransaction.card_id === newData.card_id &&
        oldTransaction.wallet_id === newData.wallet_id;

      if (sameAccount) {
        const netDelta = newDelta - oldDelta;
        if (netDelta !== 0) {
          await applyBalanceDelta(newData.card_id, newData.wallet_id, netDelta);
        }
      } else {
        await applyBalanceDelta(
          oldTransaction.card_id,
          oldTransaction.wallet_id,
          -oldDelta
        );
        await applyBalanceDelta(newData.card_id, newData.wallet_id, newDelta);
      }

      return data;
    },
    onSuccess: () => {
      invalidateAll();
    },
  });

  useEffect(() => {
    if (user) {
      const subscription = supabase
        .channel("transactions_changes")
        .on("postgres_changes",
          { event: "*", schema: "public", table: "transactions", filter: `user_id=eq.${user.id}` },
          () => invalidateAll()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [user, queryClient, invalidateAll]);

  const queryResult = transactionsQuery.data || { data: [], totalCount: 0, totalPages: 0 };

  return {
    transactions: queryResult.data,
    totalCount: queryResult.totalCount,
    totalPages: queryResult.totalPages,
    loading: transactionsQuery.isLoading || addMutation.isPending || deleteMutation.isPending || updateMutation.isPending,
    error: transactionsQuery.error || addMutation.error || deleteMutation.error || updateMutation.error,
    addTransaction: addMutation.mutateAsync,
    updateTransaction: (id, updates, oldTransaction) => updateMutation.mutateAsync({ id, updates, oldTransaction }),
    deleteTransaction: deleteMutation.mutateAsync,
    refreshTransactions: () => queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] }),
  };
};
