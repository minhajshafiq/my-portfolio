import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Contact } from '@/components/sections/Contact'
import { PageIntro } from '@/components/ui/PageIntro'
import { getPageMetadata } from '@/app/metadata'
import { locales, isValidLocale, type Locale } from '@/utils/i18n'

const PAGE_META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Contact — Discutons de votre projet',
    description:
      'Un projet de site web ou d\'application ? Contactez Minhaj Zubair, développeur web freelance : formulaire, appel de 30 minutes ou email. Réponse sous 24 h.',
  },
  en: {
    title: 'Contact — Let\'s talk about your project',
    description:
      'A website or application project? Contact Minhaj Zubair, freelance web developer: form, 30-minute call or email. Reply within 24 hours.',
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
  return getPageMetadata(locale, '/contact', meta.title, meta.description)
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  return (
    <>
      <PageIntro
        labelKey="contact.title"
        headingKey="pages.contact.heading"
        introKey="pages.contact.intro"
      />
      <Contact />
    </>
  )
}
