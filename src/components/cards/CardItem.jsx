import React from 'react'
import { PencilSquareIcon, TrashIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'

export default function CardItem({ card, onEdit, onDelete }) {
  const bgColor = card.color || '#F472B6' // Default pink-400
  
  return (
    <div className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-pink-50 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
      <div 
        className="relative h-48 rounded-[2rem] p-6 text-white overflow-hidden shadow-lg mb-4"
        style={{ 
          background: `linear-gradient(135deg, ${bgColor}, ${bgColor}CC)`,
          boxShadow: `0 10px 20px -5px ${bgColor}66`
        }}
      >
        {/* Card Pattern/Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 translate-y-[-10px] blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-x-[-10px] translate-y-10 blur-xl"></div>
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">
                {card.card_type}
              </p>
              <h3 className="text-xl font-bold tracking-tight leading-tight">
                {card.card_name}
              </h3>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
              <span className="text-xl">💳</span>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[8px] opacity-70 font-mono">**** **** ****</span>
              <span className="text-sm font-mono font-bold">{card.last_four || '0000'}</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] opacity-70 uppercase font-medium">Balance</p>
                <p className="text-2xl font-black tracking-tight">
                  ₱{Number(card.balance || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onEdit(card)}
            className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-all"
            title="Edit Card"
          >
            <PencilSquareIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete(card.id)}
            className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
            title="Delete Card"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: card.is_active !== false ? '#10B981' : '#EF4444' }}></div>
      </div>
    </div>
  )
}
