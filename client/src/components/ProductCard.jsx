import { Sparkles, ShoppingBag } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const productImages = [
  '/images/products/default-milk-tea.jpg',
  '/images/products/default-matcha.jpg',
  '/images/products/default-fruit-tea.jpg',
]

export default function ProductCard({ product, index = 0, onSelect }) {
  const { localizeProduct, formatCurrency, t } = useLanguage()
  const localized = localizeProduct(product)
  const fallbackImage = localized?.image || productImages[index % productImages.length]

  return (
    <div
      onClick={() => onSelect && onSelect(localized)}
      className="product-card group bg-white rounded-2xl shadow-md cursor-pointer flex flex-col justify-between border border-gray-100/80"
    >
      {/* Image container */}
      <div className="relative rounded-t-2xl bg-gradient-to-b from-primary-50/70 via-lime-50/30 to-white p-6 pb-2">
        {/* Soft radial glow when hovering */}
        <div className="absolute inset-2 rounded-full bg-radial from-primary-300/35 via-primary-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-lg" />

        {localized.is_new && (
          <span className="absolute top-4 left-4 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Sparkles size={12} />
            {t('common.new')}
          </span>
        )}
        {localized.is_best_seller && (
          <span className="absolute top-4 right-4 z-20 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {t('common.bestSeller')}
          </span>
        )}
        <div className="w-full h-48 flex items-center justify-center relative">
          <img
            src={fallbackImage}
            alt={localized.name}
            className="product-image max-h-40 w-auto object-contain drop-shadow-md z-10"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="product-card-content p-5 pt-3 pb-6 flex flex-col flex-1 justify-between rounded-b-2xl bg-white">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1.5 font-[family-name:var(--font-display)] group-hover:text-primary-500 transition-colors line-clamp-1">
            {localized.name}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed h-10">
            {localized.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xl font-bold text-primary-500">
              {formatCurrency(localized.price)}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">
              {t('common.size')} {localized.size || 'L'}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (onSelect) onSelect(localized)
            }}
            className="w-full mt-3.5 bg-primary-50 text-primary-600 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={15} />
            <span>{t('common.viewDetails')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
