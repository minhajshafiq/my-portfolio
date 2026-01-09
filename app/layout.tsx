import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Loader } from '@/components/sections/Loader'
import { metadata as siteMetadata } from './metadata'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import {
  personStructuredData,
  websiteStructuredData,
  profilePageStructuredData,
  breadcrumbStructuredData,
} from './structured-data'

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Balises meta pour le SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#8C0605" />
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Balises de sécurité */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Balises pour les performances */}
        <meta name="X-UA-Compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Minhaj Zubair - Développeur Full-Stack" />
        
        {/* Balises pour l'accessibilité */}
        <meta name="accessibility-control" content="full-mouse-control" />
        <meta name="accessibility-hazard" content="none" />
        <meta name="accessibility-api" content="ARIA" />
        
        {/* Balises géographiques */}
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="France" />
        <meta name="language" content="French" />
        
        {/* Balises pour les réseaux sociaux */}
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:email" content="minhaj.shafiq@icloud.com" />
        <meta property="og:locality" content="France" />
        <meta property="og:country_name" content="France" />
        
        {/* Balises pour LinkedIn */}
        <meta name="linkedin:owner" content="Minhaj Zubair" />
        <meta name="linkedin:page_id" content="minhajshafiq" />
        
        {/* Balises Dublin Core */}
        <meta name="dcterms.creator" content="Minhaj Zubair" />
        <meta name="dcterms.publisher" content="Minhaj Zubair" />
        <meta name="dcterms.title" content="Minhaj Zubair - Développeur Full-Stack" />
        <meta name="dcterms.description" content="Développeur Full-Stack passionné par Next.js, Spring Boot et Flutter. Spécialisé dans le développement d'applications web et mobiles modernes." />
        <meta name="dcterms.subject" content="Développement Web, Mobile, Full-Stack" />
        <meta name="dcterms.language" content="fr" />
        <meta name="dcterms.coverage" content="France" />
        <meta name="dcterms.rights" content="Copyright © 2024 Minhaj Zubair. Tous droits réservés." />
        <meta name="dcterms.date" content="2024" />
        <meta name="dcterms.type" content="Text" />
        <meta name="dcterms.format" content="text/html" />
        <meta name="dcterms.identifier" content="https://www.minhajshafiq.com" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.toggle(
                "dark",
                localStorage.theme === "dark" ||
                  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
              );
            `,
          }}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />
      </head>
      <body className="antialiased">
        <Loader>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Loader>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
