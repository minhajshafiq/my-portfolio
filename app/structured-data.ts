import { siteConfig } from './metadata'
import type { Locale } from '@/lib/i18n'

const localizedJobTitle: Record<Locale, string> = {
  fr: 'Développeur web freelance',
  en: 'Freelance Web Developer',
}

const localizedDescription: Record<Locale, string> = {
  fr: 'Développeur web freelance basé à Paris. Je conçois des sites web et applications sur mesure — modernes, rapides et pensés pour convertir.',
  en: 'Freelance web developer based in Paris. I design and build custom websites and web apps — modern, fast and made to convert.',
}

const localizedSiteName: Record<Locale, string> = {
  fr: 'Minhaj Zubair — Développeur web freelance',
  en: 'Minhaj Zubair — Web Developer',
}

const localizedBreadcrumbHome: Record<Locale, string> = {
  fr: 'Accueil',
  en: 'Home',
}

const localizedServiceName: Record<Locale, string> = {
  fr: 'Développement Web & Mobile Full-Stack',
  en: 'Full-Stack Web & Mobile Development',
}

const localizedServiceDescription: Record<Locale, string> = {
  fr: 'Services de développement d\'applications web et mobiles sur mesure avec Next.js, Spring Boot et React Native.',
  en: 'Custom web and mobile application development services using Next.js, Spring Boot and React Native.',
}

const localizedServiceTypes: Record<Locale, string[]> = {
  fr: ['Développement Web', 'Développement Mobile', 'Développement Full-Stack'],
  en: ['Web Development', 'Mobile Development', 'Full-Stack Development'],
}

export function getStructuredData(locale: Locale) {
  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Minhaj Zubair',
    alternateName: 'Minhaj Shafiq',
    url: `${siteConfig.url}/${locale}`,
    image: `${siteConfig.url}/minhaj.jpg`,
    email: siteConfig.email,
    jobTitle: localizedJobTitle[locale],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.github,
      'https://www.malt.fr/profile/minhajshafiq',
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Spring Boot',
      'React Native',
      'PostgreSQL',
      'Full-Stack Development',
      'Web Development',
      'Mobile Development',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
      addressLocality: 'Paris',
    },
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: localizedSiteName[locale],
    url: `${siteConfig.url}/${locale}`,
    description: localizedDescription[locale],
    author: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    inLanguage: locale === 'fr' ? ['fr-FR', 'en-US'] : ['en-US', 'fr-FR'],
  }

  const profilePageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2025-01-01T00:00:00+00:00',
    dateModified: new Date().toISOString(),
    mainEntity: personStructuredData,
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: localizedBreadcrumbHome[locale],
        item: `${siteConfig.url}/${locale}`,
      },
    ],
  }

  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: localizedServiceName[locale],
    description: localizedServiceDescription[locale],
    provider: {
      '@type': 'Person',
      name: siteConfig.author,
      url: `${siteConfig.url}/${locale}`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    serviceType: localizedServiceTypes[locale],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
      },
    },
  }

  return {
    personStructuredData,
    websiteStructuredData,
    profilePageStructuredData,
    breadcrumbStructuredData,
    serviceStructuredData,
  }
}
