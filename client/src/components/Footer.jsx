import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { lang, t } = useLanguage()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 3000)
  }

  const quickLinks = [
    { to: '/ve-chung-toi', label: t('nav.about') },
    { to: '/menu', label: t('nav.menu') },
    { to: '/he-thong-cua-hang', label: t('nav.stores') },
    { to: '/nhuong-quyen', label: t('nav.franchise') },
    { to: '/tuyen-dung', label: t('nav.recruitment') },
  ]

  return (
    <footer className="bg-gradient-to-b from-[#4d5c2c] via-[#3d4b25] to-[#252e16] text-white border-t border-[#98b155]/25">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl font-[family-name:var(--font-display)]">W</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] tracking-wide">Weetini</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">
                  {lang === 'en' ? 'Vietnamese Tea' : 'Trà sữa Việt'}
                </p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {t('footer.brandDesc')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-black transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.77 1.53V6.87a4.83 4.83 0 01-1-.18z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 font-[family-name:var(--font-display)]">
              <span className="text-accent-gold">{t('footer.quickLinksTitle')}</span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-accent-gold transition-all duration-300 hover:pl-2 block text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-5 font-[family-name:var(--font-display)]">
              <span className="text-accent-gold">{t('footer.contactTitle')}</span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-gold shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{t('footer.addressVal')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-gold shrink-0" />
                <a href="tel:0888900111" className="text-gray-400 text-sm hover:text-accent-gold transition-colors">0888 900 111</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent-gold shrink-0" />
                <a href="mailto:contact@weetini.vn" className="text-gray-400 text-sm hover:text-accent-gold transition-colors">contact@weetini.vn</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-accent-gold shrink-0" />
                <span className="text-gray-400 text-sm">{t('footer.hoursVal')}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-5 font-[family-name:var(--font-display)]">
              <span className="text-accent-gold">{t('footer.newsletterTitle')}</span>
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.newsletterDesc')}
            </p>
            {subscribed ? (
              <div className="p-3 bg-white/10 rounded-xl text-accent-gold text-xs font-semibold">
                {lang === 'en' ? 'Thank you for subscribing!' : 'Cảm ơn bạn đã đăng ký nhận tin!'}
              </div>
            ) : (
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm placeholder:text-gray-500 focus:outline-none focus:border-primary-400 focus:bg-white/15 transition-all text-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary-500 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-400 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 text-white"
                >
                  {t('footer.sendBtn')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-accent-gold transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-accent-gold transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
