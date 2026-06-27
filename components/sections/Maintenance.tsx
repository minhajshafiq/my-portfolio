'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCheck, FaEnvelope } from 'react-icons/fa'
import { CalendarClock, ShieldCheck, UserCheck } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

const SOUSCRIRE_MAINTENANCE = '/maintenance/souscrire?plan=maintenance'
const SOUSCRIRE_CROISSANCE = '/maintenance/souscrire?plan=croissance'
const SOUSCRIRE_PACK = '/maintenance/souscrire?plan=pack'

type PlanKey = 'maintenance' | 'growth' | 'pack'

type Plan = {
  key: PlanKey
  href: string
  featured?: boolean
  requiresBadge?: boolean
  delay: number
  included: string[]
}

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[4%] top-16 h-[clamp(15rem,24vw,28rem)] w-[clamp(15rem,24vw,28rem)] rounded-full bg-[#8C0605]/10 blur-3xl dark:bg-red-400/[0.08] lg:right-[10%] xl:right-[14%]" />

      <div className="absolute bottom-16 left-[2%] h-[clamp(14rem,20vw,24rem)] w-[clamp(14rem,20vw,24rem)] rounded-full bg-[#8C0605]/[0.08] blur-3xl dark:bg-red-400/[0.06] lg:left-[8%]" />

      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/18 to-transparent dark:from-black/20" />

      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/14 to-transparent dark:from-black/20" />
    </div>
  )
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

  const plans: Plan[] = [
    {
      key: 'maintenance',
      href: SOUSCRIRE_MAINTENANCE,
      delay: 0,
      included: trList('maintenance.plans.maintenance.included'),
    },
    {
      key: 'growth',
      href: SOUSCRIRE_CROISSANCE,
      requiresBadge: true,
      delay: 0.08,
      included: trList('maintenance.plans.growth.included'),
    },
    {
      key: 'pack',
      href: SOUSCRIRE_PACK,
      featured: true,
      delay: 0.16,
      included: trList('maintenance.plans.pack.included'),
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
    <main className="relative overflow-hidden bg-custom-primary">
      <SectionBackground />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-12 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
          <div className="mx-auto w-full max-w-[min(1120px,calc(100vw-5rem))] xl:max-w-[min(1160px,calc(100vw-7rem))] 2xl:max-w-[1160px]">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, ease: EASE_SMOOTH }}
              className="relative"
            >
              <div className="grid min-h-[clamp(14rem,26vh,22rem)] grid-cols-1 content-end gap-6 pb-10 md:grid-cols-12 md:pb-12">
                <div className="md:col-span-8">
                  <span className="mb-4 block font-mono text-xs uppercase tracking-[0.28em] text-[#8C0605] dark:text-red-400 sm:text-sm">
                    {'// '}
                    {tr('maintenance.badge')}
                  </span>

                  <h1 className="max-w-[min(860px,100%)] text-4xl font-black leading-[0.94] tracking-[-0.065em] text-custom-title sm:text-5xl md:text-[clamp(3.75rem,6vw,5.8rem)] lg:text-[clamp(4.25rem,5.7vw,6.25rem)]">
                    {tr('maintenance.title')}
                  </h1>
                </div>

                <div className="md:col-span-4 md:self-end">
                  <p className="max-w-sm text-sm leading-6 text-custom-secondary md:text-[15px] md:leading-7">
                    {tr('maintenance.subtitle')}
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-[#8C0605]/30 via-gray-300 to-transparent dark:from-red-400/30 dark:via-white/10" />

              <div className="pointer-events-none absolute -bottom-7 right-0 hidden select-none text-[5.75rem] font-black leading-none tracking-[-0.08em] text-gray-950/[0.035] dark:text-white/[0.035] md:block">
                $
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="relative z-10 pb-14 md:pb-20">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
          <div className="mx-auto w-full max-w-[min(1120px,calc(100vw-5rem))] xl:max-w-[min(1160px,calc(100vw-7rem))] 2xl:max-w-[1160px]">
            <div className="mx-auto grid w-full max-w-[min(1080px,100%)] grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
              {plans.map((plan) => {
                const base = `maintenance.plans.${plan.key}`

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
                          ? 'relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] border border-[#8C0605]/40 bg-gray-950 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] dark:border-red-400/40 md:p-6'
                          : 'relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white/76 p-5 shadow-[0_18px_58px_rgba(0,0,0,0.055)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] md:p-6'
                      }
                    >
                      {plan.featured && (
                        <>
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(140,6,5,0.30),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(248,113,113,0.14),transparent_36%)]" />

                          <span className="absolute right-5 top-5 rounded-full bg-[#8C0605] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-[0_14px_35px_rgba(140,6,5,0.35)] dark:bg-red-400 dark:text-gray-950">
                            {tr(`${base}.badge`)}
                          </span>
                        </>
                      )}

                      {!plan.featured && (
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(140,6,5,0.08),transparent_34%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(248,113,113,0.06),transparent_34%)]" />
                      )}

                      <div className="relative z-10 flex h-full flex-col">
                        <span
                          className={
                            plan.featured
                              ? 'mb-4 block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-red-300'
                              : 'mb-4 block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#8C0605] dark:text-red-400'
                          }
                        >
                          {tr(`${base}.label`)}
                        </span>

                        {plan.requiresBadge && (
                          <span className="mb-4 inline-flex w-fit rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-[11px] font-bold text-gray-500 dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-300">
                            {tr(`${base}.requires_badge`)}
                          </span>
                        )}

                        <h3
                          className={
                            plan.featured
                              ? 'max-w-[13ch] text-2xl font-black leading-[1.02] tracking-[-0.05em] text-white md:text-3xl'
                              : 'max-w-[13ch] text-2xl font-black leading-[1.02] tracking-[-0.05em] text-custom-title md:text-3xl'
                          }
                        >
                          {tr(`${base}.name`)}
                        </h3>

                        <div className="mt-5 flex items-end gap-2">
                          <span
                            className={
                              plan.featured
                                ? 'text-5xl font-black leading-none tracking-[-0.07em] text-red-300 md:text-6xl'
                                : 'text-5xl font-black leading-none tracking-[-0.07em] text-[#8C0605] dark:text-red-400 md:text-6xl'
                            }
                          >
                            {tr(`${base}.price`)}
                          </span>

                          <span
                            className={
                              plan.featured
                                ? 'pb-1.5 text-xs font-medium text-white/50 md:text-sm'
                                : 'pb-1.5 text-xs font-medium text-custom-muted md:text-sm'
                            }
                          >
                            {tr('maintenance.per_month')}
                          </span>
                        </div>

                        {(plan.key === 'growth' || plan.key === 'pack') && (
                          <p
                            className={
                              plan.featured
                                ? 'mt-2 text-xs text-white/45'
                                : 'mt-2 text-xs text-custom-muted'
                            }
                          >
                            {tr(`${base}.setup_note`)}
                          </p>
                        )}

                        {plan.featured && (
                          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                            <p className="text-sm font-bold text-red-300">
                              {tr(`${base}.savings`)}
                            </p>
                          </div>
                        )}

                        <p
                          className={
                            plan.featured
                              ? 'mt-5 text-sm italic leading-6 text-white/62'
                              : 'mt-5 text-sm italic leading-6 text-custom-secondary'
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
                                  ? 'flex items-start gap-3 text-sm leading-6 text-white/78'
                                  : 'flex items-start gap-3 text-sm leading-6 text-custom-secondary'
                              }
                            >
                              <span
                                className={
                                  plan.featured
                                    ? 'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-400/15 text-green-300'
                                    : 'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400'
                                }
                              >
                                <FaCheck className="h-3 w-3" />
                              </span>

                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {plan.key === 'growth' && (
                          <p className="mt-5 text-xs leading-relaxed text-custom-muted">
                            {tr(`${base}.meta_note`)}
                          </p>
                        )}

                        <Link
                          href={plan.href}
                          className={
                            plan.featured
                              ? 'group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8C0605] px-5 py-3.5 text-sm font-black text-white shadow-[0_18px_40px_rgba(140,6,5,0.32)] transition-all hover:-translate-y-0.5 hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300'
                              : 'group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#8C0605]/35 px-5 py-3.5 text-sm font-black text-[#8C0605] transition-all hover:-translate-y-0.5 hover:bg-[#8C0605] hover:text-white dark:border-red-400/35 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-gray-950'
                          }
                        >
                          {tr(`${base}.cta`)}
                          <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Réassurance */}
      <section className="relative z-10 pb-14 md:pb-20">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
          <div className="mx-auto w-full max-w-[min(1120px,calc(100vw-5rem))] xl:max-w-[min(1160px,calc(100vw-7rem))] 2xl:max-w-[1160px]">
            <div className="mx-auto w-full max-w-[min(1080px,100%)]">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.62, ease: EASE_SMOOTH }}
                className="mb-8"
              >
                <span className="mb-4 block font-mono text-xs uppercase tracking-[0.28em] text-[#8C0605] dark:text-red-400 sm:text-sm">
                  {'// '}
                  {tr('maintenance.why_badge')}
                </span>

                <h2 className="max-w-3xl text-3xl font-black leading-[0.98] tracking-[-0.06em] text-custom-title md:text-5xl">
                  Simple, clair, sans promesse magique.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
                      className="relative overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white/76 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.055)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] md:p-6"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(140,6,5,0.08),transparent_34%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(248,113,113,0.06),transparent_34%)]" />

                      <div className="relative z-10">
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8C0605] text-white shadow-[0_14px_35px_rgba(140,6,5,0.22)] dark:bg-red-400 dark:text-gray-950 md:h-12 md:w-12">
                          <PointIcon className="h-5 w-5 md:h-6 md:w-6" />
                        </div>

                        <h3 className="text-lg font-black tracking-[-0.04em] text-custom-title md:text-xl">
                          {point.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-custom-secondary">
                          {point.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 pb-[clamp(4rem,5.5vw,6.5rem)]">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
          <div className="mx-auto w-full max-w-[min(1120px,calc(100vw-5rem))] xl:max-w-[min(1160px,calc(100vw-7rem))] 2xl:max-w-[1160px]">
            <div className="mx-auto w-full max-w-[min(1080px,100%)]">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.62, ease: EASE_SMOOTH }}
                className="relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white/76 p-6 text-center shadow-[0_18px_58px_rgba(0,0,0,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] md:p-8 lg:p-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(140,6,5,0.12),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(248,113,113,0.08),transparent_36%)]" />

                <div className="relative mx-auto max-w-2xl">
                  <h3 className="text-3xl font-black leading-[0.98] tracking-[-0.06em] text-custom-title md:text-5xl">
                    {tr('maintenance.cta_title')}
                  </h3>

                  <Link
                    href={`/${language}#contact`}
                    className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#8C0605] px-6 py-3.5 text-sm font-black text-white shadow-[0_18px_40px_rgba(140,6,5,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300"
                  >
                    <FaEnvelope className="h-4 w-4" />
                    {tr('maintenance.cta_button')}
                    <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}