'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import frTranslations from '../locales/fr.json'
import enTranslations from '../locales/en.json'
import { isValidLocale, defaultLocale, type Locale } from '@/utils/i18n'

const translations = {
  fr: frTranslations,
  en: enTranslations,
}

export function useTranslation() {
  const params = useParams<{ locale?: string | string[] }>()
  const pathname = usePathname()
  const router = useRouter()

  const rawLocale = Array.isArray(params?.locale) ? params.locale[0] : params?.locale
  const language: Locale = rawLocale && isValidLocale(rawLocale) ? rawLocale : defaultLocale

  const t = (key: string, options?: Record<string, any>) => {
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
    if (options?.returnObjects && Array.isArray(value)) {
      return value
    }

    if (typeof value === 'string' && options) {
      return Object.entries(options).reduce((str: string, [key, val]: [string, any]) => {
        return str.replace(new RegExp(`{{${key}}}`, 'g'), val)
      }, value)
    }

    return typeof value === 'string' ? value : key
  }

  const changeLanguage = (lang: Locale) => {
    if (lang === language) return

    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`

    const segments = pathname.split('/')
    segments[1] = lang
    router.push(segments.join('/') || `/${lang}`)
  }

  return {
    language,
    changeLanguage,
    t,
  }
}
