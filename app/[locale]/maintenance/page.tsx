import type { Metadata } from 'next'
import { Maintenance } from '@/components/sections/Maintenance'
import { siteConfig } from '../../metadata'
import { isValidLocale, defaultLocale, type Locale } from '@/utils/i18n'

const content: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  fr: {
    title: 'Maintenance & Croissance',
    description:
      'Trois formules pour votre site : Maintenance seule (hébergement, sécurité, support), Croissance seule (Google Ads, Google My Business) ou le Pack Croissance Complète qui réunit les deux.',
    ogDescription:
      'Trois formules : la maintenance qui garde votre site en bonne santé, la croissance qui lui amène des clients, ou le pack complet qui réunit les deux.',
  },
  en: {
    title: 'Maintenance & Growth',
    description:
      'Three plans for your website: Maintenance alone (hosting, security, support), Growth alone (Google Ads, Google Business Profile), or the Full Growth Package combining both.',
    ogDescription:
      'Three plans: maintenance keeps your website healthy, growth brings it customers, or the full package combines both.',
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
