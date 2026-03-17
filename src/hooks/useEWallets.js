import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useEWallets = () => {
  const { user } = useAuth()
  const [wallets, setWallets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWallets = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('e_wallets')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setWallets(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  const addWallet = async (walletData) => {
    try {
      const { data, error } = await supabase
        .from('e_wallets')
        .insert([{ ...walletData, user_id: user?.id }])
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const updateWallet = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('e_wallets')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const deleteWallet = async (id) => {
    try {
      const { error } = await supabase
        .from('e_wallets')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { error: null }
    } catch (err) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    if (user) {
      fetchWallets()

      // Real-time subscription
      const subscription = supabase
        .channel('e_wallets_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'e_wallets', filter: `user_id=eq.${user.id}` }, 
          () => {
            fetchWallets()
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(subscription)
      }
    }
  }, [user, fetchWallets])

  return {
    wallets,
    loading,
    error,
    addWallet,
    updateWallet,
    deleteWallet,
    refreshWallets: fetchWallets
  }
}
