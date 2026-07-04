'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const PASSION_KEYS = ['fitness', 'entrepreneurship', 'cars', 'music', 'travel'] as const

export function AboutFull() {
  const { t, language } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  return (
    <section className="relative bg-custom-primary py-[clamp(4rem,7vw,7rem)]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]">
          {/* Profile */}
          <div className="mb-20 grid grid-cols-1 items-start gap-12 md:mb-28 md:grid-cols-12 md:gap-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.75, ease: EASE_SMOOTH }}
              className="md:col-span-5"
            >
              <div className="group relative aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-xl">
                <Image
                  src="/minhaj.jpg"
                  alt={tr('hero.photo_alt')}
                  fill
                  sizes="(min-width: 768px) 440px, 100vw"
                  className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1, duration: 0.75, ease: EASE_SMOOTH }}
              className="md:col-span-7"
            >
              <h2 className="mb-7 font-serif text-3xl font-medium tracking-[-0.02em] text-custom-title md:text-4xl">
                {tr('about.profile.title')}
              </h2>

              <div className="space-y-5 text-sm leading-7 text-custom-secondary md:text-base md:leading-8">
                <p>{tr('about.profile.paragraph1')}</p>
                <p>{tr('about.profile.paragraph2')}</p>
                <p>{tr('about.profile.paragraph3')}</p>
                <p>{tr('about.profile.paragraph4')}</p>
              </div>

              <Link
                href={`/${language}/contact`}
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#8C0605] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300"
              >
                {tr('about.collaboration.button')}
                <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Passions */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="mb-16 md:mb-20"
          >
            <p className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#8C0605] dark:text-red-400">
              <span className="h-px w-10 bg-current" />
              {tr('beyondCode.badge')}
            </p>

            <h2 className="mb-12 max-w-[24ch] font-serif text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-custom-title">
              {tr('beyondCode.title')}
            </h2>

            <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {PASSION_KEYS.map((key, index) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: index * 0.06, duration: 0.6, ease: EASE_SMOOTH }}
                  className="border-t border-custom pt-6"
                >
                  <span className="mb-5 block font-serif text-sm font-medium text-[#8C0605] dark:text-red-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="mb-3 font-serif text-xl font-medium tracking-[-0.01em] text-custom-title">
                    {tr(`beyondCode.passions.${key}.title`)}
                  </h3>

                  <p className="text-sm leading-6 text-custom-secondary">
                    {tr(`beyondCode.passions.${key}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            className="border-t border-custom pt-12"
          >
            <p className="max-w-[32ch] font-serif text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium leading-[1.25] tracking-[-0.015em] text-custom-title">
              «&nbsp;{tr('beyondCode.quote')}&nbsp;»
            </p>

            <footer className="mt-5 text-sm text-custom-muted">
              {tr('beyondCode.quoteSubtitle')}
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}
