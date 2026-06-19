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
    name: 'Minhaj Zubair - Développeur Full-Stack',
    description:
      'Développeur Full-Stack passionné par Next.js, Spring Boot et React Native. Spécialisé dans le développement d\'applications web et mobiles modernes. Disponible pour CDI et Freelance.',
    shortDescription: 'Développeur Full-Stack | Next.js, Spring Boot, React Native',
    ogAlt: 'Minhaj Zubair - Portfolio Développeur Full-Stack',
  },
  en: {
    name: 'Minhaj Zubair - Full-Stack Developer',
    description:
      'Full-Stack Developer passionate about Next.js, Spring Boot and React Native. Specialized in building modern web and mobile applications. Available for full-time and freelance work.',
    shortDescription: 'Full-Stack Developer | Next.js, Spring Boot, React Native',
    ogAlt: 'Minhaj Zubair - Full-Stack Developer Portfolio',
  },
}

const keywordsByLocale: Record<Locale, string[]> = {
  fr: [
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
  en: [
    // Technologies
    'full-stack developer',
    'developer',
    'next.js',
    'spring boot',
    'react native',
    'typescript',
    'javascript',
    'react',
    'java',
    'expo',

    // Skills
    'web development',
    'mobile development',
    'rest api',
    'database',
    'postgresql',
    'supabase',
    'tailwind css',
    'gsap',
    'framer motion',

    // Services
    'freelance',
    'freelance developer',
    'website creation',
    'mobile application',
    'backend api',
    'developer consultant',

    // Location
    'developer france',
    'developer paris',
    'remote developer',
    'remote work',

    // Portfolio
    'developer portfolio',
    'developer projects',
    'developer resume',
    'developer hiring',
    'developer jobs',

    // Specializations
    'frontend development',
    'backend development',
    'clean architecture',
    'agile',
    'scrum',
    'git',
    'docker',
    'vercel',

    // Industries
    'e-commerce',
    'fintech',
    'management application',
    'showcase website',
    'responsive design',
    'web performance',
    'seo',
  ],
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
    keywords: keywordsByLocale[locale],
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

export { locales }
