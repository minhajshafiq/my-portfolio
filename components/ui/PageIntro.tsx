'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { RevealText } from '@/components/ui/RevealText'
import { EASE_SMOOTH } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

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
    <div
      id="page-intro"
      className="relative bg-custom-primary pt-[clamp(8rem,13vw,11rem)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        {/* Fondu simple : le mouvement vient du reveal mot à mot du h1 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE_SMOOTH }}
          className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]"
        >
          <SectionLabel>{tr(labelKey)}</SectionLabel>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
            {/* Même langage que les titres de la home : reveal mot à mot */}
            <RevealText
              as="h1"
              text={tr(headingKey)}
              className="font-serif text-[clamp(2.5rem,6.2vw,4.8rem)] font-medium leading-[1.03] tracking-[-0.025em] text-custom-title md:col-span-8"
            />

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
