import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Services } from '@/features/services'
import { Contact } from '@/features/contact'
import { FAQ } from '@/features/home'
import { PageIntro } from '@/components/ui/PageIntro'
import { getPageMetadata } from '@/app/metadata'
import { locales, isValidLocale, type Locale } from '@/lib/i18n'

const PAGE_META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Services web pour artisans et entreprises locales',
    description:
      'Création de site vitrine, refonte, visibilité locale, fiche Google et maintenance pour artisans, commerçants, indépendants et petites entreprises.',
  },
  en: {
    title: 'Web services for tradespeople and local businesses',
    description:
      'Showcase websites, redesigns, local visibility, Google Business Profile and maintenance for tradespeople, shops, independents and small businesses.',
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
      <Services showHeader={false} />
      <FAQ />
      <Contact />
    </>
  )
}
