'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaPlus } from 'react-icons/fa'
import { RevealText } from '@/components/ui/RevealText'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useTranslation } from '@/hooks/useTranslation'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'

type FAQItem = {
  question: string
  answer: string
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { t } = useTranslation()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const rawItems = t('faq.items', { returnObjects: true })
  const items: FAQItem[] = Array.isArray(rawItems) ? (rawItems as FAQItem[]) : []

  return (
    <section id='faq' className='relative bg-custom-primary py-[clamp(4.5rem,8vw,8rem)]'>
      <div className='mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]'>
        <div className='mx-auto grid w-full max-w-[min(1180px,calc(100vw-2.5rem))] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16'>
          <motion.div
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className='lg:col-span-5'
          >
            <SectionLabel>{tr('faq.label')}</SectionLabel>

            <RevealText
              as='h2'
              text={tr('faq.heading')}
              className='mb-6 font-serif text-[clamp(2.35rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title'
            />

            <p className='mb-8 max-w-md text-sm leading-7 text-custom-secondary md:text-[15px]'>
              {tr('faq.intro')}
            </p>

            <a
              href='#contact'
              onClick={() => trackEvent('cta_click', { cta: 'faq_question', section: 'faq' })}
              className='group inline-flex items-center gap-3 text-sm font-bold text-custom-title md:text-base'
            >
              <span className='relative'>
                {tr('faq.cta')}
                <span className='absolute -bottom-1 left-0 h-px w-full bg-custom-title/30 transition-colors duration-300 group-hover:bg-[#8C0605] dark:group-hover:bg-red-400' />
              </span>

              <FaArrowRight className='h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#8C0605] dark:group-hover:text-red-400' />
            </a>

            <p className='mt-3 text-xs leading-5 text-custom-muted'>
              {tr('faq.microcopy')}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.08, duration: 0.65, ease: EASE_SMOOTH }}
            className='border-t border-custom lg:col-span-7'
          >
            {items.map((item, index) => {
              const isOpen = openIndex === index
              const buttonId = `faq-question-${index}`
              const answerId = `faq-answer-${index}`

              return (
                <div key={item.question} className='border-b border-custom'>
                  <button
                    id={buttonId}
                    type='button'
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                    className='group flex min-h-11 w-full cursor-pointer items-start justify-between gap-5 py-6 text-left'
                  >
                    <span
                      className={cn(
                        'font-serif text-lg font-medium leading-snug transition-colors duration-300 motion-reduce:transition-none md:text-[1.35rem]',
                        isOpen
                          ? 'text-[#8C0605] dark:text-red-400'
                          : 'text-custom-title group-hover:text-[#8C0605] dark:group-hover:text-red-400'
                      )}
                    >
                      {item.question}
                    </span>

                    <span
                      aria-hidden='true'
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 motion-reduce:transition-none',
                        isOpen
                          ? 'rotate-45 border-[#8C0605] text-[#8C0605] dark:border-red-400 dark:text-red-400'
                          : 'border-custom text-custom-muted group-hover:border-[#8C0605] group-hover:text-[#8C0605] dark:group-hover:border-red-400 dark:group-hover:text-red-400'
                      )}
                    >
                      <FaPlus className='h-3 w-3' />
                    </span>
                  </button>

                  <div
                    id={answerId}
                    role='region'
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    className={cn(
                      'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className='overflow-hidden'>
                      <p
                        className={cn(
                          'max-w-[62ch] pr-12 text-sm leading-7 text-custom-secondary transition-opacity duration-300 motion-reduce:transition-none md:text-[15px]',
                          isOpen ? 'pb-6 opacity-100 delay-150' : 'pb-0 opacity-0'
                        )}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
