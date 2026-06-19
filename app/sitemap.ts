import { MetadataRoute } from 'next'
import { locales } from '@/utils/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.minhajshafiq.com'
  const currentDate = new Date().toISOString()

  const homeLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${baseUrl}/${locale}`])
  )
  const maintenanceLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${baseUrl}/${locale}/maintenance`])
  )

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 1 : 0.9,
      alternates: { languages: homeLanguages },
    })
  }

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/maintenance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: maintenanceLanguages },
    })
  }

  return entries
}
