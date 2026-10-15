import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Clock, 
  Award, 
  Leaf, 
  ShieldCheck, 
  Flame
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProductDetailModal from '../components/ProductDetailModal'
import { useCountUp } from '../hooks/useAnimations'
import { fetchProducts, fetchCategories, DEFAULT_PRODUCTS, DEFAULT_CATEGORIES } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

export default function HomePage() {
  const { t, dict, localizeCategory, localizeProduct } = useLanguage()

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [products, setProducts] = useState(DEFAULT_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Animated counters
  const countCups = useCountUp(20000, 2200)
  const countToppings = useCountUp(40, 1800)
  const countStores = useCountUp(42, 2000)

  useEffect(() => {
    async function loadData() {
      const cats = await fetchCategories()
      if (cats && cats.length) {
        const hasAll = cats.find(c => c.id === 'all')
        setCategories(hasAll ? cats : [{ id: 'all', name: 'Tất cả', slug: 'all' }, ...cats])
      }
      const prods = await fetchProducts()
      if (prods && prods.length) setProducts(prods)
    }
    loadData()
  }, [])

  const handleCategoryChange = async (catId) => {
    setSelectedCategory(catId)
    const prods = await fetchProducts(catId)
    setProducts(prods)
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  // Filter products for homepage display
  const displayedProducts = products.slice(0, 8)

  const whyFeatureIcons = [Leaf, ShieldCheck, Clock, Award]
  const whyItems = dict.home?.whyItems || []

  return (
    <div className="overflow-hidden bg-[#fbfcf8]">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white overflow-hidden pt-24 pb-16">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-banner.jpg"
            alt="Weetini Hero Banner"
            className="w-full h-full object-cover object-center opacity-20 scale-105 animate-pulse-glow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d371b]/50 via-black/10 to-[#F6869D]/20" />
        </div>

        {/* Ambient floating blur circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#F6869D]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs sm:text-sm font-semibold text-white tracking-wide">
                <Sparkles size={16} className="text-[#F6869D]" />
                <span>{t('home.heroBadge')}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-[family-name:var(--font-display)] leading-[1.1]">
                {t('home.heroTitle1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-[#F6869D] drop-shadow-sm">
                  {t('home.heroTitle2')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-lime-100/95 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                {t('home.heroDesc')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent-gold hover:bg-accent-gold-light text-white font-bold text-center tracking-wide transition-all duration-300 shadow-lg hover:shadow-accent-gold/30 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <span>{t('common.exploreMenu')}</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/he-thong-cua-hang"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-center border border-white/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <MapPin size={18} />
                  <span>{t('common.findStores')}</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/15 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-accent-gold">{t('home.heroStatsStores')}</div>
                  <div className="text-xs text-white/70">{t('home.heroStatsStoresLabel')}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-accent-gold">{t('home.heroStatsTea')}</div>
                  <div className="text-xs text-white/70">{t('home.heroStatsTeaLabel')}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-accent-gold">{t('home.heroStatsCups')}</div>
                  <div className="text-xs text-white/70">{t('home.heroStatsCupsLabel')}</div>
                </div>
              </div>
            </div>

            {/* Right cup image column */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 sm:w-80 lg:w-96 aspect-square flex items-center justify-center">
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-gold/40 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent-gold/20 to-primary-400/20 blur-xl" />

                <img
                  src="/images/products/default-milk-tea.jpg"
                  alt="Weetini Signature Milk Tea"
                  className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] animate-float"
                />

                {/* Floating pill badge */}
                <div className="absolute -bottom-2 -left-4 z-20 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
                  <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white">
                    <Flame size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">{t('home.heroPillLabel')}</div>
                    <div className="text-sm font-bold text-gray-900 font-[family-name:var(--font-display)]">
                      {t('home.heroPillName')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TỔNG QUAN (OVERVIEW & STATS SECTION) */}
      <section className="py-20 lg:py-28 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group border-4 border-lime-100">
                <img
                  src="/images/misc/about.jpg"
                  alt="Weetini Store"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md text-dark shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white font-bold">
                      W
                    </div>
                    <div>
                      <div className="font-bold text-sm">6+ Years of Growth</div>
                      <div className="text-xs text-gray-500">2018 - 2024 • 40+ Branches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Overview Text & Animated Stats */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="inline-block text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full">
                {t('home.overviewBadge')}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-600 font-[family-name:var(--font-display)] tracking-tight">
                {t('home.overviewTitle')}
              </h2>
              <div className="text-gray-600 leading-relaxed text-base sm:text-lg space-y-4">
                <p>{t('home.overviewP1')}</p>
                <p>{t('home.overviewP2')}</p>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div 
                  ref={countCups.ref} 
                  className="p-5 rounded-2xl bg-[#f7f9f0] border border-lime-200/60 hover:border-primary-300 transition-all shadow-sm group hover:-translate-y-1"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-primary-500 font-[family-name:var(--font-display)] flex items-center">
                    <span>{countCups.count.toLocaleString()}</span>
                    <span className="text-accent-gold">+</span>
                  </div>
                  <div className="font-bold text-gray-800 text-sm mt-1">{t('home.statCupsTitle')}</div>
                  <div className="text-xs text-gray-500">{t('home.statCupsSub')}</div>
                </div>

                <div 
                  ref={countToppings.ref}
                  className="p-5 rounded-2xl bg-[#f7f9f0] border border-lime-200/60 hover:border-primary-300 transition-all shadow-sm group hover:-translate-y-1"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-primary-500 font-[family-name:var(--font-display)] flex items-center">
                    <span>{countToppings.count}</span>
                    <span className="text-accent-gold">+</span>
                  </div>
                  <div className="font-bold text-gray-800 text-sm mt-1">{t('home.statToppingsTitle')}</div>
                  <div className="text-xs text-gray-500">{t('home.statToppingsSub')}</div>
                </div>

                <div 
                  ref={countStores.ref}
                  className="p-5 rounded-2xl bg-[#f7f9f0] border border-lime-200/60 hover:border-primary-300 transition-all shadow-sm group hover:-translate-y-1"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-primary-500 font-[family-name:var(--font-display)] flex items-center">
                    <span>{countStores.count}</span>
                    <span className="text-accent-gold">+</span>
                  </div>
                  <div className="font-bold text-gray-800 text-sm mt-1">{t('home.statStoresTitle')}</div>
                  <div className="text-xs text-gray-500">{t('home.statStoresSub')}</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/ve-chung-toi"
                  className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 group text-sm sm:text-base"
                >
                  <span>{t('home.overviewLink')}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MENU NỔI BẬT & BỘ LỌC DANH MỤC */}
      <section className="py-20 bg-[#fbfcf8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-lime-100/80 px-4 py-1.5 rounded-full inline-block">
              {t('home.menuBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
              {t('home.menuTitle')}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {t('home.menuDesc')}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-105'
                    : 'bg-white text-gray-700 hover:bg-lime-50 hover:text-primary-600 border border-gray-200'
                }`}
              >
                {localizeCategory(cat)}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((prod, index) => (
              <ProductCard
                key={prod.id}
                product={prod}
                index={index}
                onSelect={handleProductSelect}
              />
            ))}
          </div>

          {/* View Full Menu CTA */}
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <span>{t('home.viewFullMenu').replace('{count}', products.length)}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SPOTLIGHT FEATURED COLLECTION (BƠ COLLECTION & Ô LONG NHÃN HOA) */}
      <section className="py-20 bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-accent-gold text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                <Sparkles size={14} />
                {t('home.spotlightBadge')}
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-[family-name:var(--font-display)] leading-tight">
                {t('home.spotlightTitle1')} <br />
                <span className="text-rose-100">{t('home.spotlightTitle2')}</span>
              </h2>
              <p className="text-lime-100 text-sm sm:text-base leading-relaxed max-w-xl">
                {t('home.spotlightDesc')}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    const boItem = products.find(p => p.slug === 'bo-dua-non') || products[0]
                    handleProductSelect(localizeProduct(boItem))
                  }}
                  className="px-7 py-3.5 bg-accent-gold hover:bg-accent-gold-light text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  {t('home.spotlightAction')}
                </button>
                <Link
                  to="/he-thong-cua-hang"
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-semibold transition-all duration-300 text-white"
                >
                  {t('home.spotlightStoreLink')}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#607334]/80 flex items-center justify-center p-6 border-4 border-[#7d9541]/60 shadow-2xl">
                  <img
                    src="/images/products/default-matcha.jpg"
                    alt="Avocado Collection"
                    className="w-full h-full object-contain animate-float"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-accent-gold text-white font-extrabold text-sm px-4 py-2 rounded-2xl shadow-xl">
                  {t('home.spotlightPrice')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VÌ SAO CHỌN WEETINI (LỢI THẾ CẠNH TRANH) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
              {t('home.whyBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
              {t('home.whyTitle')}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              {t('home.whyDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyItems.map((feature, i) => {
              const IconComp = whyFeatureIcons[i % whyFeatureIcons.length]
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-[#f7f9f0] border border-lime-200/60 hover:border-primary-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center sm:text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-primary-500 text-white flex items-center justify-center mb-6 shadow-md shadow-primary-500/20 mx-auto sm:mx-0">
                      <IconComp size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-display)]">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. HỆ THỐNG CỬA HÀNG BANNER / TEASER */}
      <section className="py-20 bg-[#f4f7ea] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-lime-200/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
                <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
                  {t('home.storeTeaserBadge')}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
                  {t('home.storeTeaserTitle')}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {t('home.storeTeaserDesc')}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  {['Quận 1', 'Quận 3', 'Phú Nhuận', 'Gò Vấp', 'Thủ Đức', 'Bình Dương'].map((district) => (
                    <div key={district} className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <MapPin size={14} className="text-primary-500 shrink-0" />
                      <span>{district}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    to="/he-thong-cua-hang"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                  >
                    <span>{t('home.storeTeaserBtn')}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 h-72 lg:h-full bg-gradient-to-tr from-[#98B155] to-[#F6869D] relative overflow-hidden flex items-center justify-center p-8">
                <div className="text-center text-white space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto text-accent-gold">
                    <MapPin size={32} />
                  </div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-display)]">
                    {t('home.storeTeaserOpen')}
                  </h3>
                  <p className="text-lime-100 text-sm">
                    {t('home.storeTeaserHours')}
                  </p>
                  <div className="text-xs text-accent-gold font-bold uppercase tracking-wider">
                    GrabFood • ShopeeFood • Baemin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NHƯỢNG QUYỀN & HỢP TÁC CTA */}
      <section className="py-20 bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-widest font-extrabold text-accent-gold bg-white/10 px-4 py-1.5 rounded-full inline-block">
              {t('home.franchiseCtaBadge')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-[family-name:var(--font-display)] text-white">
              {t('home.franchiseCtaTitle')}
            </h2>
            <p className="text-lime-100/90 text-sm sm:text-base leading-relaxed">
              {t('home.franchiseCtaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/nhuong-quyen"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent-gold hover:bg-accent-gold-light text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                {t('home.franchiseCtaBtn')}
              </Link>
              <Link
                to="/tuyen-dung"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-300"
              >
                {t('home.franchiseCtaJoin')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
