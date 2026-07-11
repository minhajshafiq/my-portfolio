'use client'

import { Link } from '@/components/ui/AppLink'
import { motion } from 'framer-motion'
import { FaArrowRight, FaEnvelope } from 'react-icons/fa'
import { CalendarClock, ShieldCheck, UserCheck } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { PageIntro } from '@/components/ui/PageIntro'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'
import { trackEvent } from '@/utils/analytics'
import { PLAN_PAYMENT_LINKS, type PlanKey } from '@/data/maintenance'

// La route /maintenance/souscrire n'existe pas encore : les CTA renvoient vers le contact de la home
const CONTACT_ANCHOR = '#contact'

type Plan = {
  key: PlanKey
  href: string
  featured?: boolean
  hasSetupNote?: boolean
  hasNote?: boolean
  delay: number
  included: string[]
}

export function Maintenance() {
  const { t, language } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const trList = (key: string): string[] => {
    const value = t(key, { returnObjects: true })
    return Array.isArray(value) ? value.map(String) : []
  }

  const planHref = (key: PlanKey) => `/${language}?plan=${key}${CONTACT_ANCHOR}`

  const plans: Plan[] = [
    {
      key: 'essential',
      href: planHref('essential'),
      delay: 0,
      included: trList('maintenance.plans.essential.included'),
    },
    {
      key: 'visibility',
      href: planHref('visibility'),
      featured: true,
      hasNote: true,
      delay: 0.08,
      included: trList('maintenance.plans.visibility.included'),
    },
    {
      key: 'growth',
      href: planHref('growth'),
      hasSetupNote: true,
      hasNote: true,
      delay: 0.16,
      included: trList('maintenance.plans.growth.included'),
    },
  ]

  const reassurancePoints = [
    {
      icon: UserCheck,
      title: tr('maintenance.reassurance.direct_contact.title'),
      description: tr('maintenance.reassurance.direct_contact.description'),
    },
    {
      icon: CalendarClock,
      title: tr('maintenance.reassurance.cancel_anytime.title'),
      description: tr('maintenance.reassurance.cancel_anytime.description'),
    },
    {
      icon: ShieldCheck,
      title: tr('maintenance.reassurance.no_fake_guarantee.title'),
      description: tr('maintenance.reassurance.no_fake_guarantee.description'),
    },
  ]

  return (
    <div className="relative overflow-hidden bg-custom-primary">
      {/* En-tête : même composant que /services, /about et /contact */}
      <PageIntro
        labelKey="maintenance.badge"
        headingKey="maintenance.title"
        introKey="maintenance.subtitle"
      />

      {/* Plans */}
      <section className="relative z-10 pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
          <div className="mx-auto grid w-full max-w-[min(1180px,calc(100vw-2.5rem))] grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
              const base = `maintenance.plans.${plan.key}`
              const paymentUrl = PLAN_PAYMENT_LINKS[plan.key]

              return (
                <motion.div
                  key={plan.key}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    delay: plan.delay,
                    duration: 0.62,
                    ease: EASE_SMOOTH,
                  }}
                  className="h-full"
                >
                  <article
                    className={
                      plan.featured
                        ? 'relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] bg-[#141210] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-7'
                        : 'relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white/76 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] md:p-7'
                    }
                  >
                    {/* Lueur discrète, même langage que les panneaux sombres du site */}
                    {plan.featured && (
                      <>
                        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#8C0605]/25 blur-3xl" />

                        <span className="absolute right-6 top-6 rounded-full bg-[#8C0605] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                          {tr(`${base}.badge`)}
                        </span>
                      </>
                    )}

                    <div className="relative z-10 flex h-full flex-col">
                      <span
                        className={
                          plan.featured
                            ? 'mb-4 block text-xs font-semibold uppercase tracking-[0.22em] text-red-400'
                            : 'mb-4 block text-xs font-semibold uppercase tracking-[0.22em] text-[#8C0605] dark:text-red-400'
                        }
                      >
                        {tr(`${base}.label`)}
                      </span>

                      <h3
                        className={
                          plan.featured
                            ? 'max-w-[15ch] font-serif text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-[#FAF7F2] md:text-3xl'
                            : 'max-w-[15ch] font-serif text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-custom-title md:text-3xl'
                        }
                      >
                        {tr(`${base}.name`)}
                      </h3>

                      <div className="mt-5 flex items-end gap-2">
                        <span
                          className={
                            plan.featured
                              ? 'font-serif text-5xl font-medium leading-none tracking-[-0.03em] text-red-400 md:text-6xl'
                              : 'font-serif text-5xl font-medium leading-none tracking-[-0.03em] text-[#8C0605] dark:text-red-400 md:text-6xl'
                          }
                        >
                          {tr(`${base}.price`)}
                        </span>

                        <span
                          className={
                            plan.featured
                              ? 'pb-1.5 text-xs font-medium text-[#FAF7F2]/50 md:text-sm'
                              : 'pb-1.5 text-xs font-medium text-custom-muted md:text-sm'
                          }
                        >
                          {tr('maintenance.per_month')}
                        </span>
                      </div>

                      {plan.hasSetupNote && (
                        <p
                          className={
                            plan.featured
                              ? 'mt-2 text-xs text-[#FAF7F2]/45'
                              : 'mt-2 text-xs text-custom-muted'
                          }
                        >
                          {tr(`${base}.setup_note`)}
                        </p>
                      )}

                      <p
                        className={
                          plan.featured
                            ? 'mt-5 font-serif text-sm italic leading-6 text-[#FAF7F2]/62'
                            : 'mt-5 font-serif text-sm italic leading-6 text-custom-secondary'
                        }
                      >
                        {tr(`${base}.positioning`)}
                      </p>

                      <ul className="mt-6 flex-1 space-y-3">
                        {plan.included.map((feature) => (
                          <li
                            key={feature}
                            className={
                              plan.featured
                                ? 'flex items-start gap-3 border-b border-white/10 pb-3 text-sm leading-6 text-[#FAF7F2]/78 last:border-b-0'
                                : 'flex items-start gap-3 border-b border-custom pb-3 text-sm leading-6 text-custom-secondary last:border-b-0'
                            }
                          >
                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#8C0605] dark:bg-red-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.hasNote && (
                        <p
                          className={
                            plan.featured
                              ? 'mt-5 text-xs leading-relaxed text-[#FAF7F2]/45'
                              : 'mt-5 text-xs leading-relaxed text-custom-muted'
                          }
                        >
                          {tr(`${base}.note`)}
                        </p>
                      )}

                      {paymentUrl ? (
                        <>
                          <a
                            href={paymentUrl}
                            onClick={() =>
                              trackEvent('cta_click', {
                                cta: 'maintenance_subscribe',
                                plan: plan.key,
                                section: 'maintenance',
                              })
                            }
                            className={
                              plan.featured
                                ? 'group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8C0605] px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a70b0a]'
                                : 'group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-custom px-5 py-3.5 text-sm font-bold text-custom-title transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8C0605] hover:text-[#8C0605] dark:hover:border-red-400 dark:hover:text-red-400'
                            }
                          >
                            {tr('maintenance.subscribe_cta')}
                            <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>

                          <Link
                            href={plan.href}
                            onClick={() =>
                              trackEvent('cta_click', {
                                cta: 'maintenance_discuss',
                                plan: plan.key,
                                section: 'maintenance',
                              })
                            }
                            className={
                              plan.featured
                                ? 'mt-3 text-center text-xs text-[#FAF7F2]/80 underline underline-offset-4 transition-colors duration-300 hover:text-[#FAF7F2]'
                                : 'mt-3 text-center text-xs text-custom-muted underline underline-offset-4 transition-colors duration-300 hover:text-[#8C0605] dark:hover:text-red-400'
                            }
                          >
                            {tr('maintenance.discuss_cta')}
                          </Link>
                        </>
                      ) : (
                        <Link
                          href={plan.href}
                          onClick={() =>
                            trackEvent('cta_click', {
                              cta: 'maintenance_plan',
                              plan: plan.key,
                              section: 'maintenance',
                            })
                          }
                          className={
                            plan.featured
                              ? 'group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8C0605] px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a70b0a]'
                              : 'group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-custom px-5 py-3.5 text-sm font-bold text-custom-title transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8C0605] hover:text-[#8C0605] dark:hover:border-red-400 dark:hover:text-red-400'
                          }
                        >
                          {tr(`${base}.cta`)}
                          <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </article>
                </motion.div>
              )
            })}
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.62, ease: EASE_SMOOTH }}
            className="mx-auto mt-8 max-w-[72ch] text-center text-xs leading-relaxed text-custom-muted"
          >
            {tr('maintenance.plans_footnote')}
          </motion.p>
        </div>
      </section>

      {/* Réassurance */}
      <section className="relative z-10 pb-14 md:pb-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
          <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.62, ease: EASE_SMOOTH }}
              className="mb-12"
            >
              <SectionLabel>{tr('maintenance.why_badge')}</SectionLabel>

              <h2 className="max-w-[24ch] font-serif text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-custom-title">
                {tr('maintenance.why_title')}
              </h2>
            </motion.div>

            {/* Même grille éditoriale que le process de la page Services */}
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
              {reassurancePoints.map((point, index) => {
                const PointIcon = point.icon

                return (
                  <motion.div
                    key={point.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.62,
                      ease: EASE_SMOOTH,
                    }}
                    className="border-t border-custom pt-6"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-custom text-[#8C0605] dark:text-red-400">
                      <PointIcon className="h-5 w-5" />
                    </div>

                    <h3 className="mb-3 font-serif text-xl font-medium tracking-[-0.01em] text-custom-title">
                      {point.title}
                    </h3>

                    <p className="text-sm leading-6 text-custom-secondary">
                      {point.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — panneau sombre, même langage que le CTA du footer */}
      <section className="relative z-10 pb-[clamp(4rem,5.5vw,6.5rem)]">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
          <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.62, ease: EASE_SMOOTH }}
              className="relative overflow-hidden rounded-[2rem] bg-[#141210] p-8 text-center md:p-12"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#8C0605]/25 blur-3xl" />

              <div className="relative mx-auto max-w-2xl">
                <h3 className="font-serif text-3xl font-medium leading-[1.05] tracking-[-0.02em] text-[#FAF7F2] md:text-4xl">
                  {tr('maintenance.cta_title')}
                </h3>

                <Link
                  href={`/${language}#contact`}
                  onClick={() =>
                    trackEvent('cta_click', { cta: 'maintenance_contact', section: 'maintenance' })
                  }
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#8C0605] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a70b0a]"
                >
                  <FaEnvelope className="h-4 w-4" />
                  {tr('maintenance.cta_button')}
                  <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
