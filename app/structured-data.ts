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
  dateCreated: '2024-01-01T00:00:00+00:00',
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

export const offerStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  name: 'Services de Développement Full-Stack',
  description: 'Développement d\'applications web et mobiles sur mesure',
  seller: {
    '@type': 'Person',
    name: siteConfig.author,
  },
  availability: 'https://schema.org/InStock',
  itemOffered: {
    '@type': 'Service',
    name: 'Développement Full-Stack',
    provider: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
  },
}
