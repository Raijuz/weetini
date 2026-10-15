import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MenuPage from './pages/MenuPage'
import StoresPage from './pages/StoresPage'
import FranchisePage from './pages/FranchisePage'
import RecruitmentPage from './pages/RecruitmentPage'
import { useLanguage } from './context/LanguageContext'

function App() {
  const location = useLocation()
  const { setLanguage } = useLanguage()

  useEffect(() => {
    if (location.pathname.startsWith('/en')) {
      setLanguage('en')
    }
  }, [location.pathname, setLanguage])

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ve-chung-toi" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/he-thong-cua-hang" element={<StoresPage />} />
          <Route path="/nhuong-quyen" element={<FranchisePage />} />
          <Route path="/tuyen-dung" element={<RecruitmentPage />} />

          {/* English route aliases */}
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/about" element={<AboutPage />} />
          <Route path="/en/menu" element={<MenuPage />} />
          <Route path="/en/stores" element={<StoresPage />} />
          <Route path="/en/franchise" element={<FranchisePage />} />
          <Route path="/en/careers" element={<RecruitmentPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

