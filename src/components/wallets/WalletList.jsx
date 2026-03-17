import React from 'react'
import WalletItem from './WalletItem'
import { WalletIcon } from '@heroicons/react/24/outline'

export default function WalletList({ wallets, loading, onEdit, onDelete, onAddClick }) {
  if (loading) {
    return (
      <div className="col-span-full py-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-medium animate-pulse">Loading your wallets...</p>
      </div>
    )
  }

  if (wallets.length === 0) {
    return (
      <div className="col-span-full bg-white/50 border-2 border-dashed border-pink-200 rounded-[3rem] p-16 text-center shadow-inner">
        <div className="w-20 h-20 bg-pink-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <WalletIcon className="w-10 h-10 text-pink-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No digital wallets found</h3>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto">
          Connect your PayPal, GCash, or Venmo accounts to keep track of every penny.
        </p>
        <button 
          onClick={onAddClick}
          className="bg-pink-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all active:scale-95"
        >
          + Add E-Wallet
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {wallets.map(wallet => (
        <WalletItem 
          key={wallet.id} 
          wallet={wallet} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  )
}
