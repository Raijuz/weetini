import { Link } from 'react-router-dom'
import { Heart, Handshake, Leaf } from 'lucide-react'
import { useCountUp } from '../hooks/useAnimations'
import { useLanguage } from '../context/LanguageContext'

export default function AboutPage() {
  const { t, dict } = useLanguage()

  const countCups = useCountUp(20000, 2000)
  const countStores = useCountUp(42, 1800)
  const countYears = useCountUp(6, 1500)

  const coreValues = dict.about?.coreValues || []
  const milestones = dict.about?.milestones || []

  return (
    <div className="bg-[#fbfcf8] min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="relative bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/hero-banner.jpg"
            alt="Weetini Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent-gold bg-white/10 px-4 py-1.5 rounded-full inline-block">
            {t('about.bannerBadge')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-[family-name:var(--font-display)] tracking-tight">
            {t('about.bannerTitle')}
          </h1>
          <p className="text-lime-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('about.bannerDesc')}
          </p>
        </div>
      </section>

      {/* Main Overview Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
                {t('about.journeyBadge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-[family-name:var(--font-display)]">
                {t('about.journeyTitle')}
              </h2>
              <div className="text-gray-600 space-y-4 text-base leading-relaxed">
                <p>{t('about.journeyP1')}</p>
                <p>{t('about.journeyP2')}</p>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div ref={countYears.ref} className="text-center sm:text-left">
                  <div className="text-3xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
                    {countYears.count}+
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{t('about.yearsStat')}</div>
                </div>
                <div ref={countStores.ref} className="text-center sm:text-left">
                  <div className="text-3xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
                    {countStores.count}+
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{t('about.storesStat')}</div>
                </div>
                <div ref={countCups.ref} className="text-center sm:text-left">
                  <div className="text-3xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
                    {countCups.count.toLocaleString()}+
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{t('about.cupsStat')}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/misc/about.jpg"
                  alt="Weetini Store Interior"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white space-y-1">
                    <div className="font-bold text-lg font-[family-name:var(--font-display)]">
                      {t('about.spaceTitle')}
                    </div>
                    <p className="text-xs text-lime-100">
                      {t('about.spaceDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
              {t('about.visionBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
              {t('about.visionTitle')}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              {t('about.visionDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#f7f9f0] border border-lime-200/60 hover:border-primary-300 transition-all duration-300 hover:shadow-xl text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-primary-500/30">
                <Handshake size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
                {t('about.partnersTitle')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('about.partnersDesc')}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f7f9f0] border border-lime-200/60 hover:border-primary-300 transition-all duration-300 hover:shadow-xl text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-accent-gold text-white flex items-center justify-center mx-auto shadow-lg shadow-accent-gold/30">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
                {t('about.customersTitle')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('about.customersDesc')}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f7f9f0] border border-lime-200/60 hover:border-primary-300 transition-all duration-300 hover:shadow-xl text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#607334] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#607334]/30">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
                {t('about.qualityTitle')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('about.qualityDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#fbfcf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-lime-100/80 px-3.5 py-1.5 rounded-full inline-block">
              {t('about.valuesBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
              {t('about.valuesTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, i) => (
              <div
                key={i}
                className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow space-y-3"
              >
                <div className="w-8 h-8 rounded-full bg-lime-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                  0{i + 1}
                </div>
                <h4 className="text-lg font-bold text-gray-800 font-[family-name:var(--font-display)]">
                  {val.title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
              {t('about.milestoneBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
              {t('about.milestoneTitle')}
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-primary-200">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                  idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                }`}
              >
                <div className="sm:w-1/2 pl-12 sm:pl-0">
                  <div
                    className={`p-6 rounded-2xl bg-[#f7f9f0] border border-lime-200/60 shadow-sm ${
                      idx % 2 === 0 ? 'sm:text-right' : 'sm:text-left'
                    }`}
                  >
                    <span className="text-primary-600 font-extrabold text-lg block font-[family-name:var(--font-display)]">
                      {milestone.year}
                    </span>
                    <h4 className="font-bold text-gray-900 text-base mt-1">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>

                {/* Pin node */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-xs shadow-md border-4 border-white">
                  {idx + 1}
                </div>

                <div className="hidden sm:block sm:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-[family-name:var(--font-display)]">
            {t('about.ctaTitle')}
          </h2>
          <p className="text-lime-100 text-sm sm:text-base">
            {t('about.ctaDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/menu"
              className="px-8 py-3.5 bg-accent-gold hover:bg-accent-gold-light text-white font-bold rounded-full transition-all duration-300 shadow-lg"
            >
              {t('about.ctaMenu')}
            </Link>
            <Link
              to="/nhuong-quyen"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-semibold transition-all duration-300 text-white"
            >
              {t('about.ctaFranchise')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
