import React, { useState } from 'react'
import Layout from "../components/Layout";
import { useTransactions } from "../hooks/useTransactions";
import TransactionForm from "../components/transactions/TransactionForm";
import Icon from "../components/Icon";
import Swal from 'sweetalert2'

export default function Transactions() {
  const { transactions, loading, addTransaction, deleteTransaction } = useTransactions(50);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const handleAddTransaction = async (data) => {
    const { error } = await addTransaction(data);
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Transaction Failed',
        text: error,
        confirmButtonColor: '#EC4899',
        customClass: {
          popup: 'rounded-[2.5rem]',
          confirmButton: 'rounded-2xl px-8 py-3'
        }
      });
    }
  };

  const handleDeleteTransaction = async (tx) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the transaction and revert the account balance!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EC4899',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Yes, Delete it',
      customClass: {
        popup: 'rounded-[2.5rem]',
        confirmButton: 'rounded-2xl px-8 py-3',
        cancelButton: 'rounded-2xl px-8 py-3'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await deleteTransaction(tx);
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            confirmButtonColor: '#EC4899',
            customClass: {
              popup: 'rounded-[2.5rem]',
              confirmButton: 'rounded-2xl px-8 py-3'
            }
          });
        }
      }
    });
  };

  const filteredTransactions = transactions?.filter(tx => {
    const matchesSearch = (tx.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (tx.category?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="space-y-8 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Transaction History</h1>
            <p className="text-gray-500 font-medium">Keep track of every wing your pennies take.</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-pink-500 text-white rounded-[2rem] font-black shadow-xl shadow-pink-200 hover:bg-pink-600 hover:translate-y-[-4px] transition-all"
          >
            <Icon name="plus" color="white" className="w-5 h-5" />
            New Transaction
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-4 items-center bg-white/50 backdrop-blur-md p-4 rounded-[2.5rem] border border-pink-100 shadow-sm">
          <div className="relative flex-1 w-full">
            <Icon name="search" color="#F9A8D4" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by description or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-pink-100 rounded-[1.8rem] focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-gray-700"
            />
          </div>
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            {['all', 'income', 'expense', 'withdrawal'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                  filterType === type 
                    ? 'bg-gray-900 text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-400 hover:text-pink-500 hover:bg-pink-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-black tracking-widest uppercase animate-pulse">Fetching Ledger...</p>
            </div>
          ) : filteredTransactions?.length > 0 ? (
            filteredTransactions.map(tx => (
              <div key={tx.id} className="group relative flex items-center gap-6 p-6 bg-white border border-pink-50 rounded-[3rem] hover:shadow-2xl hover:shadow-pink-100/50 hover:translate-x-3 transition-all">
                {/* Category Icon */}
                <div 
                  className="w-20 h-20 rounded-[2rem] flex items-center justify-center p-5 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: tx.category?.color || '#F3F4F6' }}
                >
                  <Icon 
                    name={tx.type === 'income' ? 'income' : tx.type === 'withdrawal' ? 'withdrawal' : 'expense'} 
                    color="white" 
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-xl font-extrabold text-gray-900 truncate tracking-tight">{tx.description || tx.category?.name}</p>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' :
                      tx.type === 'expense' ? 'bg-pink-100 text-pink-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {tx.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <p className="text-sm font-bold text-pink-400 flex items-center gap-2 uppercase tracking-widest">
                       {tx.category?.name || 'Uncategorized'}
                    </p>
                    <span className="text-gray-200">•</span>
                    <p className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                      <Icon name="clock" color="currentColor" className="w-4 h-4" />
                      {new Date(tx.transaction_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <span className="text-gray-200 uppercase tracking-widest">•</span>
                    <p className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                      <Icon name="bank" color="currentColor" className="w-4 h-4" />
                      {tx.card?.card_name || tx.wallet?.wallet_name || 'Cash'}
                    </p>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className={`text-3xl font-black tracking-tighter ${tx.type === 'income' ? 'text-emerald-500' : 'text-gray-900'}`}>
                      {tx.type === 'income' ? '+' : '-'}₱{Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                      {tx.payment_method}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDeleteTransaction(tx)}
                    className="p-4 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Icon name="delete" color="currentColor" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center bg-gray-50/50 rounded-[4rem] border-4 border-dashed border-pink-100/50">
              <div className="w-24 h-24 bg-pink-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner p-6">
                 <Icon name="bank" color="#F9A8D4" className="w-12 h-12" />
              </div>
              <p className="text-xl font-black text-gray-400 uppercase tracking-widest mb-4">No records found</p>
              <p className="text-gray-400 max-w-xs mx-auto font-medium">
                Try adjusting your filters or record a new transaction to see it here.
              </p>
            </div>
          )}
        </div>
      </div>

      <TransactionForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleAddTransaction} 
      />
    </Layout>
  );
}
