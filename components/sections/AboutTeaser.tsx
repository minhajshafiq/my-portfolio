'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'
import { RevealText } from '@/components/ui/RevealText'

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function AboutTeaser() {
  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  return (
    <section
      id="about"
      className="relative bg-custom-primary py-[clamp(4.5rem,8vw,8rem)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto grid w-full max-w-[min(1180px,calc(100vw-2.5rem))] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          {/* Photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, ease: EASE_SMOOTH }}
            className="md:col-span-5"
          >
            <div className="group relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-xl">
              <Image
                src="/minhaj.jpg"
                alt={tr('hero.photo_alt')}
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1, duration: 0.75, ease: EASE_SMOOTH }}
            className="md:col-span-7"
          >
            <p className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#8C0605] dark:text-red-400">
              <span className="h-px w-10 bg-current" />
              {tr('about_teaser.label')}
            </p>

            <RevealText
              as="h2"
              text={tr('about_teaser.heading')}
              className="mb-7 font-serif text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.025em] text-custom-title"
            />

            <p className="mb-5 max-w-[58ch] text-sm leading-7 text-custom-secondary md:text-base md:leading-8">
              {tr('about_teaser.p1')}
            </p>

            <p className="mb-9 max-w-[58ch] text-sm leading-7 text-custom-secondary md:text-base md:leading-8">
              {tr('about_teaser.p2')}
            </p>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 text-sm font-bold text-custom-title md:text-base"
            >
              <span className="relative">
                {tr('about_teaser.cta')}
                <span className="absolute -bottom-1 left-0 h-px w-full bg-custom-title/30 transition-colors duration-300 group-hover:bg-[#8C0605] dark:group-hover:bg-red-400" />
              </span>

              <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#8C0605] dark:group-hover:text-red-400" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
