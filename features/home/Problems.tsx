'use client'

import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import { RevealText } from '@/components/ui/RevealText'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useTranslation } from '@/hooks/useTranslation'
import { trackEvent } from '@/lib/analytics'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'

type Problem = {
  title: string
  description: string
}

export function Problems() {
  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const rawProblems = t('problems.items', { returnObjects: true })
  const problems: Problem[] = Array.isArray(rawProblems) ? (rawProblems as Problem[]) : []

  return (
    <section
      id='problems'
      className='relative bg-custom-primary py-[clamp(4.5rem,8vw,8rem)]'
    >
      <div className='mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]'>
        <div className='mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]'>
          <motion.div
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            className='mb-12 md:mb-16'
          >
            <SectionLabel>{tr('problems.label')}</SectionLabel>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end'>
              <RevealText
                as='h2'
                text={tr('problems.heading')}
                className='font-serif text-[clamp(2.35rem,5.8vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title md:col-span-8'
              />

              <p className='max-w-sm text-sm leading-6 text-custom-secondary md:col-span-4 md:justify-self-end md:text-[15px] md:leading-7'>
                {tr('problems.intro')}
              </p>
            </div>
          </motion.div>

          <div className='grid grid-cols-1 border-t border-custom sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
            {problems.map((problem, index) => (
              <motion.article
                key={problem.title}
                variants={fadeUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.06, duration: 0.55, ease: EASE_SMOOTH }}
                className='border-b border-custom py-7 sm:px-6 sm:first:pl-0 xl:border-r xl:last:border-r-0 xl:last:pr-0'
              >
                <span className='mb-6 block font-serif text-sm font-medium text-[#8C0605] dark:text-red-400'>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className='mb-3 font-serif text-xl font-medium leading-tight tracking-[-0.01em] text-custom-title'>
                  {problem.title}
                </h3>

                <p className='text-sm leading-6 text-custom-secondary'>
                  {problem.description}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className='mt-10 flex flex-col items-start gap-3'
          >
            <a
              href='#contact'
              onClick={() => trackEvent('cta_click', { cta: 'problem_review', section: 'problems' })}
              className='group inline-flex items-center gap-3 rounded-full bg-[#8C0605] px-7 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300 sm:text-base'
            >
              {tr('problems.cta')}
              <FaArrowRight className='h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1' />
            </a>

            <p className='text-xs leading-5 text-custom-muted'>
              {tr('problems.microcopy')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
