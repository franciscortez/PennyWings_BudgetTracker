import React, { useState, useMemo } from 'react'
import Layout from '../../components/Layout'
import TotalBalance from '../../components/accounts/TotalBalance'
import { useBankCards } from '../../hooks/useBankCards'
import { useEWallets } from '../../hooks/useEWallets'
import CardList from '../../components/cards/CardList'
import WalletList from '../../components/wallets/WalletList'
import AccountWizard from '../../components/accounts/AccountWizard'
import { CreditCardIcon, WalletIcon } from '@heroicons/react/24/outline'

export default function Accounts() {
  const { cards, loading: loadingCards, addCard, deleteCard } = useBankCards()
  const { wallets, loading: loadingWallets, addWallet, deleteWallet } = useEWallets()
  
  const [activeTab, setActiveTab] = useState('cards')
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  const totalBalance = useMemo(() => {
    const cardTotal = cards.reduce((sum, card) => sum + Number(card.balance || 0), 0)
    const walletTotal = wallets.reduce((sum, wallet) => sum + Number(wallet.balance || 0), 0)
    return cardTotal + walletTotal
  }, [cards, wallets])

  const handleAddAccount = () => {
    setIsWizardOpen(true)
  }

  const handleEditCard = () => {
    alert('Edit feature is being updated to the new flow. Stay tuned!')
  }

  const handleEditWallet = () => {
    alert('Edit feature is being updated to the new flow. Stay tuned!')
  }

  const handleDeleteCard = async (id) => {
    if (window.confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
      const { error } = await deleteCard(id)
      if (error) alert(error)
    }
  }

  const handleDeleteWallet = async (id) => {
    if (window.confirm('Are you sure you want to delete this wallet? This action cannot be undone.')) {
      const { error } = await deleteWallet(id)
      if (error) alert(error)
    }
  }

  const handleWizardSubmit = async (type, data) => {
    if (type === 'ewallet') {
      const { error } = await addWallet(data)
      if (error) throw error
    } else {
      const { error } = await addCard(data)
      if (error) throw error
    }
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">My Accounts</h1>
        <p className="text-gray-500">Manage your bank cards and digital wallets in one place.</p>
      </div>

      <TotalBalance 
        total={totalBalance} 
        onAddClick={handleAddAccount} 
      />

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-pink-100/30 backdrop-blur-md rounded-[2rem] mb-10 w-fit border border-pink-100">
        <button
          onClick={() => setActiveTab('cards')}
          className={`flex items-center gap-2 px-8 py-3 rounded-[1.2rem] font-bold transition-all ${
            activeTab === 'cards'
              ? 'bg-white text-pink-600 shadow-xl shadow-pink-200/50 scale-105'
              : 'text-gray-400 hover:text-pink-400'
          }`}
        >
          <CreditCardIcon className="w-5 h-5" />
          Bank Cards
          <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${
            activeTab === 'cards' ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {cards.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('wallets')}
          className={`flex items-center gap-2 px-8 py-3 rounded-[1.2rem] font-bold transition-all ${
            activeTab === 'wallets'
              ? 'bg-white text-pink-600 shadow-xl shadow-pink-200/50 scale-105'
              : 'text-gray-400 hover:text-pink-400'
          }`}
        >
          <WalletIcon className="w-5 h-5" />
          E-Wallets
          <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${
            activeTab === 'wallets' ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {wallets.length}
          </span>
        </button>
      </div>

      {/* Content Area */}
      <div className="pb-20">
        {activeTab === 'cards' ? (
          <CardList 
            cards={cards} 
            loading={loadingCards} 
            onEdit={handleEditCard}
            onDelete={handleDeleteCard}
            onAddClick={handleAddAccount}
          />
        ) : (
          <WalletList 
            wallets={wallets} 
            loading={loadingWallets} 
            onEdit={handleEditWallet}
            onDelete={handleDeleteWallet}
            onAddClick={handleAddAccount}
          />
        )}
      </div>

      {/* Unified Wizard */}
      <AccountWizard 
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleWizardSubmit}
      />
    </Layout>
  )
}
