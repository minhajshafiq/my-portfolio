'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCheck, FaTimes, FaArrowRight, FaEnvelope } from 'react-icons/fa'
import { UserCheck, CalendarClock, PiggyBank } from 'lucide-react'

// Liens de souscription — pour l'instant routés vers le formulaire interne,
// [À REMPLACER] par les vrais Payment Links Stripe une fois créés dans le dashboard
const STRIPE_ESSENTIEL = '/maintenance/souscrire?plan=essentiel'
const STRIPE_SERENITE = '/maintenance/souscrire?plan=serenite'

const PLANS = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: '50',
    badge: null,
    positioning: "Votre site reste en ligne. Vous n'y pensez plus.",
    includesPrevious: null as string | null,
    included: [
      'Hébergement et domaine géré',
      'Surveillance uptime 24h/24',
      'Mises à jour de sécurité',
      'Certificat SSL actif',
      'Sauvegarde mensuelle',
      'Support email (réponse sous 5 jours)',
    ],
    excluded: ['Modifications (facturées 50€/h)', 'Google My Business'],
    href: STRIPE_ESSENTIEL,
    dark: false,
  },
  {
    id: 'serenite',
    name: 'Sérénité',
    price: '80',
    badge: 'Recommandé',
    positioning: 'Votre site travaille pour vous pendant que vous êtes sur le chantier.',
    includesPrevious: 'Tout ce qui est dans Essentiel',
    included: [
      'Sauvegarde hebdomadaire',
      '1h de modifications incluse / mois',
      'Support WhatsApp + appel (prioritaire)',
      'Réponse sous 24-48h',
      'Google My Business géré chaque mois (photos de réalisations, posts mensuels, réponses aux avis)',
    ],
    excluded: [] as string[],
    href: STRIPE_SERENITE,
    dark: true,
  },
] as const

const REASSURANCE_POINTS = [
  {
    icon: UserCheck,
    title: 'Un interlocuteur direct',
    description: 'Mon numéro, pas un ticket de support anonyme.',
  },
  {
    icon: CalendarClock,
    title: 'Résiliable à tout moment',
    description: 'Préavis de 30 jours par écrit. Sans pénalité.',
  },
  {
    icon: PiggyBank,
    title: 'Moins cher qu\'une agence',
    description: 'Une agence facture 150-300€/mois pour le même service.',
  },
]

export function Maintenance() {
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
              {'// '}Maintenance web
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-custom-title leading-[1.05] mb-6">
              Votre site entre de bonnes mains.
            </h1>
            <p className="text-lg md:text-xl text-custom-secondary max-w-xl mx-auto leading-relaxed">
              Hébergement, sécurité et présence Google — sans que vous ayez à y penser.
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
                {'// '}Nos offres
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
                        /mois
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
                      Choisir {plan.name}
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
                {'// '}Pourquoi moi
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
              Une question avant de choisir ?
            </h3>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 border-2 border-[#8C0605] dark:border-[#FFD6D6] text-[#8C0605] dark:text-[#FFD6D6] hover:bg-[#8C0605] hover:text-white dark:hover:bg-[#FFD6D6] dark:hover:text-gray-900 px-6 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              <FaEnvelope className="w-4 h-4" />
              Me contacter
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
