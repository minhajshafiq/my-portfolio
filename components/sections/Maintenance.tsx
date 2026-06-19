'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCheck, FaArrowRight, FaEnvelope } from 'react-icons/fa'
import { UserCheck, CalendarClock, ShieldCheck } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

// Liens de souscription — pour l'instant routés vers le formulaire interne,
// [À REMPLACER] par les vrais Payment Links Stripe une fois créés dans le dashboard
const SOUSCRIRE_MAINTENANCE = '/maintenance/souscrire?plan=maintenance'
const SOUSCRIRE_CROISSANCE = '/maintenance/souscrire?plan=croissance'
const SOUSCRIRE_PACK = '/maintenance/souscrire?plan=pack'

const ACCENT = '#C41E1E'
const NAVY = '#1A2332'

export function Maintenance() {
  const { t, language } = useTranslation()

  const maintenanceIncluded = t('maintenance.plans.maintenance.included', { returnObjects: true }) as string[]
  const growthIncluded = t('maintenance.plans.growth.included', { returnObjects: true }) as string[]
  const packIncluded = t('maintenance.plans.pack.included', { returnObjects: true }) as string[]

  const REASSURANCE_POINTS = [
    {
      icon: UserCheck,
      title: t('maintenance.reassurance.direct_contact.title') as string,
      description: t('maintenance.reassurance.direct_contact.description') as string,
    },
    {
      icon: CalendarClock,
      title: t('maintenance.reassurance.cancel_anytime.title') as string,
      description: t('maintenance.reassurance.cancel_anytime.description') as string,
    },
    {
      icon: ShieldCheck,
      title: t('maintenance.reassurance.no_fake_guarantee.title') as string,
      description: t('maintenance.reassurance.no_fake_guarantee.description') as string,
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#F4F3EF] dark:bg-[#121212]">
        <div className="absolute top-20 right-[15%] w-[400px] h-[400px] bg-gradient-to-br from-[#C41E1E]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-[#C41E1E] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
              {'// '}{t('maintenance.badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-[#1A2332] dark:text-white leading-[1.05] mb-6">
              {t('maintenance.title')}
            </h1>
            <p className="text-lg md:text-xl text-[#1A2332]/70 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              {t('maintenance.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparatif — 3 offres */}
      <section className="py-12 md:py-20 bg-[#F4F3EF] dark:bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 items-start">
            {/* Card 1 — Maintenance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <span className="text-[#C41E1E] dark:text-[#FFD6D6] font-mono text-xs tracking-widest uppercase mb-3 block">
                {t('maintenance.plans.maintenance.label')}
              </span>

              <div className="flex flex-col h-full rounded-3xl p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-bold text-[#1A2332] dark:text-white mb-2">
                  {t('maintenance.plans.maintenance.name')}
                </h3>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#C41E1E] dark:text-[#FFD6D6]">
                    {t('maintenance.plans.maintenance.price')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {t('maintenance.per_month')}
                  </span>
                </div>

                <p className="text-sm italic mb-8 mt-2 text-gray-500 dark:text-gray-400">
                  {t('maintenance.plans.maintenance.positioning')}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {maintenanceIncluded.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <FaCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={SOUSCRIRE_MAINTENANCE}
                  className="group flex items-center justify-center gap-2 w-full border-2 border-[#C41E1E] dark:border-[#FFD6D6] text-[#C41E1E] dark:text-[#FFD6D6] hover:bg-[#C41E1E] hover:text-white dark:hover:bg-[#FFD6D6] dark:hover:text-gray-900 font-semibold py-3.5 rounded-full transition-colors"
                >
                  {t('maintenance.plans.maintenance.cta')}
                  <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2 — Croissance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col h-full"
            >
              <span className="text-[#C41E1E] dark:text-[#FFD6D6] font-mono text-xs tracking-widest uppercase mb-3 block">
                {t('maintenance.plans.growth.label')}
              </span>

              <div className="flex flex-col h-full rounded-3xl p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <span className="inline-block w-fit bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full mb-4">
                  {t('maintenance.plans.growth.requires_badge')}
                </span>

                <h3 className="text-2xl font-bold text-[#1A2332] dark:text-white mb-2">
                  {t('maintenance.plans.growth.name')}
                </h3>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#C41E1E] dark:text-[#FFD6D6]">
                    {t('maintenance.plans.growth.price')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {t('maintenance.per_month')}
                  </span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {t('maintenance.plans.growth.setup_note')}
                </p>

                <p className="text-sm italic mb-8 mt-3 text-gray-500 dark:text-gray-400">
                  {t('maintenance.plans.growth.positioning')}
                </p>

                <ul className="space-y-3 mb-4 flex-1">
                  {growthIncluded.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <FaCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
                  {t('maintenance.plans.growth.meta_note')}
                </p>

                <Link
                  href={SOUSCRIRE_CROISSANCE}
                  className="group flex items-center justify-center gap-2 w-full border-2 border-[#C41E1E] dark:border-[#FFD6D6] text-[#C41E1E] dark:text-[#FFD6D6] hover:bg-[#C41E1E] hover:text-white dark:hover:bg-[#FFD6D6] dark:hover:text-gray-900 font-semibold py-3.5 rounded-full transition-colors"
                >
                  {t('maintenance.plans.growth.cta')}
                  <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Card 3 — Pack Croissance Complète (mis en avant) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col h-full md:-translate-y-4"
            >
              <span className="text-[#C41E1E] dark:text-[#FFD6D6] font-mono text-xs tracking-widest uppercase mb-3 block">
                {t('maintenance.plans.pack.label')}
              </span>

              <div
                className="relative flex flex-col h-full rounded-3xl p-8 border-2 shadow-2xl"
                style={{ backgroundColor: NAVY, borderColor: ACCENT }}
              >
                <span className="absolute -top-3.5 left-8 bg-[#C41E1E] text-white text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full">
                  {t('maintenance.plans.pack.badge')}
                </span>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {t('maintenance.plans.pack.name')}
                </h3>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#FF8A8A]">
                    {t('maintenance.plans.pack.price')}
                  </span>
                  <span className="text-gray-400">
                    {t('maintenance.per_month')}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {t('maintenance.plans.pack.setup_note')}
                </p>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 mt-4">
                  <p className="text-sm font-semibold text-[#FF8A8A]">
                    {t('maintenance.plans.pack.savings')}
                  </p>
                </div>

                <p className="text-sm italic mb-8 mt-4 text-gray-300">
                  {t('maintenance.plans.pack.positioning')}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {packIncluded.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-200"
                    >
                      <FaCheck className="text-green-400 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={SOUSCRIRE_PACK}
                  className="group flex items-center justify-center gap-2 w-full bg-[#C41E1E] hover:bg-[#C41E1E]/90 text-white font-semibold py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  {t('maintenance.plans.pack.cta')}
                  <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Réassurance */}
      <section className="py-12 md:py-20 bg-[#F4F3EF] dark:bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[#C41E1E] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
                {'// '}{t('maintenance.why_badge')}
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REASSURANCE_POINTS.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C41E1E] flex items-center justify-center mb-4">
                    <point.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2332] dark:text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer de page */}
      <section className="py-12 md:py-20 bg-[#F4F3EF] dark:bg-[#121212]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold text-[#1A2332] dark:text-white mb-6">
              {t('maintenance.cta_title')}
            </h3>
            <Link
              href={`/${language}#contact`}
              className="group inline-flex items-center gap-2 border-2 border-[#C41E1E] dark:border-[#FFD6D6] text-[#C41E1E] dark:text-[#FFD6D6] hover:bg-[#C41E1E] hover:text-white dark:hover:bg-[#FFD6D6] dark:hover:text-gray-900 px-6 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              <FaEnvelope className="w-4 h-4" />
              {t('maintenance.cta_button')}
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
