import { Sparkles } from 'lucide-react'
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
      className="product-card group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between border border-gray-100/80 hover:border-primary-200"
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 to-white p-6 pb-2">
        {localized.is_new && (
          <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Sparkles size={12} />
            {t('common.new')}
          </span>
        )}
        {localized.is_best_seller && (
          <span className="absolute top-4 right-4 z-10 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {t('common.bestSeller')}
          </span>
        )}
        <div className="w-full h-52 flex items-center justify-center">
          <img
            src={fallbackImage}
            alt={localized.name}
            className="product-image max-h-48 w-auto object-contain transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-1 drop-shadow-sm"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-3 flex flex-col flex-1 justify-between">
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
            className="w-full mt-3.5 bg-primary-50 text-primary-600 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white shadow-xs"
          >
            {t('common.viewDetails')}
          </button>
        </div>
      </div>
    </div>
  )
}
