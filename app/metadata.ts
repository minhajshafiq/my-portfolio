import { Metadata } from 'next'
import { locales, type Locale } from '@/utils/i18n'

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
    name: 'Minhaj Zubair — Développeur web freelance · Sites web sur mesure',
    description:
      'Développeur web freelance basé à Paris. Je conçois des sites web et applications sur mesure — modernes, rapides et pensés pour convertir. Pour indépendants, marques et entrepreneurs, en France et à l\'international.',
    shortDescription: 'Développeur web freelance · Sites web sur mesure',
    ogAlt: 'Minhaj Zubair — Développeur web freelance',
  },
  en: {
    name: 'Minhaj Zubair — Web Developer · Custom websites that convert',
    description:
      'Freelance web developer based in Paris. I design and build custom websites and web apps — modern, fast and made to convert. For independents, brands and entrepreneurs, in France and worldwide.',
    shortDescription: 'Web Developer · Custom websites',
    ogAlt: 'Minhaj Zubair — Web Developer',
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
