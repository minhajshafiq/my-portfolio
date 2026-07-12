import type { Metadata } from 'next'
import { Maintenance } from '@/features/maintenance'
import { siteConfig } from '../../metadata'
import { isValidLocale, defaultLocale, type Locale } from '@/lib/i18n'

const content: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  fr: {
    title: 'Maintenance & Croissance',
    description:
      'Trois formules mensuelles : Essentiel (hébergement, sécurité, support), Visibilité (+ fiche Google Business Profile) et Croissance (+ campagne Google Ads gérée).',
    ogDescription:
      'Essentiel garde votre site en bonne santé, Visibilité fait travailler votre fiche Google, Croissance y ajoute une campagne Google Ads gérée.',
  },
  en: {
    title: 'Maintenance & Growth',
    description:
      'Three monthly plans: Essential (hosting, security, support), Visibility (+ Google Business Profile) and Growth (+ managed Google Ads campaign).',
    ogDescription:
      'Essential keeps your website healthy, Visibility puts your Google profile to work, Growth adds a managed Google Ads campaign.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale
  const c = content[locale]

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: `/${locale}/maintenance`,
      languages: {
        fr: '/fr/maintenance',
        en: '/en/maintenance',
        'x-default': '/fr/maintenance',
      },
    },
    openGraph: {
      title: `${c.title} | Minhaj Zubair`,
      description: c.ogDescription,
      url: `${siteConfig.url}/${locale}/maintenance`,
    },
  }
}

export default function MaintenancePage() {
  return <Maintenance />
}
