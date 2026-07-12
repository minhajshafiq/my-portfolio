import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WorkList } from '@/features/projects'
import { getPageMetadata } from '@/app/metadata'
import { locales, isValidLocale, type Locale } from '@/lib/i18n'

const PAGE_META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Projets — Sites web & applications sur mesure',
    description:
      'Sites vitrines, applications web et mobiles conçus sur mesure : découvrez les projets récents de Minhaj Zubair, développeur web freelance à Paris.',
  },
  en: {
    title: 'Work — Custom websites & applications',
    description:
      'Custom websites, web and mobile applications: explore recent projects by Minhaj Zubair, freelance web developer based in Paris.',
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
  return getPageMetadata(locale, '/work', meta.title, meta.description)
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  return <WorkList />
}
