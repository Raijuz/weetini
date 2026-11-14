import { useState } from 'react'
import {
  X,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  FileText,
  CreditCard,
  Banknote,
  Sparkles,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { submitOrder } from '../services/api'

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    closeCheckout,
    openCart,
    clearCart,
    totalAmount,
    totalItems,
  } = useCart()

  const { t, formatCurrency, lang } = useLanguage()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)

  if (!isCheckoutOpen) return null

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = t('checkout.requiredFullName')
    }

    const cleanPhone = formData.phone.replace(/[\s.-]/g, '')
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    if (!formData.phone.trim()) {
      errs.phone = t('checkout.requiredPhone')
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = t('checkout.invalidPhone')
    }

    if (!formData.address.trim()) {
      errs.address = t('checkout.requiredAddress')
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    const orderPayload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      note: formData.note.trim() || undefined,
      payment_method: formData.paymentMethod,
      items: cart.map((item) => ({
        product_id: item.productId,
        name: item.name,
        price: item.price,
        size: item.size,
        ice: item.ice,
        sugar: item.sugar,
        toppings: (item.toppings || []).map((top) => top.name),
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.totalPrice,
        image: item.image,
      })),
      total_amount: totalAmount,
    }

    try {
      const response = await submitOrder(orderPayload)
      setCompletedOrder({
        orderId: response.order_id || `WTN${Math.floor(100000 + Math.random() * 900000)}`,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        items: [...cart],
        totalAmount,
        time: new Date().toLocaleTimeString(lang === 'en' ? 'en-US' : 'vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      })
      // Clear cart on successful order
      clearCart()
    } catch (err) {
      console.error('Failed to submit order', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFinish = () => {
    setCompletedOrder(null)
    setFormData({
      name: '',
      phone: '',
      address: '',
      note: '',
      paymentMethod: 'cod',
    })
    closeCheckout()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#98b155] text-white">
          <div className="flex items-center gap-3">
            {!completedOrder && (
              <button
                type="button"
                onClick={() => {
                  closeCheckout()
                  openCart()
                }}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                title={t('checkout.backToCart')}
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-display)]">
                {completedOrder ? t('checkout.successTitle') : t('checkout.title')}
              </h2>
              <p className="text-xs text-white/80">
                {completedOrder
                  ? t('checkout.orderId') + ': #' + completedOrder.orderId
                  : t('checkout.subtitle')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={completedOrder ? handleFinish : closeCheckout}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content area */}
        <div className="overflow-y-auto p-5 sm:p-7">
          {completedOrder ? (
            /* SUCCESS VIEW */
            <div className="space-y-6 text-center max-w-xl mx-auto py-2">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 size={48} strokeWidth={2.2} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
                  {t('checkout.successTitle')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('checkout.successDesc')}
                </p>
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-xs px-4 py-2 rounded-full border border-amber-200/80 font-medium mt-2">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>{t('checkout.orderNotice')}</span>
                </div>
              </div>

              {/* Order Info Card */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80 text-left space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-gray-200/60 pb-2.5">
                  <span className="text-gray-500">{t('checkout.orderId')}:</span>
                  <span className="font-bold text-primary-600 font-mono">
                    #{completedOrder.orderId}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-2.5">
                  <span className="text-gray-500">{t('checkout.recipient')}:</span>
                  <span className="font-semibold text-gray-800">
                    {completedOrder.name} ({completedOrder.phone})
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-2.5">
                  <span className="text-gray-500">{t('checkout.deliveryAddress')}:</span>
                  <span className="font-medium text-gray-800 text-right max-w-xs">
                    {completedOrder.address}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-2.5">
                  <span className="text-gray-500">{t('checkout.paymentLabel')}:</span>
                  <span className="font-medium text-gray-800">
                    {completedOrder.paymentMethod === 'cod'
                      ? t('checkout.cod')
                      : t('checkout.banking')}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-2.5">
                  <span className="text-gray-500">{t('checkout.estDeliveryTime')}:</span>
                  <span className="font-bold text-emerald-600">
                    {t('checkout.estDeliveryTimeVal')}
                  </span>
                </div>

                {/* Items summary */}
                <div className="pt-2">
                  <div className="font-bold text-gray-700 mb-2">
                    {t('checkout.orderedItems')} ({completedOrder.items.length}):
                  </div>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {completedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-gray-600">
                        <span>
                          {it.quantity}x {it.name} (Size {it.size})
                        </span>
                        <span className="font-semibold">{formatCurrency(it.totalPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-300 flex justify-between items-center text-sm sm:text-base">
                  <span className="font-bold text-gray-800">{t('cart.total')}:</span>
                  <span className="font-extrabold text-primary-600 text-lg sm:text-xl">
                    {formatCurrency(completedOrder.totalAmount)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-lg hover:shadow-primary-500/30 transition-all cursor-pointer"
              >
                {t('checkout.continueShopping')}
              </button>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left column: Customer form */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <User size={18} className="text-primary-500" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                      {t('checkout.customerInfo')}
                    </h3>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('checkout.fullName')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (errors.name) setErrors({ ...errors, name: null })
                        }}
                        placeholder={t('checkout.fullNamePlaceholder')}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-all outline-hidden ${
                          errors.name
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                            : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('checkout.phone')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Phone size={16} />
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value })
                          if (errors.phone) setErrors({ ...errors, phone: null })
                        }}
                        placeholder={t('checkout.phonePlaceholder')}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-all outline-hidden ${
                          errors.phone
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                            : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('checkout.address')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <MapPin size={16} />
                      </div>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => {
                          setFormData({ ...formData, address: e.target.value })
                          if (errors.address) setErrors({ ...errors, address: null })
                        }}
                        placeholder={t('checkout.addressPlaceholder')}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-all outline-hidden ${
                          errors.address
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                            : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                        }`}
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.address}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('checkout.note')}
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-gray-400">
                        <FileText size={16} />
                      </div>
                      <textarea
                        rows={2}
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        placeholder={t('checkout.notePlaceholder')}
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-hidden resize-none"
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      {t('checkout.paymentMethod')}
                    </label>
                    <div className="space-y-2.5">
                      {/* COD */}
                      <label
                        className={`p-3 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                          formData.paymentMethod === 'cod'
                            ? 'border-primary-500 bg-primary-50/50 text-gray-900 shadow-xs'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className="mt-1 text-primary-500 focus:ring-primary-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 font-semibold text-sm">
                            <Banknote size={16} className="text-emerald-600" />
                            <span>{t('checkout.cod')}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{t('checkout.codDesc')}</p>
                        </div>
                      </label>

                      {/* Banking */}
                      <label
                        className={`p-3 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                          formData.paymentMethod === 'banking'
                            ? 'border-primary-500 bg-primary-50/50 text-gray-900 shadow-xs'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="banking"
                          checked={formData.paymentMethod === 'banking'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'banking' })}
                          className="mt-1 text-primary-500 focus:ring-primary-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 font-semibold text-sm">
                            <CreditCard size={16} className="text-primary-500" />
                            <span>{t('checkout.banking')}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{t('checkout.bankingDesc')}</p>

                          {formData.paymentMethod === 'banking' && (
                            <div className="mt-3 p-3 bg-white rounded-lg border border-primary-200 text-xs space-y-1 text-gray-700">
                              <div className="font-bold text-primary-700 mb-1">
                                {t('checkout.bankInfoTitle')}:
                              </div>
                              <div>
                                {t('checkout.bankName')}{' '}
                                <strong className="text-gray-900">MB Bank (Quân Đội)</strong>
                              </div>
                              <div>
                                {t('checkout.bankAccount')}{' '}
                                <strong className="text-primary-600 font-mono text-sm">
                                  8888 900 111
                                </strong>
                              </div>
                              <div>
                                {t('checkout.bankHolder')}{' '}
                                <strong className="text-gray-900 uppercase">WEE TINI TEA CO., LTD</strong>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right column: Order Summary */}
                <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-5 border border-gray-200/80 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={18} className="text-primary-500" />
                        <h4 className="text-sm font-bold text-gray-800 font-[family-name:var(--font-display)]">
                          {t('checkout.orderSummary')}
                        </h4>
                      </div>
                      <span className="text-xs bg-primary-100 text-primary-700 font-bold px-2.5 py-0.5 rounded-full">
                        {t('cart.itemsCount').replace('{count}', totalItems)}
                      </span>
                    </div>

                    {/* Drink items scrollable */}
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-2.5 items-center text-xs">
                          <img
                            src={item.image || '/images/products/default-milk-tea.jpg'}
                            alt={item.name}
                            className="w-11 h-11 rounded-lg object-contain bg-white p-1 border border-gray-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-800 truncate">{item.name}</div>
                            <div className="text-[11px] text-gray-500">
                              Size {item.size} • {item.sugar} đường • {item.ice} đá
                            </div>
                            {item.toppings && item.toppings.length > 0 && (
                              <div className="text-[10px] text-primary-600 truncate">
                                + {item.toppings.map((t) => t.name).join(', ')}
                              </div>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-bold text-gray-800">
                              {formatCurrency(item.totalPrice)}
                            </div>
                            <div className="text-[10px] text-gray-400">x{item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price breakdown */}
                    <div className="pt-3 border-t border-gray-200 space-y-2 text-xs">
                      <div className="flex justify-between text-gray-600">
                        <span>{t('cart.subtotal')}</span>
                        <span className="font-semibold text-gray-800">
                          {formatCurrency(totalAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-emerald-600">
                        <span>{t('cart.shipping')}</span>
                        <span className="font-semibold">{t('cart.freeShipping')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Total & Submit button */}
                  <div className="pt-4 border-t border-gray-200 mt-4 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs uppercase tracking-wider font-bold text-gray-500">
                        {t('cart.total')}
                      </span>
                      <span className="text-2xl font-extrabold text-primary-600">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || cart.length === 0}
                      className="w-full py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-lg hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>{t('checkout.submitting')}</span>
                      ) : (
                        <>
                          <CheckCircle2 size={18} />
                          <span>{t('checkout.confirmOrder')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
