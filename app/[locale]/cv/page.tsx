import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CvContent } from '@/features/cv'
import { getPageMetadata } from '@/app/metadata'
import { locales, isValidLocale, type Locale } from '@/lib/i18n'

const PAGE_META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'CV — Développeur Full-Stack en recherche d\'alternance',
    description:
      'Profil professionnel de Minhaj Zubair : développeur full-stack (Next.js, Spring Boot, React Native) ouvert aux opportunités d\'alternance. Parcours, compétences, projets et CV téléchargeable.',
  },
  en: {
    title: 'Resume — Full-Stack Developer open to apprenticeship',
    description:
      'Professional profile of Minhaj Zubair: full-stack developer (Next.js, Spring Boot, React Native) open to apprenticeship opportunities. Background, skills, projects and downloadable resume.',
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
  return getPageMetadata(locale, '/cv', meta.title, meta.description)
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  return <CvContent />
}
