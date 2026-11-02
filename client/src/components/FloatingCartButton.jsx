import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'

export default function FloatingCartButton() {
  const { totalItems, totalAmount, openCart } = useCart()
  const { formatCurrency, lang } = useLanguage()

  if (totalItems === 0) return null

  return (
    <aside aria-label="Giỏ hàng nổi" className="fixed bottom-6 right-6 z-40 animate-fade-in-up">
      <button
        type="button"
        onClick={openCart}
        className="group flex items-center gap-3 bg-[#98b155] hover:bg-[#7d9541] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:shadow-[#98b155]/40 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/60 cursor-pointer"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
            {totalItems}
          </span>
        </div>

        <div className="text-left">
          <div className="text-[11px] uppercase tracking-wider text-white/80 font-semibold">
            {lang === 'en' ? 'Your Order' : 'Đơn hàng'}
          </div>
          <div className="text-sm font-extrabold text-white">
            {formatCurrency(totalAmount)}
          </div>
        </div>
      </button>
    </aside>
  )
}
