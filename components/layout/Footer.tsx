'use client'

import { useEffect, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Briefcase, MapPin, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { SiMalt } from 'react-icons/si'
import { Link } from '@/components/ui/AppLink'
import { useTranslation } from '@/hooks/useTranslation'
import { Magnetic } from '@/components/ui/Magnetic'
import { trackEvent } from '@/utils/analytics'
import { cn } from '@/utils/cn'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'

type IconComponent = ComponentType<{ className?: string }>

type SocialLink = {
  name: string
  href: string
  icon: IconComponent
  hoverClassName: string
}

type QuickLink = {
  key: string
  href: string
}

type FooterInfoItem = {
  icon: LucideIcon
  key: string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/minhajshafiq/',
    icon: FaLinkedinIn,
    hoverClassName: 'hover:border-[#0A66C2]/40 hover:bg-[#0A66C2] hover:text-white',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/minhajshafiq',
    icon: FaGithub,
    hoverClassName:
      'hover:border-gray-900/40 hover:bg-gray-900 hover:text-white dark:hover:border-white/40 dark:hover:bg-white dark:hover:text-gray-950',
  },
  {
    name: 'Malt',
    href: 'https://www.malt.fr/profile/minhajzubair',
    icon: SiMalt,
    hoverClassName: 'hover:border-[#FC5757]/40 hover:bg-[#FC5757] hover:text-white',
  },
  {
    name: 'Email',
    href: 'mailto:contact@minhajshafiq.com',
    icon: FaEnvelope,
    hoverClassName: 'hover:border-[#8C0605]/40 hover:bg-[#8C0605] hover:text-white',
  },
]

const QUICK_LINKS: QuickLink[] = [
  { key: 'nav.home', href: '' },
  { key: 'nav.projects', href: '/work' },
  { key: 'nav.services', href: '/services' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.contact', href: '/contact' },
]

const FOOTER_INFO_ITEMS: FooterInfoItem[] = [
  { icon: MapPin, key: 'footer.location' },
  { icon: Briefcase, key: 'footer.availability' },
  { icon: Zap, key: 'footer.response_time' },
]

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[8%] top-24 h-[420px] w-[420px] rounded-full bg-[#8C0605]/10 blur-3xl dark:bg-red-400/[0.08] lg:right-[16%] lg:h-[520px] lg:w-[520px]" />

      <div className="absolute bottom-24 left-[4%] h-[340px] w-[340px] rounded-full bg-[#8C0605]/8 blur-3xl dark:bg-red-400/[0.06] lg:left-[10%] lg:h-[420px] lg:w-[420px]" />

      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/25 to-transparent dark:from-black/20" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/20 to-transparent dark:from-black/20" />
    </div>
  )
}

function FooterColumn({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: EASE_SMOOTH }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const { t, language } = useTranslation()

  const currentYear = new Date().getFullYear()

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.querySelector('#contact') as HTMLElement | null

      if (!contactSection) {
        setShowScrollButton(window.scrollY > 700)
        return
      }

      const contactTop = contactSection.offsetTop
      const scrollPosition = window.scrollY + window.innerHeight

      setShowScrollButton(scrollPosition >= contactTop + 200)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <footer
      id="site-footer"
      className="relative isolate overflow-hidden bg-custom-primary"
    >
      <SectionBackground />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-7xl">
            {/* CTA */}
            <div className="pb-16 pt-20 md:pb-20 md:pt-24">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: EASE_SMOOTH }}
                className="relative overflow-hidden rounded-[2rem] bg-[#141210] p-8 text-center md:p-12 lg:p-16"
              >
                <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#8C0605]/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#8C0605]/15 blur-3xl" />

                <div className="relative mx-auto max-w-4xl">
                  <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.25em] text-red-400 sm:text-sm">
                    {tr('footer.cta_label')}
                  </span>

                  <h2 className="mb-7 overflow-visible font-serif text-5xl font-medium leading-[1.02] tracking-[-0.03em] text-[#FAF7F2] md:text-7xl lg:text-8xl">
                    {tr('footer.cta_title_line1')}

                    <span className="block pb-3 italic text-red-400">
                      {tr('footer.cta_title_line2')}
                    </span>
                  </h2>

                  <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-[#FAF7F2]/65 md:text-lg">
                    {tr('footer.cta_description')}
                  </p>

                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Magnetic>
                      <a
                        href="mailto:contact@minhajshafiq.com"
                        onClick={() => trackEvent('email_click', { source_section: 'footer' })}
                        className="inline-flex items-center gap-3 rounded-full bg-[#8C0605] px-8 py-4 text-base font-bold text-white shadow-[0_18px_35px_rgba(140,6,5,0.35)] transition-colors hover:bg-[#a70b0a]"
                      >
                        <FaEnvelope className="h-5 w-5" />
                        contact@minhajshafiq.com
                      </a>
                    </Magnetic>

                    <motion.a
                      href="#contact"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center rounded-full border border-white/15 px-8 py-4 text-base font-bold text-[#FAF7F2] transition-colors hover:bg-white/[0.06]"
                    >
                      {tr('nav.contact')}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer content */}
            <div className="grid grid-cols-1 gap-10 border-y border-gray-200 py-12 dark:border-white/10 md:grid-cols-12">
              {/* Brand */}
              <FooterColumn className="md:col-span-5">
                <div className="mb-5 flex items-center gap-2">
                  <span className="text-3xl font-black tracking-[-0.05em] text-custom-title">
                    Minhaj
                  </span>

                  <span className="h-3 w-3 rounded-full bg-[#8C0605] dark:bg-red-400" />
                </div>

                <p className="mb-6 max-w-sm text-sm leading-relaxed text-custom-secondary">
                  {tr('footer.tagline')}
                </p>

                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>

                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {tr('footer.status_badge')}
                  </span>
                </div>
              </FooterColumn>

              {/* Navigation */}
              <FooterColumn className="md:col-span-3">
                <h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-custom-title">
                  {tr('footer.nav_title')}
                </h3>

                <ul className="grid gap-3">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={`/${language}${link.href}`}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-custom-secondary transition-colors hover:text-custom-title"
                      >
                        <span className="h-px w-0 bg-[#8C0605] transition-all duration-300 group-hover:w-4 dark:bg-red-400" />
                        {tr(link.key)}
                      </Link>
                    </li>
                  ))}

                  <li>
                    <Link
                      href={`/${language}/maintenance`}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-custom-secondary transition-colors hover:text-custom-title"
                    >
                      <span className="h-px w-0 bg-[#8C0605] transition-all duration-300 group-hover:w-4 dark:bg-red-400" />
                      {tr('footer.maintenance_link')}
                    </Link>
                  </li>
                </ul>
              </FooterColumn>

              {/* Contact */}
              <FooterColumn className="md:col-span-4">
                <h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-custom-title">
                  {tr('footer.contact_title')}
                </h3>

                <div className="space-y-3 text-sm">
                  {FOOTER_INFO_ITEMS.map((item) => {
                    const InfoIcon = item.icon

                    return (
                      <div
                        key={item.key}
                        className="flex items-center gap-3 text-custom-secondary"
                      >
                        <InfoIcon className="h-4 w-4 text-[#8C0605] dark:text-red-400" />
                        <span>{tr(item.key)}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((link) => {
                    const SocialIcon = link.icon

                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          'flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/76 text-custom-secondary shadow-sm backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/[0.04]',
                          link.hoverClassName
                        )}
                        title={link.name}
                        aria-label={link.name}
                      >
                        <SocialIcon className="h-4 w-4" />
                      </motion.a>
                    )
                  })}
                </div>
              </FooterColumn>
            </div>

            {/* Bottom */}
            <div className="flex flex-col items-center justify-between gap-5 py-7 md:flex-row">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center text-sm text-custom-secondary md:text-left"
              >
                © {currentYear} Minhaj Zubair. {tr('footer.rights')}.
                {' · '}
                <Link
                  href={`/${language}/cv`}
                  className="underline decoration-1 underline-offset-4 opacity-80 transition-all hover:opacity-100 hover:text-custom-title"
                >
                  {tr('footer.cv_link')}
                </Link>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-custom-secondary"
              >
                {tr('footer.crafted')}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group fixed bottom-8 right-8 z-[90] cursor-pointer rounded-full bg-[#8C0605] p-4 text-white shadow-lg shadow-[#8C0605]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#8C0605]/30 dark:bg-red-400 dark:text-gray-950 dark:shadow-red-400/20"
            aria-label={tr('nav.back_to_top')}
          >
            <ArrowUp className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
