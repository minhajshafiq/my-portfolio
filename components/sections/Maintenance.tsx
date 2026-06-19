'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCheck, FaTimes, FaArrowRight, FaEnvelope } from 'react-icons/fa'
import { UserCheck, CalendarClock, PiggyBank } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

// Liens de souscription — pour l'instant routés vers le formulaire interne,
// [À REMPLACER] par les vrais Payment Links Stripe une fois créés dans le dashboard
const STRIPE_ESSENTIEL = '/maintenance/souscrire?plan=essentiel'
const STRIPE_SERENITE = '/maintenance/souscrire?plan=serenite'

export function Maintenance() {
  const { t, language } = useTranslation()

  const PLANS = [
    {
      id: 'essentiel',
      name: t('maintenance.plans.essentiel.name') as string,
      price: '50',
      badge: null as string | null,
      positioning: t('maintenance.plans.essentiel.positioning') as string,
      includesPrevious: null as string | null,
      included: t('maintenance.plans.essentiel.included', { returnObjects: true }) as string[],
      excluded: t('maintenance.plans.essentiel.excluded', { returnObjects: true }) as string[],
      href: STRIPE_ESSENTIEL,
      dark: false,
    },
    {
      id: 'serenite',
      name: t('maintenance.plans.serenite.name') as string,
      price: '80',
      badge: t('maintenance.plans.serenite.badge') as string,
      positioning: t('maintenance.plans.serenite.positioning') as string,
      includesPrevious: t('maintenance.plans.serenite.includesPrevious') as string,
      included: t('maintenance.plans.serenite.included', { returnObjects: true }) as string[],
      excluded: [] as string[],
      href: STRIPE_SERENITE,
      dark: true,
    },
  ]

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
      icon: PiggyBank,
      title: t('maintenance.reassurance.cheaper_than_agency.title') as string,
      description: t('maintenance.reassurance.cheaper_than_agency.description') as string,
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-custom-primary">
        <div className="absolute top-20 right-[15%] w-[400px] h-[400px] bg-gradient-to-br from-[#8C0605]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-[#8C0605] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
              {'// '}{t('maintenance.badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-custom-title leading-[1.05] mb-6">
              {t('maintenance.title')}
            </h1>
            <p className="text-lg md:text-xl text-custom-secondary max-w-xl mx-auto leading-relaxed">
              {t('maintenance.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offres */}
      <section className="py-12 md:py-20 bg-custom-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[#8C0605] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
                {'// '}{t('maintenance.offers_badge')}
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PLANS.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-[#8C0605] dark:bg-[#FFD6D6] text-white dark:text-gray-900 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                      {plan.badge}
                    </div>
                  )}

                  <div
                    className={`h-full rounded-3xl p-8 border flex flex-col ${
                      plan.dark
                        ? 'bg-gray-900 dark:bg-black border-gray-800'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        plan.dark ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {plan.name}
                    </h3>

                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-[#8C0605] dark:text-[#FFD6D6]">
                        {plan.price}€
                      </span>
                      <span className={plan.dark ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}>
                        {t('maintenance.per_month')}
                      </span>
                    </div>

                    <p
                      className={`text-sm italic mb-8 mt-2 ${
                        plan.dark ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {plan.positioning}
                    </p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.includesPrevious && (
                        <li
                          className={`flex items-start gap-3 text-sm font-semibold pb-3 mb-1 border-b ${
                            plan.dark
                              ? 'text-white border-gray-800'
                              : 'text-gray-900 dark:text-white border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <FaCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                          {plan.includesPrevious}
                        </li>
                      )}
                      {plan.included.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-3 text-sm ${
                            plan.dark ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          <FaCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {plan.excluded.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-3 text-sm ${
                            plan.dark ? 'text-gray-500' : 'text-gray-400 dark:text-gray-500'
                          }`}
                        >
                          <FaTimes className="text-gray-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={plan.href}
                      className="group flex items-center justify-center gap-2 w-full bg-[#8C0605] hover:bg-[#8C0605]/90 text-white font-semibold py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl"
                    >
                      {t('maintenance.choose', { name: plan.name })}
                      <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Réassurance */}
      <section className="py-12 md:py-20 bg-custom-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[#8C0605] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
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
                  <div className="w-12 h-12 rounded-xl bg-[#8C0605] dark:bg-[#FFD6D6] flex items-center justify-center mb-4">
                    <point.icon className="w-6 h-6 text-white dark:text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
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
      <section className="py-12 md:py-20 bg-custom-primary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold text-custom-title mb-6">
              {t('maintenance.cta_title')}
            </h3>
            <Link
              href={`/${language}#contact`}
              className="group inline-flex items-center gap-2 border-2 border-[#8C0605] dark:border-[#FFD6D6] text-[#8C0605] dark:text-[#FFD6D6] hover:bg-[#8C0605] hover:text-white dark:hover:bg-[#FFD6D6] dark:hover:text-gray-900 px-6 py-3 rounded-full font-semibold text-sm transition-colors"
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
