import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AboutFull } from '@/components/sections/AboutFull'
import { PageIntro } from '@/components/ui/PageIntro'
import { getPageMetadata } from '@/app/metadata'
import { locales, isValidLocale, type Locale } from '@/utils/i18n'

const PAGE_META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'À propos — Minhaj Zubair, développeur web freelance',
    description:
      'Développeur web indépendant basé à Paris : mon parcours, ma manière de travailler et ce qui m\'anime. Chaque projet est conçu et développé par une seule personne — moi.',
  },
  en: {
    title: 'About — Minhaj Zubair, freelance web developer',
    description:
      'Independent web developer based in Paris: my background, how I work and what drives me. Every project is designed and built by one person — me.',
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
  return getPageMetadata(locale, '/about', meta.title, meta.description)
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  return (
    <>
      <PageIntro
        labelKey="about_teaser.label"
        headingKey="pages.about.heading"
        introKey="pages.about.intro"
      />
      <AboutFull />
    </>
  )
}
