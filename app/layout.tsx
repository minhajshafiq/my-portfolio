import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Loader } from '@/components/sections/Loader'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { metadata as siteMetadata } from './metadata'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import {
  personStructuredData,
  websiteStructuredData,
  profilePageStructuredData,
  breadcrumbStructuredData,
  serviceStructuredData,
} from './structured-data'

export const metadata: Metadata = siteMetadata

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.jpg" />

        {/* Theme color pour les navigateurs mobiles */}
        <meta name="theme-color" content="#8C0605" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)" />

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceStructuredData),
          }}
        />
      </head>
      <body className="antialiased grain-texture">
        <CustomCursor />
        <Loader>
          <Header />
          <main className="bg-custom-primary">
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
