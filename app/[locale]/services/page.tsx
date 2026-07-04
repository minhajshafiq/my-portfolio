import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Services } from '@/components/sections/Services'
import { Contact } from '@/components/sections/Contact'
import { PageIntro } from '@/components/ui/PageIntro'
import { getPageMetadata } from '@/app/metadata'
import { locales, isValidLocale, type Locale } from '@/utils/i18n'

const PAGE_META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Services — Création de site internet sur mesure',
    description:
      'Création de site vitrine, application web, refonte et suivi : des services sur mesure pour indépendants, marques et entrepreneurs. Devis gratuit sous 48 h.',
  },
  en: {
    title: 'Services — Custom website design & development',
    description:
      'Custom websites, web applications, redesigns and ongoing care: tailored services for independents, brands and entrepreneurs. Free quote within 48 hours.',
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const meta = PAGE_META[locale]
  return getPageMetadata(locale, '/services', meta.title, meta.description)
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  return (
    <>
      <PageIntro
        labelKey="services.label"
        headingKey="pages.services.heading"
        introKey="pages.services.intro"
      />
      <Services />
      <Contact />
    </>
  )
}
