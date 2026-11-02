import { CheckCircle2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'

export default function CartToast() {
  const { toastMessage, openCart } = useCart()
  const { t } = useLanguage()

  if (!toastMessage) return null

  return (
    <aside aria-label="Thông báo giỏ hàng" className="fixed top-20 right-4 sm:right-6 z-50 animate-fade-in-down pointer-events-auto">
      <div className="bg-white/95 backdrop-blur-md border border-primary-200/80 rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 max-w-sm">
        <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
          <CheckCircle2 size={22} className="text-primary-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider">
            {t('cart.addedToast')}
          </p>
          <p className="text-sm font-bold text-gray-900 truncate">
            {toastMessage}
          </p>
        </div>
        <button
          type="button"
          onClick={openCart}
          className="px-3 py-1.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
        >
          <ShoppingBag size={13} />
          <span>{t('cart.viewCart')}</span>
        </button>
      </div>
    </aside>
  )
}
