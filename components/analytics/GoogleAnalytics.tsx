'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  GA_ID,
  getStoredConsent,
} from '@/utils/analytics'

/**
 * Charge gtag.js avec Consent Mode v2 : analytics refusé par défaut (CNIL),
 * consentement restauré depuis localStorage si déjà donné.
 * Ne rend rien tant que NEXT_PUBLIC_GA_ID n'est pas défini.
 */
export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const updateConsent = () => setHasConsent(getStoredConsent() === 'granted')

    updateConsent()
    window.addEventListener(CONSENT_EVENT, updateConsent)

    return () => window.removeEventListener(CONSENT_EVENT, updateConsent)
  }, [])

  if (!GA_ID || !hasConsent) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;

          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });

          try {
            if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}

          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
