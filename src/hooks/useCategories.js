import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

export const useCategories = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .or(`user_id.is.null,user_id.eq.${user?.id}`)
        .order("name", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  return {
    categories: categoriesQuery.data || [],
    loading: categoriesQuery.isLoading,
    error: categoriesQuery.error,
    refreshCategories: () =>
      queryClient.invalidateQueries({ queryKey: ["categories", user?.id] }),
  };
};
