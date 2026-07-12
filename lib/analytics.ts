'use client'

type GtagFunction = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: GtagFunction
    dataLayer?: unknown[]
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const CONSENT_STORAGE_KEY = 'analytics-consent'
export const CONSENT_EVENT = 'analytics-consent-changed'

/**
 * Envoie un événement GA4. No-op si GA n'est pas configuré ou pas encore chargé.
 * La locale courante est ajoutée automatiquement à chaque événement.
 */
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return

  const locale = document.documentElement.lang || 'fr'

  window.gtag('event', name, {
    locale,
    ...params,
  })
}

export function grantAnalyticsConsent() {
  if (typeof window === 'undefined') return

  localStorage.setItem(CONSENT_STORAGE_KEY, 'granted')
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: 'granted' }))

  window.gtag?.('consent', 'update', {
    analytics_storage: 'granted',
  })
}

export function denyAnalyticsConsent() {
  if (typeof window === 'undefined') return

  localStorage.setItem(CONSENT_STORAGE_KEY, 'denied')
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: 'denied' }))

  window.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
  })
}

export function getStoredConsent(): 'granted' | 'denied' | null {
  if (typeof window === 'undefined') return null

  const value = localStorage.getItem(CONSENT_STORAGE_KEY)

  return value === 'granted' || value === 'denied' ? value : null
}
