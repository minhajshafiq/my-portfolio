'use client'

import { useState, useEffect } from 'react'
import frTranslations from '../locales/fr.json'
import enTranslations from '../locales/en.json'

type Language = 'fr' | 'en'

const translations = {
  fr: frTranslations,
  en: enTranslations
}

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('fr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }


    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue) {
        setLanguage(e.newValue as Language)
      }
    }


    window.addEventListener('storage', handleStorageChange)


    const handleCustomStorageChange = () => {
      const currentLanguage = localStorage.getItem('language') as Language
      if (currentLanguage && currentLanguage !== language) {
        setLanguage(currentLanguage)
      }
    }


    window.addEventListener('languageChange', handleCustomStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('languageChange', handleCustomStorageChange)
    }
  }, [language])

  const t = (key: string, params?: Record<string, any>) => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }

    // Support for returnObjects option
    if (params?.returnObjects && Array.isArray(value)) {
      return value
    }

    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce((str: string, [key, val]: [string, any]) => {
        return str.replace(new RegExp(`{{${key}}}`, 'g'), val)
      }, value)
    }

    return typeof value === 'string' ? value : key
  }

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)

    window.dispatchEvent(new Event('languageChange'))
  }

  return {
    language,
    changeLanguage,
    t,
    mounted
  }
}
