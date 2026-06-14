import { Metadata } from 'next'

export const siteConfig = {
  name: 'Minhaj Zubair - Développeur Full-Stack',
  description: 'Développeur Full-Stack passionné par Next.js, Spring Boot et React Native. Spécialisé dans le développement d\'applications web et mobiles modernes. Disponible pour CDI et Freelance.',
  shortDescription: 'Développeur Full-Stack | Next.js, Spring Boot, React Native',
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

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortDescription}`,
  },
  description: siteConfig.description,
  keywords: [
    // Technologies
    'développeur full-stack',
    'développeur',
    'next.js',
    'spring boot',
    'react native',
    'typescript',
    'javascript',
    'react',
    'java',
    'expo',

    // Compétences
    'développement web',
    'développement mobile',
    'api rest',
    'base de données',
    'postgresql',
    'supabase',
    'tailwind css',
    'gsap',
    'framer motion',

    // Services
    'freelance',
    'développeur freelance',
    'création site web',
    'application mobile',
    'api backend',
    'consultant développeur',

    // Localisation
    'développeur france',
    'développeur paris',
    'développeur remote',
    'télétravail',

    // Portfolio
    'portfolio développeur',
    'projets développeur',
    'cv développeur',
    'recrutement développeur',
    'emploi développeur',
    'alternance développeur',

    // Spécialisations
    'développement frontend',
    'développement backend',
    'clean architecture',
    'agile',
    'scrum',
    'git',
    'docker',
    'vercel',

    // Industries
    'e-commerce',
    'fintech',
    'application gestion',
    'site vitrine',
    'responsive design',
    'performance web',
    'seo',
  ],
  authors: [{
    name: siteConfig.author,
    url: siteConfig.url
  }],
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
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Portfolio Développeur Full-Stack`,
        type: 'image/png',
      },
    ],
    countryName: 'France',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
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
    'application-name': siteConfig.name,
    'apple-mobile-web-app-title': siteConfig.shortDescription,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#8C0605',
    'color-scheme': 'light dark',
    'geo.region': 'FR',
    'geo.placename': 'Paris',
  },
}
