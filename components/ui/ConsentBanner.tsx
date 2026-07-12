'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import {
  GA_ID,
  denyAnalyticsConsent,
  getStoredConsent,
  grantAnalyticsConsent,
} from '@/lib/analytics'

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)

  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  useEffect(() => {
    if (!GA_ID) return

    if (getStoredConsent() === null) {
      const timeout = window.setTimeout(() => setIsVisible(true), 2500)

      return () => {
        window.clearTimeout(timeout)
      }
    }
  }, [])

  const handleAccept = () => {
    grantAnalyticsConsent()
    setIsVisible(false)
  }

  const handleDeny = () => {
    denyAnalyticsConsent()
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          role="dialog"
          aria-label={tr('consent.title')}
          className="fixed bottom-4 left-4 right-4 z-[110] mx-auto max-w-md rounded-2xl border border-custom bg-custom-surface-solid p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:left-auto sm:right-6 sm:bottom-6"
        >
          <p className="mb-1.5 font-serif text-base font-medium text-custom-title">
            {tr('consent.title')}
          </p>

          <p className="mb-4 text-xs leading-5 text-custom-secondary">
            {tr('consent.description')}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAccept}
              className="cursor-pointer rounded-full bg-[#8C0605] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300"
            >
              {tr('consent.accept')}
            </button>

            <button
              type="button"
              onClick={handleDeny}
              className="cursor-pointer rounded-full border border-custom px-5 py-2.5 text-xs font-bold text-custom-secondary transition-colors hover:text-custom-title"
            >
              {tr('consent.deny')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
