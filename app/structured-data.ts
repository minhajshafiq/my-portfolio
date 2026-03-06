import { siteConfig } from './metadata'

export const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Minhaj Zubair',
  alternateName: 'Minhaj Shafiq',
  url: siteConfig.url,
  image: `${siteConfig.url}/profile.jpg`,
  email: siteConfig.email,
  jobTitle: 'Développeur Full-Stack',
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
    'Flutter',
    'PostgreSQL',
    'Full-Stack Development',
    'Web Development',
    'Mobile Development',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
    addressLocality: 'France',
  },
}

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    '@type': 'Person',
    name: siteConfig.author,
  },
  inLanguage: ['fr-FR', 'en-US'],
}

export const profilePageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2025-01-01T00:00:00+00:00',
  dateModified: new Date().toISOString(),
  mainEntity: personStructuredData,
}

export const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: siteConfig.url,
    },
  ],
}

export const serviceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Développement Web & Mobile Full-Stack',
  description: 'Services de développement d\'applications web et mobiles sur mesure avec Next.js, Spring Boot et Flutter.',
  provider: {
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
  },
  areaServed: {
    '@type': 'Country',
    name: 'France',
  },
  serviceType: ['Développement Web', 'Développement Mobile', 'Développement Full-Stack'],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'EUR',
    },
  },
}
