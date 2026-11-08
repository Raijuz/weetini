import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { submitContactForm } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

export default function ContactPage() {
  const { lang, t } = useLanguage()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Góp ý dịch vụ & đồ uống',
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
    const res = await submitContactForm(formData)
    setSubmitting(false)
    setSubmitted(true)
    setResponseMsg(
      lang === 'en'
        ? 'Thank you! WEE TINI team will get back to you within 24 hours.'
        : res.message || 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.'
    )
  }

  const isEn = lang === 'en'

  return (
    <div className="bg-[#fbfcf8] min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="relative bg-gradient-to-r from-[#98B155] via-[#859f47] to-[#F6869D] text-white py-18 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/images/hero-banner.jpg"
            alt="WEE TINI Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent-gold bg-white/15 backdrop-blur-xs px-4 py-1.5 rounded-full inline-block">
            {isEn ? 'CONNECT WITH WEE TINI' : 'KẾT NỐI VỚI WEE TINI'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-[family-name:var(--font-display)] tracking-tight drop-shadow-xs">
            {isEn ? 'Contact Us' : 'Thông Tin Liên Hệ'}
          </h1>
          <p className="text-lime-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'We are always delighted to listen to your feedback, questions, or partnership opportunities. Let’s start a conversation!'
              : 'Chúng tôi luôn sẵn lòng lắng nghe mọi ý kiến đóng góp, câu hỏi và cơ hội hợp tác từ bạn. Hãy kết nối cùng WEE TINI!'}
          </p>
        </div>
      </section>

      {/* 3 Highlight Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Hotline */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/5 border border-primary-100/60 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5 shadow-xs">
              <Phone size={26} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {isEn ? 'Customer Hotline' : 'Hotline Hỗ Trợ'}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-3">
              {isEn ? 'Direct support & quick orders' : 'Tư vấn trực tiếp & đặt hàng nhanh'}
            </p>
            <a
              href="tel:0859590010"
              className="text-xl font-black text-primary-600 hover:text-primary-700 transition-colors inline-block"
            >
              0859590010
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/5 border border-pink-100/60 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-[#ea4c6f] flex items-center justify-center mb-5 shadow-xs">
              <Mail size={26} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {isEn ? 'Email Support' : 'Hòm Thư Điện Tử'}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-3">
              {isEn ? 'Partnership & general inquiries' : 'Hợp tác truyền thông & chăm sóc khách hàng'}
            </p>
            <a
              href="mailto:Weetinicreative@gmail.com"
              className="text-base sm:text-lg font-bold text-[#ea4c6f] hover:underline break-all inline-block"
            >
              Weetinicreative@gmail.com
            </a>
          </div>

          {/* Card 3: Address */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/5 border border-amber-100/60 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-accent-gold flex items-center justify-center mb-5 shadow-xs">
              <MapPin size={26} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {isEn ? 'Headquarters' : 'Trụ Sở Chính'}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-3">
              {isEn ? 'Operating hours: 08:00 - 22:00 daily' : 'Thời gian làm việc: 08:00 - 22:00 hàng ngày'}
            </p>
            <p className="text-sm font-semibold text-gray-800 leading-snug">
              37/14A Trịnh Đình Thảo, P. Tân Phú, TP. HCM
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 border border-gray-100">
            <div className="flex items-center gap-2 text-[#ea4c6f] text-xs font-black uppercase tracking-wider mb-2">
              <MessageSquare size={16} />
              <span>{isEn ? 'SEND US A MESSAGE' : 'GỬI TIN NHẮN CHO CHÚNG TÔI'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 font-[family-name:var(--font-display)]">
              {isEn ? 'How can WEE TINI help you?' : 'Chúng tôi có thể giúp gì cho bạn?'}
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              {isEn
                ? 'Fill out the form below and our customer team will respond promptly.'
                : 'Vui lòng điền thông tin vào biểu mẫu dưới đây, đội ngũ chăm sóc WEE TINI sẽ phản hồi bạn trong thời gian sớm nhất.'}
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 size={44} className="text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-800">
                  {isEn ? 'Message Sent Successfully!' : 'Gửi Tin Nhắn Thành Công!'}
                </h3>
                <p className="text-sm text-emerald-700">{responseMsg}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      subject: 'Góp ý dịch vụ & đồ uống',
                      message: '',
                    })
                  }}
                  className="mt-4 px-6 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  {isEn ? 'Send another message' : 'Gửi thêm tin nhắn khác'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      {isEn ? 'Full Name *' : 'Họ và tên *'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isEn ? 'e.g. John Doe' : 'Ví dụ: Nguyễn Văn A'}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      {isEn ? 'Phone Number *' : 'Số điện thoại *'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="09xx xxx xxx"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      {isEn ? 'Topic' : 'Chủ đề liên hệ'}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm bg-white"
                    >
                      <option value="Góp ý dịch vụ & đồ uống">
                        {isEn ? 'Service & drink feedback' : 'Góp ý dịch vụ & đồ uống'}
                      </option>
                      <option value="Đặt hàng số lượng lớn (Công ty/Sự kiện)">
                        {isEn ? 'Large order (Event/Corporate)' : 'Đặt hàng số lượng lớn (Công ty/Sự kiện)'}
                      </option>
                      <option value="Hợp tác truyền thông / Marketing">
                        {isEn ? 'Media & Marketing collaboration' : 'Hợp tác truyền thông / Marketing'}
                      </option>
                      <option value="Chủ đề khác">
                        {isEn ? 'Other inquiries' : 'Chủ đề khác'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    {isEn ? 'Message *' : 'Nội dung tin nhắn *'}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      isEn
                        ? 'Share your thoughts, suggestions, or requests...'
                        : 'Chia sẻ thắc mắc, đề xuất hoặc phản hồi của bạn cùng WEE TINI...'
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{submitting ? (isEn ? 'Sending...' : 'Đang gửi...') : (isEn ? 'Send Message' : 'Gửi Tin Nhắn Ngay')}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Info & Map Direct Link */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="bg-gradient-to-br from-[#4d5c2c] to-[#36421f] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-accent-gold mb-3 inline-block">
                {isEn ? 'WEE TINI HEADQUARTERS' : 'TRỤ SỞ WEE TINI'}
              </span>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4">
                WEE TINI Việt Nam
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                {isEn
                  ? 'Feel free to visit our central office or flagship take-away kitchen to experience the original taste of Vietnamese tea.'
                  : 'Chào đón bạn ghé thăm văn phòng điều hành và không gian pha chế WEE TINI để thưởng thức hương vị trà Việt tươi ngon trọn vẹn.'}
              </p>

              <div className="space-y-4 border-t border-white/15 pt-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-accent-gold shrink-0 mt-0.5" />
                  <span>37/14A Trịnh Đình Thảo, P. Tân Phú, TP. HCM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-accent-gold shrink-0" />
                  <span>08:00 - 22:00 ({isEn ? 'Monday - Sunday' : 'Tất cả các ngày trong tuần'})</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-accent-gold shrink-0" />
                  <a href="tel:0859590010" className="hover:text-accent-gold font-bold">
                    0859590010
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=37/14A+Trịnh+Đình+Thảo+Tân+Phú+TPHCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>{isEn ? 'Open in Google Maps' : 'Xem trên Google Maps'}</span>
                </a>
              </div>
            </div>

            {/* Direct Franchise Promotion Card */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200/70 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#ea4c6f] font-black text-xs uppercase tracking-wider mb-2">
                <Sparkles size={16} />
                <span>{isEn ? 'BUSINESS PARTNERSHIP' : 'CƠ HỘI HỢP TÁC KINH DOANH'}</span>
              </div>
              <h4 className="text-lg font-extrabold text-gray-900 mb-2">
                {isEn ? 'Looking to franchise WEE TINI?' : 'Bạn muốn cùng WEE TINI mở quán?'}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                {isEn
                  ? 'Join our modern take-away beverage chain with optimized setup costs, comprehensive staff training, and reliable supply chain support.'
                  : 'Gia nhập mạng lưới nhượng quyền take-away tinh gọn với chi phí đầu tư tối ưu, chuyển giao công thức bài bản và hỗ trợ truyền thông trọn gói.'}
              </p>
              <a
                href="/nhuong-quyen"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F6869D] to-[#ea4c6f] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>{isEn ? 'Explore Franchise' : 'Xem Chính Sách Nhượng Quyền'}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

