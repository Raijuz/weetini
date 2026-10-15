import { useState, useEffect, useMemo } from 'react'
import { MapPin, Phone, Clock, Search, Navigation, Store, ExternalLink } from 'lucide-react'
import { fetchStores, DEFAULT_STORES } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

export default function StoresPage() {
  const { lang, t } = useLanguage()

  const [stores, setStores] = useState(DEFAULT_STORES)
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeStore, setActiveStore] = useState(DEFAULT_STORES[0])

  const DISTRICTS = [
    { id: 'all', label: t('stores.allDistricts') },
    { id: 'Quận 1', label: 'Quận 1' },
    { id: 'Quận 3', label: 'Quận 3' },
    { id: 'Phú Nhuận', label: 'Phú Nhuận' },
    { id: 'Gò Vấp', label: 'Gò Vấp' },
    { id: 'Thủ Đức', label: 'TP. Thủ Đức' },
    { id: 'Bình Dương', label: 'Bình Dương' },
    { id: 'Biên Hòa', label: 'Biên Hòa' },
  ]

  useEffect(() => {
    async function loadData() {
      const data = await fetchStores()
      if (data && data.length) {
        setStores(data)
        setActiveStore(data[0])
      }
    }
    loadData()
  }, [])

  const filteredStores = useMemo(() => {
    return stores.filter((s) => {
      const matchDistrict = selectedDistrict === 'all' || s.district === selectedDistrict
      const q = searchQuery.toLowerCase().trim()
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q)
      return matchDistrict && matchSearch
    })
  }, [stores, selectedDistrict, searchQuery])

  return (
    <div className="bg-[#fbfcf8] min-h-screen pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent-gold bg-white/10 px-4 py-1.5 rounded-full inline-block">
            {t('stores.bannerBadge')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-[family-name:var(--font-display)] tracking-tight">
            {t('stores.bannerTitle')}
          </h1>
          <p className="text-lime-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('stores.bannerDesc')}
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('stores.searchPlaceholder')}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm"
            />
          </div>

          {/* District Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {DISTRICTS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDistrict(d.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide shrink-0 transition-all cursor-pointer ${
                  selectedDistrict === d.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Stores Directory Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-xs text-gray-500 mb-6">
          {lang === 'en' ? (
            <>Showing <strong>{filteredStores.length}</strong> matching stores</>
          ) : (
            <>Hiển thị <strong>{filteredStores.length}</strong> cửa hàng phù hợp</>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Store list */}
          <div className="lg:col-span-7 space-y-4 max-h-[750px] overflow-y-auto pr-1">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => {
                const isSelected = activeStore && activeStore.id === store.id
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${store.name} ${store.address}`
                )}`

                return (
                  <div
                    key={store.id}
                    onClick={() => setActiveStore(store)}
                    className={`p-6 rounded-2xl bg-white border-2 transition-all cursor-pointer shadow-sm hover:shadow-md ${
                      isSelected
                        ? 'border-primary-500 bg-lime-50/50 shadow-primary-500/10'
                        : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#98b155]"></span>
                          <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-display)]">
                            {store.name}
                          </h3>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600">
                          <MapPin size={16} className="text-primary-500 shrink-0 mt-0.5" />
                          <span>{store.address}</span>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 pt-1">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-accent-gold" />
                            <span>{store.hours}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone size={14} className="text-accent-gold" />
                            <a
                              href={`tel:${store.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-primary-600 font-medium text-gray-700"
                            >
                              {store.phone}
                            </a>
                          </div>
                        </div>

                        {/* Features chips */}
                        {store.features && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {store.features.map((feat, i) => (
                              <span
                                key={i}
                                className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 rounded-xl bg-gray-100 hover:bg-primary-50 hover:text-primary-600 text-gray-600 transition-colors flex items-center justify-center text-xs font-semibold gap-1"
                          title="Open Google Maps"
                        >
                          <Navigation size={14} />
                          <span className="hidden sm:inline">{t('stores.directions')}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl p-6 space-y-3">
                <Store size={36} className="text-gray-300 mx-auto" />
                <h4 className="font-bold text-gray-700">{t('stores.noStores')}</h4>
                <p className="text-xs text-gray-500">
                  {t('stores.noStoresDesc')}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Active Store Map & Details Showcase */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Map simulation header */}
              <div className="h-56 bg-gradient-to-br from-lime-100 via-emerald-100 to-amber-50 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#98b155_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Central pin marker */}
                <div className="relative text-center z-10 space-y-2">
                  <div className="w-14 h-14 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto shadow-xl ring-8 ring-white animate-bounce">
                    <MapPin size={28} />
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md text-xs font-bold text-gray-800">
                    {activeStore ? activeStore.name : 'Weetini Location'}
                  </div>
                </div>
              </div>

              {/* Store Details Body */}
              {activeStore && (
                <div className="p-6 space-y-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-primary-500 bg-primary-50 px-2.5 py-1 rounded-md">
                      {activeStore.district}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-display)] mt-2">
                      {activeStore.name}
                    </h3>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-primary-500 shrink-0 mt-0.5" />
                      <span>{activeStore.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-primary-500 shrink-0" />
                      <span>{activeStore.hours} ({lang === 'en' ? 'Open all week' : 'Mở cửa cả tuần'})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-primary-500 shrink-0" />
                      <a href={`tel:${activeStore.phone}`} className="font-bold text-primary-600 hover:underline">
                        {activeStore.phone}
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col gap-2.5">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${activeStore.name} ${activeStore.address}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-center text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Navigation size={16} />
                      <span>{lang === 'en' ? 'Directions on Google Maps' : 'Chỉ đường trên Google Maps'}</span>
                      <ExternalLink size={14} />
                    </a>

                    <a
                      href={`tel:${activeStore.phone}`}
                      className="w-full py-3 px-4 rounded-xl bg-accent-gold hover:bg-accent-gold-light text-white font-bold text-center text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Phone size={16} />
                      <span>{lang === 'en' ? 'Call hotline for quick order' : 'Gọi hotline đặt hàng nhanh'}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
