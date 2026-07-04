'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

type PageIntroProps = {
  labelKey: string
  headingKey: string
  introKey?: string
}

/** En-tête éditorial des sous-pages (h1 + label + intro) */
export function PageIntro({ labelKey, headingKey, introKey }: PageIntroProps) {
  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  return (
    <div className="relative bg-custom-primary pt-[clamp(9rem,16vw,13rem)]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]"
        >
          <p className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#8C0605] dark:text-red-400">
            <span className="h-px w-10 bg-current" />
            {tr(labelKey)}
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
            <h1 className="font-serif text-[clamp(2.6rem,7vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title md:col-span-8">
              {tr(headingKey)}
            </h1>

            {introKey && (
              <p className="max-w-sm text-sm leading-6 text-custom-secondary md:col-span-4 md:justify-self-end md:text-[15px] md:leading-7">
                {tr(introKey)}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
