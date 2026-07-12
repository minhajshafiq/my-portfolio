'use client'

import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from '@/components/ui/AppLink'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useTranslation } from '@/hooks/useTranslation'
import { useContactPrefill } from '@/hooks/useContactPrefill'
import { trackEvent } from '@/lib/analytics'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'

type PlanKey = 'essential' | 'visibility' | 'growth'

type OfferRow = {
  key: PlanKey
  featured?: boolean
  hasSetupNote?: boolean
}

const OFFERS: OfferRow[] = [
  { key: 'essential' },
  { key: 'visibility', featured: true },
  { key: 'growth', hasSetupNote: true },
]

export function HomeOffers() {
  const { t, language } = useTranslation()
  const requestPrefill = useContactPrefill((state) => state.requestPrefill)

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  return (
    <section
      id="offers"
      className="relative bg-custom-primary py-[clamp(4.5rem,8vw,8rem)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            className="mb-14 md:mb-20"
          >
            <SectionLabel>{tr('home_offers.label')}</SectionLabel>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
              <h2 className="font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title md:col-span-8">
                {tr('home_offers.heading')}
              </h2>

              <p className="max-w-sm text-sm leading-6 text-custom-secondary md:col-span-4 md:justify-self-end md:text-[15px] md:leading-7">
                {tr('home_offers.intro')}
              </p>
            </div>
          </motion.div>

          {/* Offers list */}
          <div className="border-t border-custom">
            {OFFERS.map((offer, index) => (
              <motion.div
                key={offer.key}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.06, duration: 0.6, ease: EASE_SMOOTH }}
                className="grid grid-cols-1 gap-4 border-b border-custom py-6 md:grid-cols-[1.2fr_1.6fr_auto] md:items-center"
              >
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl font-medium tracking-[-0.01em] text-custom-title md:text-2xl">
                    {tr(`maintenance.plans.${offer.key}.name`)}
                  </h3>

                  {offer.featured && (
                    <span className="rounded-full bg-[#8C0605] px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-white">
                      {tr('maintenance.plans.visibility.badge')}
                    </span>
                  )}
                </div>

                <p className="text-sm leading-6 text-custom-secondary">
                  {tr(`maintenance.plans.${offer.key}.positioning`)}
                </p>

                <div className="flex flex-col gap-3 md:items-end">
                  <div className="flex flex-col md:items-end">
                    <div className="flex items-end gap-1.5">
                      <span className="font-serif text-2xl font-medium leading-none tracking-[-0.02em] text-[#8C0605] dark:text-red-400">
                        {tr(`maintenance.plans.${offer.key}.price`)}
                      </span>

                      <span className="pb-0.5 text-xs font-medium text-custom-muted">
                        {tr('maintenance.per_month')}
                      </span>
                    </div>

                    {offer.hasSetupNote && (
                      <p className="text-xs text-custom-muted">
                        {tr('maintenance.plans.growth.setup_note')}
                      </p>
                    )}
                  </div>

                  <a
                    href="#contact"
                    onClick={() => {
                      requestPrefill(offer.key)
                      trackEvent('cta_click', { cta: 'home_offer', plan: offer.key, section: 'offers' })
                    }}
                    className="group inline-flex items-center gap-2 rounded-full border border-custom px-5 py-2.5 text-sm font-bold text-custom-title transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8C0605] hover:text-[#8C0605] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C0605]/40 dark:hover:border-red-400 dark:hover:text-red-400"
                  >
                    {tr('home_offers.plan_cta')}
                    <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/${language}/maintenance`}
              onClick={() => trackEvent('cta_click', { cta: 'offers_detail', section: 'offers' })}
              className="text-sm font-semibold text-custom-secondary underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-[#8C0605] dark:hover:text-red-400"
            >
              {tr('home_offers.detail_link')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
