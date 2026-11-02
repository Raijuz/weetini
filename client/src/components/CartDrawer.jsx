import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalAmount,
    openCheckout,
  } = useCart()

  const { t, formatCurrency, lang } = useLanguage()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-fade-in-right">
          {/* Header */}
          <div className="px-5 py-4 bg-[#98b155] text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-[family-name:var(--font-display)]">
                  {t('cart.title')}
                </h2>
                <p className="text-xs text-white/80">
                  {t('cart.itemsCount').replace('{count}', totalItems)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(t('cart.confirmClear'))) {
                      clearCart()
                    }
                  }}
                  title={t('cart.clearCart')}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <button
                type="button"
                onClick={closeCart}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-24 h-24 rounded-full bg-lime-50 flex items-center justify-center text-primary-500 shadow-inner">
                  <ShoppingBag size={44} strokeWidth={1.5} />
                </div>
                <div className="space-y-1.5 max-w-xs">
                  <h3 className="text-lg font-bold text-gray-800 font-[family-name:var(--font-display)]">
                    {t('cart.emptyTitle')}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t('cart.emptyDesc')}
                  </p>
                </div>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-all shadow-md hover:shadow-primary-500/30 cursor-pointer"
                >
                  <span>{t('cart.exploreMenu')}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 group">
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-lime-50 to-amber-50 p-2 flex items-center justify-center shrink-0 border border-gray-100 shadow-xs">
                      <img
                        src={item.image || '/images/products/default-milk-tea.jpg'}
                        alt={item.name}
                        className="w-full h-full object-contain drop-shadow-sm"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-gray-900 font-[family-name:var(--font-display)] truncate">
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-rose-500 transition-colors p-0.5 cursor-pointer"
                            title={lang === 'en' ? 'Remove' : 'Xóa món'}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {/* Customization tags */}
                        <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-gray-500">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-700">
                            Size {item.size}
                          </span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                            {item.sugar} {lang === 'en' ? 'sugar' : 'đường'}
                          </span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded-md">
                            {item.ice} {lang === 'en' ? 'ice' : 'đá'}
                          </span>
                        </div>

                        {item.toppings && item.toppings.length > 0 && (
                          <p className="mt-1 text-[11px] text-primary-600 line-clamp-1">
                            + {item.toppings.map((t) => t.name).join(', ')}
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/80">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 rounded-l-lg transition-colors cursor-pointer"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-3 text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 rounded-r-lg transition-colors cursor-pointer"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <span className="text-sm font-extrabold text-primary-600">
                          {formatCurrency(item.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer checkout bar */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/90 space-y-3.5">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-primary-600 font-medium">
                  <span>{t('cart.shipping')}</span>
                  <span>{t('cart.freeShipping')}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                    {t('cart.total')}
                  </div>
                  <div className="text-xl font-extrabold text-primary-600">
                    {formatCurrency(totalAmount)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openCheckout}
                  className="px-6 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-lg hover:shadow-primary-500/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('cart.checkoutBtn')}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
