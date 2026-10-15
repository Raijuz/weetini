import { useState } from 'react'
import {
  Award,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle2,
  Send,
  Heart
} from 'lucide-react'
import { DEFAULT_RECRUITMENT } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

export default function RecruitmentPage() {
  const { lang, t, dict } = useLanguage()

  const enJobs = [
    {
      id: 1,
      title: 'Barista (Drink Specialist)',
      location: 'All branches in HCMC & Binh Duong',
      type: 'Full-time / Flexible Part-time',
      salary: '25,000 - 32,000 VND/hr (~6M - 8.5M VND/mo)',
      description: 'Directly craft signature milk teas and fresh fruit teas according to standardized recipes; keep bar pristine and provide friendly hospitality.',
      requirements: [
        'Age: 18 - 26 years old',
        'Agile, honest, cheerful and enthusiastic attitude',
        'No prior experience required; thorough paid training provided',
        'Available for minimum 4-5 shifts per week',
      ],
      benefits: [
        'Meal allowance & monthly store sales performance bonus',
        '50% employee discount on all Weetini beverages',
        'Clear promotion path to Shift Leader within 3-6 months',
      ],
    },
    {
      id: 2,
      title: 'Store Manager',
      location: 'District 1, District 3, Phu Nhuan',
      type: 'Full-time',
      salary: '10,000,000 - 15,000,000 VND/month + KPI Bonus',
      description: 'Oversee daily store operations, schedule staff shifts, manage inventory supplies, and drive revenue targets.',
      requirements: [
        'Age: 22 - 32 years old',
        'Minimum 1 year relevant management experience in F&B',
        'Strong team leadership, communication and problem-solving skills',
        'High sense of accountability under pressure',
      ],
      benefits: [
        'Full statutory social and health insurance',
        'Holiday bonuses, Lunar New Year 13th-month salary',
        'Fast-track training towards Area Manager',
      ],
    },
    {
      id: 3,
      title: 'Cashier & Service Crew',
      location: 'HCMC Branches',
      type: 'Part-time / University Students',
      salary: '24,000 - 28,000 VND/hr',
      description: 'Take guest orders, process payments, and ensure clean, welcoming dining spaces.',
      requirements: [
        '18 years of age or older',
        'Polite, cheerful customer communication',
        'Hardworking team player with a can-do mindset',
      ],
      benefits: [
        'Flexible weekly scheduling around university timetables',
        'Young, energetic and friendly work environment',
      ],
    },
  ]

  const jobsList = lang === 'en' ? enJobs : DEFAULT_RECRUITMENT
  const [selectedJob, setSelectedJob] = useState(jobsList[0])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: jobsList[0]?.title || '',
    working_time: lang === 'en' ? 'Flexible Part-time' : 'Part-time linh hoạt',
    branch_pref: 'Quận 1 / Quận 3',
    intro: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 700)
  }

  const perkIcons = [DollarSign, Clock, Award, Heart]
  const perks = dict.recruitment?.perks || []

  return (
    <div className="bg-[#fbfcf8] min-h-screen pt-24 pb-20">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#98B155] to-[#F6869D] text-white py-16 sm:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent-gold bg-white/10 px-4 py-1.5 rounded-full inline-block">
            {t('recruitment.bannerBadge')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-[family-name:var(--font-display)] tracking-tight">
            {t('recruitment.bannerTitle')}
          </h1>
          <p className="text-lime-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('recruitment.bannerDesc')}
          </p>
        </div>
      </section>

      {/* Perks Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((item, i) => {
            const Icon = perkIcons[i % perkIcons.length]
            return (
              <div
                key={i}
                className="bg-white p-7 rounded-3xl shadow-xl border border-gray-100 space-y-3"
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

      {/* Available Jobs & Application Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
            {t('recruitment.jobsBadge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-600 font-[family-name:var(--font-display)]">
            {t('recruitment.jobsTitle')}
          </h2>
          <p className="text-gray-500 text-sm">
            {t('recruitment.jobsDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Job List Navigation */}
          <div className="lg:col-span-5 space-y-4">
            {jobsList.map((job) => {
              const isSelected = selectedJob.id === job.id
              return (
                <div
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job)
                    setFormData({ ...formData, position: job.title })
                  }}
                  className={`p-6 rounded-2xl bg-white border-2 cursor-pointer transition-all shadow-sm ${
                    isSelected
                      ? 'border-primary-500 bg-lime-50/50 shadow-primary-500/10'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg font-[family-name:var(--font-display)]">
                        {job.title}
                      </h4>
                      <div className="text-xs text-primary-600 font-bold mt-1">
                        {job.salary}
                      </div>
                    </div>
                    <span className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                    <MapPin size={14} className="text-primary-500 shrink-0" />
                    <span>{job.location}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Job Details Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-primary-500 bg-primary-50 px-2.5 py-1 rounded-md">
                {lang === 'en' ? 'Job Specification' : 'Chi tiết tuyển dụng'}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)] mt-2">
                {selectedJob.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs text-gray-600 mt-2">
                <div><strong>{t('recruitment.salaryLabel')}</strong> {selectedJob.salary}</div>
                <div>•</div>
                <div><strong>{t('recruitment.typeLabel')}</strong> {selectedJob.type}</div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h5 className="font-bold text-gray-900 mb-1.5">
                  {lang === 'en' ? 'Job Responsibilities:' : 'Mô tả công việc:'}
                </h5>
                <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 mb-1.5">{t('recruitment.reqLabel')}</h5>
                <ul className="space-y-1.5 pl-4 list-disc text-gray-600">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 mb-1.5">{t('recruitment.benLabel')}</h5>
                <ul className="space-y-1.5 pl-4 list-disc text-gray-600">
                  {selectedJob.benefits.map((ben, i) => (
                    <li key={i}>{ben}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <a
                href="#apply-form"
                className="inline-block px-8 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-md transition-all"
              >
                {t('recruitment.applyJobBtn')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Online Job Application Form */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="apply-form">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100">
          <div className="text-center space-y-3 mb-8">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary-500 bg-primary-50 px-3.5 py-1.5 rounded-full inline-block">
              {lang === 'en' ? 'Quick Application' : 'Nộp Hồ Sơ Nhanh'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-[family-name:var(--font-display)]">
              {t('recruitment.modalTitle')}
            </h2>
            <p className="text-gray-500 text-sm">
              {lang === 'en'
                ? 'Weetini HR will review your submission and contact you within 48 business hours.'
                : 'Bộ phận Nhân sự Weetini sẽ liên hệ lại với bạn trong vòng 48 giờ làm việc.'}
            </p>
          </div>

          {submitted ? (
            <div className="bg-lime-50 border-2 border-primary-500 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-900">
                {t('recruitment.modalSuccessTitle')}
              </h3>
              <p className="text-primary-700 text-sm max-w-md mx-auto">
                {t('recruitment.modalSuccessDesc')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 cursor-pointer"
              >
                {lang === 'en' ? 'Submit another application' : 'Gửi thêm hồ sơ khác'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('recruitment.modalNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={lang === 'en' ? 'John Doe' : 'Nguyễn Văn A'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('recruitment.modalPhoneLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0912 345 678"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('recruitment.modalEmailLabel')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="applicant@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {lang === 'en' ? 'Position Applying For' : 'Vị trí ứng tuyển'}
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary-500 text-sm cursor-pointer"
                  >
                    {jobsList.map((j) => (
                      <option key={j.id} value={j.title}>
                        {j.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('recruitment.modalShiftLabel')}
                  </label>
                  <select
                    name="working_time"
                    value={formData.working_time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary-500 text-sm cursor-pointer"
                  >
                    <option value="Part-time">{t('recruitment.modalShiftPartTime')}</option>
                    <option value="Full-time">{t('recruitment.modalShiftFullTime')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t('recruitment.modalDistrictLabel')}
                  </label>
                  <input
                    type="text"
                    name="branch_pref"
                    value={formData.branch_pref}
                    onChange={handleChange}
                    placeholder={lang === 'en' ? 'District 1, District 3, Binh Duong...' : 'Quận 1, Quận 3, Phú Nhuận...'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t('recruitment.modalIntroLabel')}
                </label>
                <textarea
                  rows={4}
                  name="intro"
                  value={formData.intro}
                  onChange={handleChange}
                  placeholder={
                    lang === 'en'
                      ? 'Tell us briefly about your availability, background, or customer service experience...'
                      : 'Em đã từng làm nhân viên pha chế tại... trong 6 tháng, tính tình vui vẻ, cẩn thận...'
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <span>{t('recruitment.modalSubmittingBtn')}</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{t('recruitment.modalSubmitBtn')}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
