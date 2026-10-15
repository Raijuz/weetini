import { useState } from 'react'
import {
  TrendingUp,
  GraduationCap,
  Truck,
  Megaphone,
  CheckCircle2,
  Send,
  HelpCircle,
} from 'lucide-react'
import { submitFranchiseForm } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

export default function FranchisePage() {
  const { lang, t, dict } = useLanguage()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    investment_budget: '150 - 250 triệu',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [responseMsg, setResponseMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const res = await submitFranchiseForm(formData)
    setSubmitting(false)
    setSubmitted(true)
    setResponseMsg(
      lang === 'en'
        ? 'Thank you! Our franchise consultant will call you within 24 hours.'
        : res.message || 'Đăng ký thành công!'
    )
  }

  const benefitIcons = [TrendingUp, GraduationCap, Truck, Megaphone]
  const benefits = dict.franchise?.benefits || []
  const steps = dict.franchise?.steps || []
  const packageIncludes = dict.franchise?.packageIncludes || []
  const financialMetrics = dict.franchise?.financialMetrics || []
  const budgetOptions = dict.franchise?.budgetOptions || []

  const faqs = lang === 'en' ? [
    {
      q: 'What is the minimum required floor area for a Weetini store?',
      a: 'Weetini models are optimized from as compact as 15m² for express take-away kiosks, up to 35m² - 60m² for stores with dine-in seating.',
    },
    {
      q: 'Can I partner if I do not have prior F&B experience?',
      a: 'Absolutely! Weetini provides comprehensive A-to-Z training, covering gram-accurate standardized brewing, POS system operations, inventory controls, and staff management.',
    },
    {
      q: 'How long does it take from signing the contract to grand opening?',
      a: 'The typical timeline is 14 to 21 business days, including store design, build-out, equipment installation, and complete staff training.',
    },
  ] : [
    {
      q: 'Diện tích mặt bằng tối thiểu cần là bao nhiêu?',
      a: 'Mặt bằng Weetini tối ưu chỉ cần từ 15m² đối với mô hình kiosk mang đi, và 35m² - 60m² đối với mô hình có không gian ngồi lại.',
    },
    {
      q: 'Tôi chưa từng có kinh nghiệm F&B thì có mở được không?',
      a: 'Hoàn toàn được! Weetini cung cấp gói đào tạo từ A-Z, từ công thức pha chế định lượng chuẩn xác, vận hành máy POS, đến tuyển dụng và quản lý nhân viên.',
    },
    {
      q: 'Thời gian từ lúc ký hợp đồng đến khi khai trương mất bao lâu?',
      a: 'Thông thường quy trình hoàn tất trong vòng 14 - 21 ngày làm việc, bao gồm thi công trang trí mặt bằng và đào tạo hoàn thiện đội ngũ.',
    },
  ]

  return (
    <div className="bg-[#fbfcf8] min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white py-16 sm:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent-gold bg-white/10 px-4 py-1.5 rounded-full inline-block">
            {t('franchise.bannerBadge')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-[family-name:var(--font-display)] tracking-tight">
            {t('franchise.bannerTitle')}
          </h1>
          <p className="text-lime-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('franchise.bannerDesc')}
          </p>
        </div>
      </section>

      {/* 4 Benefits Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = benefitIcons[idx % benefitIcons.length]
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl shadow-xl border border-gray-100 hover:border-primary-300 transition-all duration-300 hover:-translate-y-1 space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-display)]">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Investment Package & ROI Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
                {t('franchise.packageBadge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-[family-name:var(--font-display)]">
                {t('franchise.packageTitle')}
              </h2>
              <div className="text-3xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
                {t('franchise.packageTotal')}
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {lang === 'en'
                  ? 'We deliver a turnkey solution with transparent budgeting and zero hidden expenses during store deployment:'
                  : 'Chúng tôi cung cấp giải pháp chìa khóa trao tay (Turn-key solution), đối tác không phát sinh chi phí ẩn trong suốt quá trình triển khai cửa hàng:'}
              </p>

              <div className="space-y-3 pt-2">
                {packageIncludes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={18} className="text-primary-500 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-gradient-to-br from-[#98B155] to-[#F6869D] rounded-3xl p-8 sm:p-10 text-white space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-accent-gold">
                  {t('franchise.financialBadge')}
                </span>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-display)]">
                  {t('franchise.financialTitle')}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {financialMetrics.map((met, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <div className="text-xs text-white/70">{met.label}</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-accent-gold mt-1">
                      {met.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-white/60 pt-2 border-t border-white/10">
                {t('franchise.financialDesc')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Steps Franchise Roadmap */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
              {t('franchise.processBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
              {t('franchise.processTitle')}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              {t('franchise.processDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((stepItem, index) => (
              <div
                key={index}
                className="p-7 rounded-2xl bg-[#f7f9f0] border border-lime-200/60 hover:border-primary-300 transition-all space-y-3"
              >
                <div className="text-2xl font-extrabold text-primary-500 font-[family-name:var(--font-display)]">
                  {stepItem.step}
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-display)]">
                  {stepItem.title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Registration Form */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="register-form">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100">
          <div className="text-center space-y-3 mb-8">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
              {t('franchise.formBadge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-[family-name:var(--font-display)]">
              {t('franchise.formTitle')}
            </h2>
            <p className="text-gray-500 text-sm">
              {t('franchise.formDesc')}
            </p>
          </div>

          {submitted ? (
            <div className="bg-lime-50 border-2 border-primary-500 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-900">
                {t('franchise.successTitle')}
              </h3>
              <p className="text-primary-700 text-sm max-w-md mx-auto">
                {responseMsg}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 cursor-pointer"
              >
                {lang === 'en' ? 'Submit another request' : 'Gửi thêm yêu cầu khác'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('franchise.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('franchise.namePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('franchise.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('franchise.phonePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('franchise.emailLabel')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('franchise.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('franchise.cityLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t('franchise.cityPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t('franchise.budgetLabel')}
                </label>
                <select
                  name="investment_budget"
                  value={formData.investment_budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary-500 text-sm cursor-pointer"
                >
                  {budgetOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t('franchise.notesLabel')}
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('franchise.notesPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <span>{t('franchise.submittingBtn')}</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{t('franchise.submitBtn')}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)] text-center mb-8">
          {lang === 'en' ? 'FREQUENTLY ASKED QUESTIONS (FAQ)' : 'CÂU HỎI THƯỜNG GẶP (FAQ)'}
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <div className="font-bold text-gray-900 text-sm sm:text-base flex items-start gap-2">
                <HelpCircle size={18} className="text-primary-500 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
