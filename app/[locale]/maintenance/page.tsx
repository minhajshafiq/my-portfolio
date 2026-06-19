import type { Metadata } from 'next'
import { Maintenance } from '@/components/sections/Maintenance'
import { siteConfig } from '../../metadata'
import { isValidLocale, defaultLocale, type Locale } from '@/utils/i18n'

const content: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  fr: {
    title: 'Maintenance web',
    description:
      'Offres de maintenance web : hébergement, sécurité, sauvegardes et support. Gardez votre site en bonne santé sans vous en soucier.',
    ogDescription:
      'Offres de maintenance web : hébergement, sécurité, sauvegardes et support.',
  },
  en: {
    title: 'Website maintenance',
    description:
      'Website maintenance plans: hosting, security, backups and support. Keep your site healthy without the hassle.',
    ogDescription: 'Website maintenance plans: hosting, security, backups and support.',
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
