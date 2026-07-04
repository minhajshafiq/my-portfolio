import frTranslations from '@/locales/fr.json'
import enTranslations from '@/locales/en.json'
import type { Locale } from './i18n'

const translations = {
  fr: frTranslations,
  en: enTranslations,
} as const

/** Accès aux traductions dans les composants serveur (pages, generateMetadata) */
export function getServerT(locale: Locale) {
  return (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[locale]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }
}

export function getServerList(locale: Locale, key: string): string[] {
  const keys = key.split('.')
  let value: unknown = translations[locale]

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return []
    }
  }

  return Array.isArray(value) ? value.map(String) : []
}
