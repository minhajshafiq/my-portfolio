import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Fraunces, Inter } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'
import '../globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Loader } from '@/components/layout/Loader'
import { DeferredCursor } from '@/components/ui/DeferredCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ConsentBanner } from '@/components/ui/ConsentBanner'
import { MotionProvider } from '@/components/ui/MotionProvider'
import { ScrollReset } from '@/components/ui/ScrollReset'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { ScrollDepth } from '@/components/analytics/ScrollDepth'
import { getMetadata } from '../metadata'
import { getStructuredData } from '../structured-data'
import { locales, isValidLocale } from '@/lib/i18n'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return getMetadata(locale)
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const {
    personStructuredData,
    websiteStructuredData,
    profilePageStructuredData,
    breadcrumbStructuredData,
    serviceStructuredData,
  } = getStructuredData(locale)

  return (
    <ViewTransitions>
    <html lang={locale} className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
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
      <body className="bg-custom-primary antialiased">
        <a href="#main-content" className="skip-link">
          {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>
        <MotionProvider>
          <SmoothScroll />
          <ScrollReset />
          <ScrollProgress />
          <DeferredCursor />
          <Loader>
            <Header />
            <main id="main-content" tabIndex={-1} className="bg-custom-primary">
              {children}
            </main>
            <Footer />
          </Loader>
          <ConsentBanner />
        </MotionProvider>
        <GoogleAnalytics />
        <ScrollDepth />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
    </ViewTransitions>
  )
}
