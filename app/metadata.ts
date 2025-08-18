import { Metadata } from 'next'

export const siteConfig = {
  name: 'Minhaj Zubair - Développeur Full-Stack',
  description: 'Développeur Full-Stack passionné par Next.js, Spring Boot et Flutter. Spécialisé dans le développement d\'applications web et mobiles modernes. Disponible pour CDI et Freelance.',
  shortDescription: 'Développeur Full-Stack | Next.js, Spring Boot, Flutter',
  url: 'https://www.minhajshafiq.com',
  ogImage: 'https://www.minhajshafiq.com/portfoliomtd.png',
  author: 'Minhaj Zubair',
  email: 'minhaj.shafiq@icloud.com',
  location: 'France',
  links: {
    github: 'https://github.com/minhajshafiq',
    linkedin: 'https://www.linkedin.com/in/minhajshafiq/',
    email: 'mailto:minhaj.shafiq@icloud.com',
  },
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortDescription}`,
  },
  description: siteConfig.description,
  keywords: [
    // Technologies principales
    'développeur full-stack',
    'développeur junior',
    'next.js',
    'spring boot',
    'flutter',
    'typescript',
    'javascript',
    'react',
    'java',
    'dart',
    
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
    'stage développeur',
    'alternance développeur',
    
    // Spécialisations
    'développement frontend',
    'développement backend',
    'architecture logicielle',
    'clean architecture',
    'test driven development',
    'agile',
    'scrum',
    'git',
    'docker',
    'deployment',
    'vercel',
    'heroku',
    
    // Industries
    'e-commerce',
    'fintech',
    'application gestion',
    'site vitrine',
    'application web progressive',
    'mobile first',
    'responsive design',
    'accessibilité',
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
    languages: {
      'fr-FR': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
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
        type: 'image/jpeg',
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
      'noimageindex': false,
      'notranslate': false,
    },
  },
  verification: {
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  other: {
    // Métadonnées supplémentaires pour le SEO
    'application-name': siteConfig.name,
    'apple-mobile-web-app-title': siteConfig.shortDescription,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
         'theme-color': '#8C0605',
    'color-scheme': 'light dark',
    
    // Métadonnées pour les réseaux sociaux
    'og:type': 'website',
    'og:locale': 'fr_FR',
    'og:locale:alternate': 'en_US',
    'og:site_name': siteConfig.name,
    'og:email': siteConfig.email,
    'og:phone_number': '',
    'og:fax_number': '',
    'og:street_address': '',
    'og:locality': 'France',
    'og:region': '',
    'og:postal_code': '',
    'og:country_name': 'France',
    
    // Métadonnées pour LinkedIn
    'linkedin:owner': siteConfig.author,
    'linkedin:page_id': 'minhajshafiq',
    
         // Métadonnées pour les moteurs de recherche
     'msvalidate.01': 'your-bing-verification-code',
     'yandex-verification': 'your-yandex-verification-code',
    
    // Métadonnées pour les performances
    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
    'X-UA-Compatible': 'IE=edge',
    
    // Métadonnées pour la sécurité
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Métadonnées pour l'accessibilité
    'accessibility-control': 'full-mouse-control',
    'accessibility-hazard': 'none',
    'accessibility-api': 'ARIA',
    
    // Métadonnées pour les performances
    'resource-type': 'document',
    'distribution': 'global',
    'rating': 'general',
    'revisit-after': '7 days',
    'robots': 'index, follow',
    'language': 'French',
    'geo.region': 'FR',
    'geo.placename': 'France',
    'geo.position': '',
    'ICBM': '',
    
    // Métadonnées pour les réseaux sociaux
    'twitter:app:name:iphone': siteConfig.name,
    'twitter:app:name:ipad': siteConfig.name,
    'twitter:app:name:googleplay': siteConfig.name,
    'twitter:app:url:iphone': siteConfig.url,
    'twitter:app:url:ipad': siteConfig.url,
    'twitter:app:url:googleplay': siteConfig.url,
    
         // Métadonnées pour les applications mobiles
     'apple-itunes-app': 'app-id=',
     'msapplication-TileImage': '/mstile-144x144.png',
     'msapplication-TileColor': '#8C0605',
     'msapplication-config': '/browserconfig.xml',
    
    // Métadonnées pour les performances
    'dcterms.creator': siteConfig.author,
    'dcterms.publisher': siteConfig.author,
    'dcterms.title': siteConfig.name,
    'dcterms.description': siteConfig.description,
    'dcterms.subject': 'Développement Web, Mobile, Full-Stack',
    'dcterms.language': 'fr',
    'dcterms.coverage': 'France',
    'dcterms.rights': 'Copyright © 2024 Minhaj Shafiq. Tous droits réservés.',
    'dcterms.date': '2024',
    'dcterms.type': 'Text',
    'dcterms.format': 'text/html',
    'dcterms.identifier': siteConfig.url,
  },
}
