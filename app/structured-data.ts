import { siteConfig } from './metadata'
import type { Locale } from '@/lib/i18n'

const localizedJobTitle: Record<Locale, string> = {
  fr: 'Développeur web freelance',
  en: 'Freelance Web Developer',
}

const localizedDescription: Record<Locale, string> = {
  fr: 'Développeur web freelance en région parisienne. Création et refonte de sites vitrines, visibilité locale et maintenance pour les petites entreprises.',
  en: 'Freelance web developer in the Paris region. Showcase website creation and redesign, local visibility and maintenance for small businesses.',
}

const localizedSiteName: Record<Locale, string> = {
  fr: 'Minhaj Zubair, développeur web freelance',
  en: 'Minhaj Zubair, web developer',
}

const localizedBreadcrumbHome: Record<Locale, string> = {
  fr: 'Accueil',
  en: 'Home',
}

const localizedServiceName: Record<Locale, string> = {
  fr: 'Création de sites vitrines et visibilité locale',
  en: 'Showcase websites and local visibility',
}

const localizedServiceDescription: Record<Locale, string> = {
  fr: 'Création et refonte de sites professionnels, optimisation mobile, visibilité locale et maintenance pour artisans, commerçants et petites entreprises.',
  en: 'Professional website creation and redesign, mobile optimization, local visibility and maintenance for tradespeople, shops and small businesses.',
}

const localizedServiceTypes: Record<Locale, string[]> = {
  fr: ['Création de site vitrine', 'Refonte de site web', 'Référencement local', 'Maintenance de site web'],
  en: ['Showcase Website Creation', 'Website Redesign', 'Local SEO', 'Website Maintenance'],
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
