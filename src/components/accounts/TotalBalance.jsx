import React from 'react'
import Icon from '../Icon'

export default function TotalBalance({ total, onAddClick }) {
  return (
    <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg shadow-pink-200/50 mb-8 overflow-hidden relative">
      {/* Decorative butterfly spots */}
      <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-pink-400/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-pink-100 text-sm font-medium mb-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-pink-200 rounded-full animate-pulse"></span>
            Total Available Balance
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            ₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        
        <button
          onClick={onAddClick}
          className="bg-white text-pink-600 px-6 py-3 rounded-2xl font-bold shadow-sm hover:bg-pink-50 transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
        >
          <div className="bg-pink-100 rounded-lg p-1 group-hover:bg-pink-200 transition-colors">
            <Icon name="plus" color="currentColor" className="w-5 h-5" />
          </div>
          Add New Account
        </button>
      </div>
    </div>
  )
}
