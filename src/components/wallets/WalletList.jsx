import React from 'react'
import WalletItem from '../wallets/WalletItem'
import LoadingSpinner from '../common/LoadingSpinner'
import { motion as Motion, AnimatePresence } from 'motion/react'

export default function WalletList({ wallets, loading, onEdit, onDelete }) {
  if (loading) return <LoadingSpinner />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {wallets.map((wallet, index) => (
          <Motion.div
            layout
            key={wallet.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.05 }}
          >
            <WalletItem 
              wallet={wallet} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          </Motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
