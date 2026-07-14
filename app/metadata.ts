import { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'

export const siteConfig = {
  url: 'https://www.minhajshafiq.com',
  ogImage: 'https://www.minhajshafiq.com/portfoliomtd.png',
  author: 'Minhaj Zubair',
  email: 'contact@minhajshafiq.com',
  location: 'France',
  links: {
    github: 'https://github.com/minhajshafiq',
    linkedin: 'https://www.linkedin.com/in/minhajshafiq/',
    email: 'mailto:contact@minhajshafiq.com',
  },
}

const localizedContent: Record<
  Locale,
  { name: string; description: string; shortDescription: string; ogAlt: string }
> = {
  fr: {
    name: 'Minhaj Zubair, développeur web freelance à Paris',
    description:
      'Création et refonte de sites vitrines pour artisans, commerçants, indépendants et petites entreprises en région parisienne. Visibilité locale et suivi.',
    shortDescription: 'Sites web pour entreprises locales',
    ogAlt: 'Minhaj Zubair, développeur web freelance',
  },
  en: {
    name: 'Minhaj Zubair, freelance web developer in Paris',
    description:
      'Showcase website creation and redesign for tradespeople, shops, independents and small businesses in the Paris region, with local visibility and support.',
    shortDescription: 'Websites for local businesses',
    ogAlt: 'Minhaj Zubair, web developer',
  },
}

export function getMetadata(locale: Locale): Metadata {
  const content = localizedContent[locale]
  const path = `/${locale}`
  const ogLocale = locale === 'fr' ? 'fr_FR' : 'en_US'
  const alternateOgLocale = locale === 'fr' ? 'en_US' : 'fr_FR'

  return {
    title: {
      default: content.name,
      template: `%s | ${content.shortDescription}`,
    },
    description: content.description,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    category: 'Technology',
    classification: 'Portfolio',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      shortcut: [{ url: '/favicon.ico' }],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/site.webmanifest',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
      languages: {
        fr: '/fr',
        en: '/en',
        'x-default': '/fr',
      },
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      alternateLocale: alternateOgLocale,
      url: `${siteConfig.url}${path}`,
      title: content.name,
      description: content.description,
      siteName: content.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: content.ogAlt,
          type: 'image/png',
        },
      ],
      countryName: 'France',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.name,
      description: content.description,
      images: [siteConfig.ogImage],
      creator: '@minhajshafiq',
      site: '@minhajshafiq',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'Ae_td0e89Y7avXHN7AOk28Yyd8MNXMLsVLOiqNO0L6Q',
    },
    other: {
      'application-name': content.name,
      'apple-mobile-web-app-title': content.shortDescription,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'mobile-web-app-capable': 'yes',
      'theme-color': '#8C0605',
      'color-scheme': 'light dark',
      'geo.region': 'FR',
      'geo.placename': 'Paris',
    },
  }
}

/** Métadonnées localisées pour une sous-page (canonical + hreflang + OG) */
export function getPageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string
): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        fr: `/fr${path}`,
        en: `/en${path}`,
        'x-default': `/fr${path}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url,
      title,
      description,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}

export { locales }
