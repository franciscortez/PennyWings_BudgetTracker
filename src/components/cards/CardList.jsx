import React from 'react'
import CardItem from './CardItem'
import LoadingSpinner from '../common/LoadingSpinner'
import { motion as Motion, AnimatePresence } from 'motion/react'

export default function CardList({ cards, loading, onEdit, onDelete }) {
  if (loading) return <LoadingSpinner />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => (
          <Motion.div
            layout
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.05 }}
          >
            <CardItem 
              card={card} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
