import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useTransactions = (limit = 10) => {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          category:categories(name, icon, color),
          card:bank_cards(card_name, color),
          wallet:e_wallets(wallet_name, color)
        `)
        .eq('user_id', user?.id)
        .order('transaction_date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      setTransactions(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user?.id, limit])

  useEffect(() => {
    if (user) {
      fetchTransactions()

      const subscription = supabase
        .channel('transactions_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` }, 
          () => fetchTransactions()
        )
        .subscribe()

      return () => {
        supabase.removeChannel(subscription)
      }
    }
  }, [user, fetchTransactions])

  return {
    transactions,
    loading,
    error,
    refreshTransactions: fetchTransactions
  }
}
