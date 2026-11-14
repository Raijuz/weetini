import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Search, ShoppingBag, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { lang, setLanguage, t } = useLanguage()
  const { totalItems, openCart } = useCart()

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/ve-chung-toi', label: t('nav.about') },
    { path: '/menu', label: t('nav.menu') },
    { path: '/lien-he', label: t('nav.contact') },
    { path: '/nhuong-quyen', label: t('nav.franchise'), isHighlight: true },
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
            <a href="tel:0859590010" className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors">
              <Phone size={14} />
              <span>{t('nav.hotlineLabel')}<strong>0859590010</strong></span>
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
                  WEE TINI
                </h1>
                <p className={`text-[9px] sm:text-[10px] tracking-[0.08em] font-medium transition-colors duration-300 whitespace-nowrap ${
                  isScrolled ? 'text-primary-400' : 'text-white/80'
                }`}>
                  Wee Fun, Wee Chill, Wee Slay
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                if (link.isHighlight) {
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="relative overflow-hidden px-3.5 xl:px-4.5 py-1.5 xl:py-2 rounded-full font-black text-xs xl:text-sm uppercase tracking-wider text-white shadow-md bg-gradient-to-r from-[#F6869D] via-[#f4587a] to-[#ea4c6f] hover:from-[#f4587a] hover:to-[#db3a5d] active:scale-95 transition-all duration-300 animate-franchise-pulse flex items-center gap-1.5 ring-2 ring-white/60 hover:ring-white ml-2 cursor-pointer group select-none"
                    >
                      {/* Shimmer light sweep beam */}
                      <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-franchise-shimmer pointer-events-none" />

                      <Sparkles size={14} className="text-amber-200 animate-spin-slow shrink-0" />
                      <span className="relative z-10 drop-shadow-xs font-black">{link.label}</span>

                      {/* Hot tag */}
                      <span className="relative z-10 text-[9px] font-extrabold bg-white text-[#ea4c6f] px-1.5 py-0.2 rounded-full shadow-xs uppercase tracking-tight -mr-0.5">
                        HOT
                      </span>
                    </Link>
                  )
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-2 xl:px-3 py-1.5 xl:py-2 uppercase tracking-wider rounded-lg group transition-all duration-300"
                  >
                    <span
                      className={`nav-turnio-text text-xs xl:text-sm 2xl:text-[15px] ${
                        isActive ? 'nav-turnio-active scale-105' : 'opacity-95'
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-8 bg-[#F6869D] shadow-sm ring-1 ring-white/80'
                          : 'w-0 group-hover:w-6 bg-white/80'
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Search + Cart + Mobile toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/menu"
                title={t('nav.searchTooltip')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled ? 'text-gray-600 hover:bg-primary-50 hover:text-primary-500' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Search size={20} />
              </Link>

              {/* Cart Button */}
              <button
                type="button"
                onClick={openCart}
                title={t('cart.title')}
                className={`relative p-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <ShoppingBag size={21} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>

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
                <span className="text-xl font-bold text-primary-500 font-[family-name:var(--font-display)]">WEE TINI</span>
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

            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path
                if (link.isHighlight) {
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="relative overflow-hidden p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between text-white shadow-md bg-gradient-to-r from-[#F6869D] via-[#f4587a] to-[#ea4c6f] active:scale-95 animate-franchise-pulse my-1 ring-2 ring-pink-200"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {/* Shimmer light sweep beam */}
                      <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] animate-franchise-shimmer pointer-events-none" />

                      <div className="flex items-center gap-2 relative z-10">
                        <Sparkles size={18} className="text-amber-200 animate-spin-slow shrink-0" />
                        <span className="font-black uppercase tracking-wider text-base drop-shadow-xs">
                          {link.label}
                        </span>
                      </div>
                      <span className="relative z-10 text-[10px] font-black bg-white text-[#ea4c6f] px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
                        CƠ HỘI HOT
                      </span>
                    </Link>
                  )
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? 'bg-primary-50/80 shadow-xs'
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span className={`nav-turnio-text text-base ${isActive ? 'nav-turnio-active' : ''}`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F6869D] ring-2 ring-white shadow-xs" />
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openCart()
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-primary-500 text-white rounded-xl font-bold text-sm shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} />
                  <span>{t('cart.title')}</span>
                </div>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {totalItems}
                </span>
              </button>

              <a href="tel:0859590010" className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-primary-50 rounded-xl text-primary-600 transition-colors">
                <Phone size={18} />
                <div>
                  <p className="text-xs text-primary-400">{t('nav.hotlineLabel')}</p>
                  <p className="font-bold">0859590010</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
