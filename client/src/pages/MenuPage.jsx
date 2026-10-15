import { useState, useEffect, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProductDetailModal from '../components/ProductDetailModal'
import { fetchProducts, fetchCategories, DEFAULT_PRODUCTS, DEFAULT_CATEGORIES } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

export default function MenuPage() {
  const { lang, t, dict, localizeCategory, localizeProduct } = useLanguage()

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [products, setProducts] = useState(DEFAULT_PRODUCTS)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = products.map(p => localizeProduct(p))

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))
      )
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [products, activeCategory, searchQuery, sortBy, lang])

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const toppingsList = dict.toppingsList || []

  return (
    <div className="bg-[#fbfcf8] min-h-screen pt-24 pb-20">
      {/* Menu Header Banner */}
      <section className="bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent-gold bg-white/10 px-4 py-1.5 rounded-full inline-block">
            {t('menu.bannerBadge')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-[family-name:var(--font-display)] tracking-tight">
            {t('menu.bannerTitle')}
          </h1>
          <p className="text-lime-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('menu.bannerDesc')}
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('menu.searchPlaceholder')}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 shrink-0">
              <SlidersHorizontal size={14} /> {t('menu.sortBy')}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:border-primary-500 cursor-pointer"
            >
              <option value="default">{t('menu.sortDefault')}</option>
              <option value="price-asc">{t('menu.sortPriceAsc')}</option>
              <option value="price-desc">{t('menu.sortPriceDesc')}</option>
              <option value="name">{t('menu.sortName')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none justify-start lg:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shrink-0 transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-105'
                  : 'bg-white text-gray-700 hover:bg-lime-50 hover:text-primary-600 border border-gray-200'
              }`}
            >
              {localizeCategory(cat)}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between my-6 text-xs sm:text-sm text-gray-500">
          <div>
            {lang === 'en' ? (
              <>Showing <strong className="text-gray-900">{filteredProducts.length}</strong> items</>
            ) : (
              <>Hiển thị <strong className="text-gray-900">{filteredProducts.length}</strong> món đồ uống</>
            )}
            {searchQuery && (
              <span> {lang === 'en' ? 'for query' : 'cho từ khóa'} "<span className="text-primary-600 font-semibold">{searchQuery}</span>"</span>
            )}
          </div>
          <div className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 hidden sm:block">
            {lang === 'en' ? '* Click any item to customize sweetness, ice & toppings' : '* Nhấn vào món để tùy chỉnh đường, đá & topping'}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod, index) => (
              <ProductCard
                key={prod.id}
                product={prod}
                index={index}
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200/60 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <Search size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">{t('menu.noResults')}</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              {t('menu.noResultsDesc')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="px-6 py-2.5 rounded-full bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 transition-colors cursor-pointer"
            >
              {t('menu.clearSearch')}
            </button>
          </div>
        )}

        {/* Topping Bar Showcase Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                {t('menu.toppingBadge')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)]">
                {t('menu.toppingTitle')}
              </h3>
              <p className="text-lime-100 text-sm leading-relaxed max-w-xl">
                {t('menu.toppingDesc')}
              </p>
            </div>
            <div className="md:col-span-4 flex flex-wrap gap-2 justify-start md:justify-end">
              {toppingsList.map((item) => (
                <span
                  key={item.id}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white backdrop-blur-md"
                >
                  {item.name} +{(item.price / 1000)}k
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
