import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Contact } from '@/features/contact'
import { PageIntro } from '@/components/ui/PageIntro'
import { getPageMetadata } from '@/app/metadata'
import { locales, isValidLocale, type Locale } from '@/lib/i18n'

const PAGE_META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Contact | Demandez un premier avis sur votre site',
    description:
      'Création, refonte ou visibilité locale : décrivez votre situation à Minhaj Zubair par formulaire, appel de 30 minutes ou email. Réponse sous 24 h ouvrées.',
  },
  en: {
    title: 'Contact | Ask for an initial website review',
    description:
      'Website creation, redesign or local visibility: tell Minhaj Zubair what is happening by form, 30-minute call or email. Reply within one business day.',
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
      <Contact showHeader={false} />
    </>
  )
}
