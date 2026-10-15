import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { translations } from '../locales/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    // Check URL param first
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const urlLang = params.get('lang')
      if (urlLang === 'en' || urlLang === 'vi') return urlLang

      const saved = localStorage.getItem('weetini_lang')
      if (saved === 'en' || saved === 'vi') return saved
    }
    return 'vi'
  })

  useEffect(() => {
    try {
      localStorage.setItem('weetini_lang', lang)
      document.documentElement.lang = lang
    } catch {
      // storage unavailable
    }
  }, [lang])

  const setLanguage = (newLang) => {
    if (newLang === 'en' || newLang === 'vi') {
      setLangState(newLang)
    }
  }

  const toggleLanguage = () => {
    setLangState((prev) => (prev === 'vi' ? 'en' : 'vi'))
  }

  // Translation helper: t('section.key')
  const t = useMemo(() => {
    const currentDict = translations[lang] || translations.vi
    const fallbackDict = translations.vi

    return (path, fallback = '') => {
      if (!path) return fallback
      const keys = path.split('.')
      
      let cur = currentDict
      for (const k of keys) {
        if (cur && typeof cur === 'object' && k in cur) {
          cur = cur[k]
        } else {
          cur = undefined
          break
        }
      }

      if (cur !== undefined) return cur

      // Try fallback
      let fb = fallbackDict
      for (const k of keys) {
        if (fb && typeof fb === 'object' && k in fb) {
          fb = fb[k]
        } else {
          fb = undefined
          break
        }
      }

      return fb !== undefined ? fb : fallback
    }
  }, [lang])

  // Localize a product object
  const localizeProduct = (product) => {
    if (!product) return product
    const currentDict = translations[lang] || translations.vi
    const prodMap = currentDict.productsMap?.[product.slug]
    if (!prodMap) return product

    return {
      ...product,
      name: prodMap.name || product.name,
      description: prodMap.description || product.description,
      ingredients: prodMap.ingredients || product.ingredients,
      categoryName: prodMap.category || product.category,
    }
  }

  // Localize category
  const localizeCategory = (category) => {
    if (!category) return category
    const currentDict = translations[lang] || translations.vi
    const catName = currentDict.categoriesMap?.[category.id || category.slug]
    return catName || category.name
  }

  // Format currency
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return amount
    if (lang === 'en') {
      return `${amount.toLocaleString('en-US')} VND`
    }
    return `${amount.toLocaleString('vi-VN')} đ`
  }

  const value = {
    lang,
    isEn: lang === 'en',
    setLanguage,
    toggleLanguage,
    t,
    localizeProduct,
    localizeCategory,
    formatCurrency,
    dict: translations[lang] || translations.vi,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
