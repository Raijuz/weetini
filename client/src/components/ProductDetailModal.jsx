import { useState } from 'react'
import { X, Plus, Minus, Check, Sparkles, AlertCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function ProductDetailModal({ product, isOpen, onClose }) {
  const { lang, t, dict, localizeProduct, formatCurrency } = useLanguage()
  const localized = localizeProduct(product)

  const [size, setSize] = useState('L')
  const [ice, setIce] = useState('100%')
  const [sugar, setSugar] = useState('100%')
  const [selectedToppings, setSelectedToppings] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  if (!isOpen || !localized) return null

  const toppingsList = dict.toppingsList || []
  const sizePriceAdjustment = size === 'XL' ? 6000 : 0
  const toppingsTotal = selectedToppings.reduce((sum, topId) => {
    const top = toppingsList.find((t) => t.id === topId)
    return sum + (top ? top.price : 0)
  }, 0)
  const unitPrice = (localized.price || 30000) + sizePriceAdjustment + toppingsTotal
  const totalPrice = unitPrice * quantity

  const toggleTopping = (toppingId) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    )
  }

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      onClose()
    }, 1200)
  }

  const iceOptions = lang === 'en'
    ? ['100% Ice', '70% Ice', '50% Ice', 'No Ice']
    : ['100%', '70%', '50%', 'Không đá']

  const sizeOptions = [
    { s: 'L', label: lang === 'en' ? 'Size L (Standard)' : 'Size L (Tiêu chuẩn)', plus: 0 },
    { s: 'XL', label: lang === 'en' ? 'Size XL (Large)' : 'Size XL (Khổng lồ)', plus: 6000 },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-lime-50/50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider font-semibold text-primary-600">
              {t('modal.drinkDetails')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Top section: image & title */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-tr from-lime-50 to-amber-50 flex items-center justify-center p-4 shrink-0 shadow-inner">
              <img
                src={localized.image || '/images/products/default-milk-tea.jpg'}
                alt={localized.name}
                className="w-full h-full object-contain drop-shadow-md animate-float"
              />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {localized.is_new && (
                  <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles size={11} /> {t('common.new')}
                  </span>
                )}
                {localized.is_best_seller && (
                  <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {t('common.bestSeller')}
                  </span>
                )}
                {localized.categoryName && (
                  <span className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                    {localized.categoryName}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
                {localized.name}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {localized.description}
              </p>
              <div className="text-2xl font-extrabold text-primary-500 pt-1">
                {formatCurrency(localized.price)}
              </div>
            </div>
          </div>

          {/* Product details info pill */}
          {localized.ingredients && (
            <div className="bg-[#fbfcf8] border border-amber-200/60 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle size={16} className="text-accent-gold shrink-0 mt-0.5" />
              <div>
                <strong>{t('modal.ingredientsTitle')}</strong> {localized.ingredients}
              </div>
            </div>
          )}

          {/* Size selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t('modal.sizeChoose')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {sizeOptions.map((item) => (
                <button
                  key={item.s}
                  type="button"
                  onClick={() => setSize(item.s)}
                  className={`p-3 rounded-xl border-2 text-left transition-all flex justify-between items-center cursor-pointer ${
                    size === item.s
                      ? 'border-primary-500 bg-primary-50/50 text-primary-800 font-semibold'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-gray-500">
                    {item.plus > 0 ? `+${formatCurrency(item.plus)}` : (lang === 'en' ? 'Default' : 'Mặc định')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness & Ice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {t('modal.sugarChoose')}
              </label>
              <div className="flex flex-wrap gap-2">
                {['100%', '70%', '50%', '30%', '0%'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSugar(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      sugar === lvl
                        ? 'border-primary-500 bg-primary-500 text-white font-bold'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {t('modal.iceChoose')}
              </label>
              <div className="flex flex-wrap gap-2">
                {iceOptions.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setIce(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      ice === lvl
                        ? 'border-primary-500 bg-primary-500 text-white font-bold'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toppings */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex justify-between">
              <span>{t('modal.toppingsChoose')}</span>
              <span className="font-normal text-gray-400">
                {lang === 'en' ? 'Multiple choice' : 'Chọn nhiều'}
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {toppingsList.map((top) => {
                const selected = selectedToppings.includes(top.id)
                return (
                  <button
                    key={top.id}
                    type="button"
                    onClick={() => toggleTopping(top.id)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                      selected
                        ? 'border-primary-500 bg-primary-50/70 text-primary-900 font-semibold'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          selected
                            ? 'bg-primary-500 border-primary-500 text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {selected && <Check size={12} />}
                      </div>
                      <span>{top.name}</span>
                    </div>
                    <span className="text-gray-500">
                      +{formatCurrency(top.price)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
          <div className="flex items-center border border-gray-300 rounded-xl bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 text-sm font-bold text-gray-800">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex-1 py-3 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
              isAdded
                ? 'bg-primary-600'
                : 'bg-primary-500 hover:bg-primary-600 hover:shadow-primary-500/30'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={18} />
                <span>{t('modal.addedSuccess')}</span>
              </>
            ) : (
              <>
                <span>{lang === 'en' ? 'Add to Order' : 'Thêm vào đơn hàng'}</span>
                <span>•</span>
                <span>{formatCurrency(totalPrice)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
