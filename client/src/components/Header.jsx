import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Search } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { lang, setLanguage, t } = useLanguage()

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/ve-chung-toi', label: t('nav.about') },
    { path: '/menu', label: t('nav.menu') },
    { path: '/he-thong-cua-hang', label: t('nav.stores') },
    { path: '/nhuong-quyen', label: t('nav.franchise') },
    { path: '/tuyen-dung', label: t('nav.recruitment') },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const isHome = location.pathname === '/' || location.pathname === '/en'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-2.5'
            : isHome
              ? 'bg-transparent py-4'
              : 'bg-[#98b155]/95 backdrop-blur-md py-3 shadow-sm border-b border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className={`flex items-center justify-end gap-4 text-sm mb-2 transition-all duration-300 ${
            isScrolled ? 'h-0 overflow-hidden opacity-0 mb-0' : 'h-auto opacity-100'
          }`}>
            <a href="tel:0888900111" className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors">
              <Phone size={14} />
              <span>{t('nav.hotlineLabel')}<strong>0888 900 111</strong></span>
            </a>
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                aria-label="Tiếng Việt"
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  lang === 'vi'
                    ? 'bg-white/25 text-white font-bold ring-1 ring-white/40 shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                VN
              </button>
              <span className="opacity-40 text-white">|</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-label="English"
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white/25 text-white font-bold ring-1 ring-white/40 shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                EN
              </button>
            </div>
          </div>


          {/* Main header */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl font-[family-name:var(--font-display)]">W</span>
              </div>
              <div>
                <h1 className={`text-2xl font-bold font-[family-name:var(--font-display)] tracking-wide transition-colors duration-300 ${
                  isScrolled ? 'text-primary-500' : 'text-white'
                }`}>
                  Weetini
                </h1>
                <p className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-primary-400' : 'text-white/70'
                }`}>
                  {lang === 'en' ? 'Vietnamese Tea' : 'Trà sữa Việt'}
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 rounded-lg group ${
                    location.pathname === link.path
                      ? isScrolled
                        ? 'text-primary-500'
                        : 'text-accent-gold'
                      : isScrolled
                        ? 'text-gray-700 hover:text-primary-500'
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'w-6 bg-accent-gold'
                        : 'w-0 group-hover:w-6 bg-primary-400'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Search + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/menu"
                title={t('nav.searchTooltip')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled ? 'text-gray-600 hover:bg-primary-50 hover:text-primary-500' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Search size={20} />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                  isScrolled ? 'text-gray-600 hover:bg-primary-50' : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col justify-between`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="text-xl font-bold text-primary-500 font-[family-name:var(--font-display)]">Weetini</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            {/* Language toggle for mobile */}
            <div className="flex items-center justify-between bg-gray-100 p-1.5 rounded-xl mb-6">
              <span className="text-xs font-semibold text-gray-500 pl-2">Ngôn ngữ / Language:</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setLanguage('vi')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'vi' ? 'bg-primary-500 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  VN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'en' ? 'bg-primary-500 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-primary-50 text-primary-500 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <a href="tel:0888900111" className="flex items-center gap-3 px-4 py-3 bg-primary-50 rounded-xl text-primary-600">
                <Phone size={18} />
                <div>
                  <p className="text-xs text-primary-400">{t('nav.hotlineLabel')}</p>
                  <p className="font-bold">0888 900 111</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
