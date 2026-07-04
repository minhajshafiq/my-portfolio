import { MetadataRoute } from 'next'
import { locales } from '@/utils/i18n'
import { PROJECTS } from '@/data/projects'

type RouteConfig = {
  path: string
  changeFrequency: 'weekly' | 'monthly'
  priority: number
}

const ROUTES: RouteConfig[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/work', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/maintenance', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/cv', changeFrequency: 'monthly', priority: 0.4 },
  ...PROJECTS.map((project) => ({
    path: `/work/${project.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.minhajshafiq.com'
  const currentDate = new Date().toISOString()

  const entries: MetadataRoute.Sitemap = []

  for (const route of ROUTES) {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, `${baseUrl}/${locale}${route.path}`])
    )

    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: locale === 'fr' ? route.priority : Math.max(route.priority - 0.1, 0.1),
        alternates: { languages },
      })
    }
  }

  return entries
}
