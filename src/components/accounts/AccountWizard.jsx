import React, { useState, useEffect } from 'react'
import { XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

const COLORS = [
  '#F472B6', '#EC4899', '#DB2777', '#BE185D', 
  '#9333EA', '#8B5CF6', '#6366F1', '#3B82F6', 
  '#10B981', '#F59E0B', '#EF4444', '#1F2937'
]

const ACCOUNT_TYPES = [
  { id: 'digital', label: 'Digital Bank', icon: '📱' },
  { id: 'ewallet', label: 'E-Wallet', icon: '👛' },
  { id: 'traditional', label: 'Traditional Bank', icon: '🏛️' },
]

const PROVIDERS = {
  digital: ['Maya', 'Gotyme', 'Seabank', 'Tonik', 'CIMB', 'Uno Bank', 'Others'],
  ewallet: ['GCash', 'Maya Wallet', 'GrabPay', 'PayPal', 'Venmo', 'Others'],
  traditional: ['BDO', 'BPI', 'Metrobank', 'Unionbank', 'Security Bank', 'PNB', 'Landbank', 'Others']
}

export default function AccountWizard({ isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: '',
    provider: '',
    account_name: '',
    balance: '',
    color: COLORS[1],
    last_four: '', // for banks
    account_identifier: '', // for ewallets
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setFormData({
        type: '',
        provider: '',
        account_name: '',
        balance: '',
        color: COLORS[1],
        last_four: '',
        account_identifier: '',
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const isEWallet = formData.type === 'ewallet'
      const finalData = isEWallet ? {
        wallet_name: formData.account_name || formData.provider,
        wallet_type: formData.provider.toLowerCase().replace(' ', ''),
        balance: Number(formData.balance) || 0,
        account_identifier: formData.account_identifier,
        color: formData.color
      } : {
        card_name: formData.account_name || formData.provider,
        card_type: formData.type === 'traditional' ? 'savings' : 'debit',
        balance: Number(formData.balance) || 0,
        last_four: formData.last_four,
        color: formData.color
      }
      
      await onSubmit(formData.type, finalData)
      onClose()
    } catch (error) {
      console.error('Error creating account:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-pink-900/20 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button onClick={handleBack} className="p-2 hover:bg-pink-50 rounded-full text-gray-400 transition-colors">
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                Step {step} of 3
              </h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-pink-50 rounded-full text-gray-400 transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  s <= step ? 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'bg-pink-100'
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">What kind of account?</label>
                <div className="grid grid-cols-1 gap-3">
                  {ACCOUNT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, type: type.id })
                        handleNext()
                      }}
                      className="flex items-center gap-4 p-5 bg-pink-50/50 border-2 border-transparent hover:border-pink-200 hover:bg-white rounded-3xl transition-all group text-left"
                    >
                      <span className="text-3xl group-hover:scale-125 transition-transform">{type.icon}</span>
                      <span className="text-lg font-bold text-gray-700">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Select Provider</label>
                  <select
                    required
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className="w-full px-5 py-4 bg-pink-50/50 border border-pink-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-gray-700"
                  >
                    <option value="">Choose a bank/wallet...</option>
                    {PROVIDERS[formData.type]?.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Custom Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. My Savings"
                    value={formData.account_name}
                    onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                    className="w-full px-5 py-4 bg-pink-50/50 border border-pink-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-gray-700"
                  />
                </div>
                {formData.type !== 'ewallet' ? (
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Last 4 Digits</label>
                    <input
                      type="text"
                      maxLength="4"
                      placeholder="0000"
                      value={formData.last_four}
                      onChange={(e) => setFormData({ ...formData, last_four: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-5 py-4 bg-pink-50/50 border border-pink-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-gray-700 text-center tracking-[0.5em]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Phone / Email</label>
                    <input
                      type="text"
                      placeholder="0917..."
                      value={formData.account_identifier}
                      onChange={(e) => setFormData({ ...formData, account_identifier: e.target.value })}
                      className="w-full px-5 py-4 bg-pink-50/50 border border-pink-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-gray-700"
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.provider}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all disabled:opacity-30"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Initial Balance</label>
                  <div className="relative inline-block w-full">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl font-black text-pink-300">₱</span>
                    <input
                      autoFocus
                      required
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.balance}
                      onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                      className="w-full pl-16 pr-6 py-8 bg-pink-50/50 border-2 border-pink-100 rounded-[2.5rem] focus:border-pink-500 outline-none transition-all text-4xl font-black text-gray-800 text-center placeholder:text-pink-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Pick a theme</label>
                  <div className="flex flex-wrap justify-center gap-3">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-10 h-10 rounded-2xl transition-all transform hover:scale-110 ${
                          formData.color === color ? 'ring-4 ring-pink-500/20 scale-110' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-pink-200 hover:shadow-2xl hover:translate-y-[-4px] transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Finalize Account'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
