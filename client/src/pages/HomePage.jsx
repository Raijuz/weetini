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
  Flame,
  Phone
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProductDetailModal from '../components/ProductDetailModal'
import SplitText from '../components/SplitText'
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
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-[#98B155] via-[#859f47] to-[#F6869D]/90 text-white overflow-hidden pt-24 pb-16">
        {/* Ambient radial glows */}
        <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-white/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#F6869D]/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle decorative flying tea leaves SVG in background */}
        <div className="absolute top-16 left-8 opacity-25 pointer-events-none animate-float">
          <Leaf size={48} className="text-white transform -rotate-45" />
        </div>
        <div className="absolute bottom-20 left-16 opacity-20 pointer-events-none animate-float" style={{ animationDelay: '1.2s' }}>
          <Leaf size={36} className="text-white transform rotate-12" />
        </div>
        <div className="absolute top-28 right-16 opacity-25 pointer-events-none animate-float" style={{ animationDelay: '0.7s' }}>
          <Leaf size={32} className="text-white transform rotate-45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 2xl:gap-14 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-5 xl:space-y-7 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 text-xs sm:text-sm font-semibold text-white tracking-wide">
                <Sparkles size={16} className="text-[#F6869D]" />
                <span>{t('home.heroBadge')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[54px] 2xl:text-[64px] font-black tracking-tight font-[family-name:var(--font-display)] leading-[1.18] select-none">
                <div className="block">
                  <SplitText
                    text={t('home.heroTitle1', 'MỖI NGỤM TƯƠI,')}
                    className="text-3d-elevate"
                    tag="span"
                    effect="rise"
                    splitType="chars"
                    delay={35}
                    duration={1.0}
                    staggerFrom="start"
                    trigger="load"
                    hoverEffect="lift"
                    textAlign="left"
                  />
                </div>
                <div className="block mt-1 sm:mt-2">
                  <SplitText
                    text={t('home.heroTitle2', 'MỞ RA MỘT TẦNG')}
                    className="text-3d-elevate"
                    tag="span"
                    effect="rise"
                    splitType="chars"
                    delay={35}
                    duration={1.0}
                    staggerFrom="start"
                    trigger="load"
                    hoverEffect="lift"
                    textAlign="left"
                  />
                </div>
                <div className="block mt-1 sm:mt-2">
                  <SplitText
                    text={t('home.heroTitle3', 'HƯƠNG VỊ.')}
                    className="text-3d-elevate-pink"
                    tag="span"
                    effect="rise"
                    splitType="chars"
                    delay={35}
                    duration={1.0}
                    staggerFrom="start"
                    trigger="load"
                    hoverEffect="lift"
                    textAlign="left"
                  />
                </div>
              </h1>

              <p className="text-sm sm:text-base lg:text-base xl:text-lg text-lime-100/95 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                {t('home.heroDesc')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-accent-gold hover:bg-accent-gold-light text-white font-bold text-center tracking-wide transition-all duration-300 shadow-lg hover:shadow-accent-gold/30 hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <span>{t('home.heroBtnExplore', t('common.exploreMenu'))}</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-center border border-white/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <MapPin size={18} />
                  <span>{t('home.heroBtnChoose', t('common.findStores'))}</span>
                </Link>
              </div>

              {/* Trust badges - responsive không tràn và không đè chữ */}
              <div className="pt-6 sm:pt-8 grid grid-cols-3 gap-2 sm:gap-4 lg:gap-3 xl:gap-5 border-t border-white/15 max-w-xl mx-auto lg:mx-0">
                <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                  <div className="flex items-center gap-1.5 text-white font-extrabold text-xs sm:text-sm lg:text-xs xl:text-sm font-[family-name:var(--font-display)] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
                    <Leaf size={15} className="shrink-0 text-accent-gold drop-shadow-xs" />
                    <span className="whitespace-nowrap">{t('home.heroFeatureTea', 'Trà Chọn Lọc')}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-lime-100/80 mt-1 leading-normal font-medium">{t('home.heroStatsTeaLabel')}</div>
                </div>
                <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                  <div className="flex items-center gap-1.5 text-white font-extrabold text-xs sm:text-sm lg:text-xs xl:text-sm font-[family-name:var(--font-display)] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
                    <Sparkles size={15} className="shrink-0 text-accent-gold drop-shadow-xs" />
                    <span className="whitespace-nowrap">{t('home.heroFeatureFruit', 'Trái Cây Tươi')}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-lime-100/80 mt-1 leading-normal font-medium">{t('home.heroStatsStoresLabel')}</div>
                </div>
                <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                  <div className="flex items-center gap-1.5 text-white font-extrabold text-xs sm:text-sm lg:text-xs xl:text-sm font-[family-name:var(--font-display)] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
                    <Clock size={15} className="shrink-0 text-accent-gold drop-shadow-xs" />
                    <span className="whitespace-nowrap">{t('home.heroFeatureBrew', 'Pha Chế Mỗi Ngày')}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-lime-100/80 mt-1 leading-normal font-medium">{t('home.heroStatsCupsLabel')}</div>
                </div>
              </div>
            </div>

            {/* Right cup image column: Responsive Container + Carousel */}
            <div className="lg:col-span-5 flex justify-center items-center relative py-4 lg:py-6 lg:translate-x-0 xl:translate-x-4 2xl:translate-x-8">
              <div className="relative w-72 sm:w-88 md:w-96 lg:w-[380px] xl:w-[460px] 2xl:w-[500px] aspect-[4/5] flex items-center justify-center select-none pointer-events-none">
                {/* Ambient Soft Glow Behind Cup */}
                <div className="absolute inset-6 sm:inset-8 rounded-full bg-gradient-to-tr from-amber-300/25 via-rose-300/30 to-pink-500/25 blur-3xl pointer-events-none" />

                {/* Subtle orbit circle */}
                <div className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-white/20 animate-[spin_50s_linear_infinite] pointer-events-none translate-y-7 sm:translate-y-9" />

                {/* ==================================================== */}
                {/* 1. CENTERPIECE: WEETINI CUP (tini-rmbg.png)           */}
                {/* ==================================================== */}
                <div className="relative z-20 flex flex-col items-center pointer-events-none">
                  <img
                    src="/images/hero/tini-rmbg.png"
                    alt="WEE TINI Signature Cup"
                    className="w-48 sm:w-56 md:w-60 lg:w-60 xl:w-72 2xl:w-80 h-auto object-contain animate-hero-cup drop-shadow-[0_20px_35px_rgba(0,0,0,0.28)] pointer-events-none select-none"
                  />
                  {/* Soft realistic cup base shadow */}
                  <div className="w-40 sm:w-48 md:w-52 lg:w-52 xl:w-64 2xl:w-68 h-4 sm:h-5 bg-black/25 rounded-full blur-md -mt-1 pointer-events-none transform scale-y-50" />
                </div>

                {/* ==================================================== */}
                {/* 2. 3D ORBITING INGREDIENTS AROUND THE CUP            */}
                {/* 7 nguyên liệu chia đều ~51.4° quanh vòng tròn 360°,  */}
                {/* cách nhau 2.0s trên chu kỳ 14s, so le độ cao quanh thân ly */}
                {/* ==================================================== */}

                {/* 1. Mốc 0.0s: Cành lá trà tươi (b5.png) - Cao gần miệng cốc (-105px) */}
                <div
                  className="orbit-fruit animate-orbit-carousel pointer-events-none"
                  style={{ '--orbit-y': '-105px', animationDelay: '0s' }}
                >
                  <img
                    src="/images/hero/b5.png"
                    alt="Cành lá trà tươi"
                    className="w-14 sm:w-16 md:w-18 lg:w-18 xl:w-22 2xl:w-25 h-auto object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.35)] pointer-events-none select-none"
                  />
                </div>

                {/* 2. Mốc -2.0s: Vệt sữa dâu xoáy (b8.png) - Lưng chừng dưới (+35px) */}
                <div
                  className="orbit-fruit animate-orbit-carousel pointer-events-none"
                  style={{ '--orbit-y': '35px', animationDelay: '-2.0s' }}
                >
                  <img
                    src="/images/hero/b8.png"
                    alt="Vệt sữa dâu xoáy mềm"
                    className="w-18 sm:w-22 md:w-24 lg:w-24 xl:w-30 2xl:w-34 h-auto object-contain drop-shadow-[0_16px_25px_rgba(0,0,0,0.35)] pointer-events-none select-none"
                  />
                </div>

                {/* 3. Mốc -4.0s: Búp trà non (b2.png) - Lưng chừng trên (-60px) */}
                <div
                  className="orbit-fruit animate-orbit-carousel pointer-events-none"
                  style={{ '--orbit-y': '-60px', animationDelay: '-4.0s' }}
                >
                  <img
                    src="/images/hero/b2.png"
                    alt="Búp trà xanh non"
                    className="w-9 sm:w-11 md:w-12 lg:w-12 xl:w-14 2xl:w-16 h-auto object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.28)] pointer-events-none select-none"
                  />
                </div>

                {/* 4. Mốc -6.0s: Dòng sữa trắng uốn lượn (mi.png) - Tầng dưới thân cốc (+75px) */}
                <div
                  className="orbit-fruit animate-orbit-carousel pointer-events-none"
                  style={{ '--orbit-y': '75px', animationDelay: '-6.0s' }}
                >
                  <img
                    src="/images/hero/mi.png"
                    alt="Dòng sữa tươi bồng bềnh"
                    className="w-28 sm:w-34 md:w-38 lg:w-38 xl:w-48 2xl:w-54 h-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.32)] pointer-events-none select-none"
                  />
                </div>

                {/* 5. Mốc -8.0s: Chiếc lá trà vàng óng (b1.png) - Lưng chừng giữa (-20px) */}
                <div
                  className="orbit-fruit animate-orbit-carousel pointer-events-none"
                  style={{ '--orbit-y': '-20px', animationDelay: '-8.0s' }}
                >
                  <img
                    src="/images/hero/b1.png"
                    alt="Lá trà vàng óng"
                    className="w-8 sm:w-10 md:w-11 lg:w-11 xl:w-13 2xl:w-15 h-auto object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.3)] pointer-events-none select-none"
                  />
                </div>

                {/* 6. Mốc -10.0s: Quả dâu tây đỏ mọng (strawberry_bottom.png) - Sát đáy cốc (+105px) */}
                <div
                  className="orbit-fruit animate-orbit-carousel pointer-events-none"
                  style={{ '--orbit-y': '105px', animationDelay: '-10.0s' }}
                >
                  <img
                    src="/images/hero/strawberry_bottom.png"
                    alt="Quả dâu tây đỏ mọng"
                    className="w-12 sm:w-14 md:w-15 lg:w-15 xl:w-18 2xl:w-20 h-auto object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.35)] pointer-events-none select-none"
                  />
                </div>

                {/* 7. Mốc -12.0s: Làn sóng trà matcha (b4.png) - Chính giữa thân cốc (0px) */}
                <div
                  className="orbit-fruit animate-orbit-carousel pointer-events-none"
                  style={{ '--orbit-y': '0px', animationDelay: '-12.0s' }}
                >
                  <img
                    src="/images/hero/b4.png"
                    alt="Làn sóng trà matcha"
                    className="w-14 sm:w-16 md:w-18 lg:w-18 xl:w-22 2xl:w-25 h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)] pointer-events-none select-none"
                  />
                </div>

                {/* Freshly Made stamp badge - anchored decorative seal */}
                <div className="absolute top-2 -right-2 sm:top-4 sm:-right-4 lg:top-2 lg:-right-3 xl:top-4 xl:-right-6 z-35 animate-hero-badge pointer-events-none">
                  <img
                    src="/images/hero/badge.png"
                    alt="Freshly Made WEE TINI"
                    className="w-13 sm:w-15 lg:w-16 xl:w-20 2xl:w-22 h-auto object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.25)] pointer-events-none select-none"
                  />
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
                  alt="WEE TINI Store"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md text-dark shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white font-bold">
                      W
                    </div>
                    <div>
                      <div className="font-bold text-sm">1+ Years of Growth</div>
                      <div className="text-xs text-gray-500">2026 - 20226</div>
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
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${selectedCategory === cat.id
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
                    const tiniItem = products.find(p => p.slug === 'wee-tini-subarashii') || products[0]
                    handleProductSelect(localizeProduct(tiniItem))
                  }}
                  className="px-7 py-3.5 bg-accent-gold hover:bg-accent-gold-light text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  {t('home.spotlightAction')}
                </button>
                <Link
                  to="/lien-he"
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-semibold transition-all duration-300 text-white"
                >
                  {t('home.spotlightStoreLink')}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="w-64 sm:w-72 md:w-80 aspect-[3/4] rounded-3xl bg-white/15 backdrop-blur-md p-3 border-2 border-white/40 shadow-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/products/tini.jpg"
                    alt="WEE TINI Signature"
                    className="w-full h-full object-cover rounded-2xl drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-accent-gold text-white font-extrabold text-sm px-4 py-2 rounded-2xl shadow-xl ring-2 ring-white">
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

                <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2.5">
                  <div className="flex items-start gap-3 text-sm text-gray-800 font-bold">
                    <MapPin size={18} className="text-primary-500 shrink-0 mt-0.5" />
                    <span>37/14A Trịnh Đình Thảo, P. Tân Phú, TP. HCM (Trụ sở chính)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <Clock size={15} className="text-primary-500 shrink-0" />
                    <span>08:00 - 22:30 • Mở cửa tất cả các ngày trong tuần</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <Phone size={15} className="text-primary-500 shrink-0" />
                    <a href="tel:0908639279" className="font-bold text-primary-600 hover:underline">
                      Hotline: 0908 639 279
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/lien-he"
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
