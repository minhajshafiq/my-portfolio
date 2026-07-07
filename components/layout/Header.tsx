'use client'

import { useCallback, useEffect, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { Link } from '@/components/ui/AppLink'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useTranslation } from '@/hooks/useTranslation'
import { trackEvent } from '@/utils/analytics'
import { cn } from '@/utils/cn'
import { EASE_SMOOTH } from '@/lib/motion'

type NavItem = {
  href: string
  key: string
}

type ControlButtonProps = {
  children: ReactNode
  onClick: () => void
  ariaLabel?: string
  ariaExpanded?: boolean
  ariaControls?: string
  className?: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '#home', key: 'nav.home' },
  { href: '/work', key: 'nav.projects' },
  { href: '#services', key: 'nav.services' },
  { href: '#about', key: 'nav.about' },
  { href: '#contact', key: 'nav.contact' },
]

const HEADER_SCROLL_OFFSET = 120

function ControlButton({
  children,
  onClick,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  className,
}: ControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-full text-sm font-semibold text-custom-secondary transition-colors duration-300 hover:bg-[rgba(20,18,16,0.05)] hover:text-custom-title dark:hover:bg-white/[0.07]',
        className
      )}
    >
      {children}
    </button>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const { theme, toggleTheme, mounted } = useTheme()
  const { language, changeLanguage, t } = useTranslation()

  const pathname = usePathname()
  const router = useRouter()

  const isHome = pathname === `/${language}` || pathname === `/${language}/`
  const basePath = `/${language}`

  const tr = useCallback(
    (key: string): string => {
      const value = t(key)
      return Array.isArray(value) ? value.join(' ') : String(value)
    },
    [t]
  )

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const scrollToSection = useCallback((href: string) => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const element = document.querySelector(href)

    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  const handleLogoClick = useCallback(() => {
    closeMenu()

    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.replaceState(null, '', basePath)
      return
    }

    router.push(basePath)
  }, [basePath, closeMenu, isHome, router])

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      closeMenu()

      // Lien direct vers une page (ex. /work) : on laisse AppLink naviguer normalement
      if (!href.startsWith('#')) return
      if (!isHome) return

      event.preventDefault()
      scrollToSection(href)
      window.history.replaceState(null, '', `${basePath}${href}`)
    },
    [basePath, closeMenu, isHome, scrollToSection]
  )

  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY
      const scrollPosition = scrollY + HEADER_SCROLL_OFFSET

      setIsScrolled(scrollY > 16)

      let currentSection = 'home'

      NAV_ITEMS.forEach((item) => {
        if (!item.href.startsWith('#')) return

        const section = document.querySelector(item.href) as HTMLElement | null

        if (section && section.offsetTop <= scrollPosition) {
          currentSection = item.href.replace('#', '')
        }
      })

      setActiveSection(currentSection)
    }

    updateScrollState()

    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeMenu])

  if (!mounted) return null

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: EASE_SMOOTH }}
      style={{ viewTransitionName: 'site-header' }}
      className="fixed left-0 right-0 top-3 z-50 md:top-4"
    >
      <div className="container mx-auto px-3 md:px-6">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className={cn(
                'relative overflow-hidden border transition-all duration-500',
                isOpen
                  ? 'rounded-[1.4rem]'
                  : 'rounded-[1.4rem] md:rounded-full',
                isScrolled || isOpen
                  ? 'border-[rgba(20,18,16,0.09)] bg-[#FAF7F2]/85 shadow-[0_10px_34px_-18px_rgba(20,18,16,0.4)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0C0D11]/82 dark:shadow-[0_10px_34px_-16px_rgba(0,0,0,0.65)]'
                  : 'border-transparent bg-[#FAF7F2]/30 backdrop-blur-md dark:bg-white/[0.02]'
              )}
            >
              <div className="relative flex items-center justify-between px-5 py-2.5 md:px-6 md:py-3">
                {/* Logo */}
                <button
                  type="button"
                  onClick={handleLogoClick}
                  className="group inline-flex cursor-pointer items-center gap-2"
                  aria-label={tr('nav.back_to_top')}
                >
                  <span className="font-serif text-[1.65rem] font-medium leading-none tracking-[-0.02em] text-custom-title transition-colors duration-300 group-hover:text-[#8C0605] dark:group-hover:text-red-400">
                    Minhaj
                  </span>

                  <span
                    data-logo-dot
                    className="h-2 w-2 rounded-full bg-[#8C0605] dark:bg-red-400"
                  />
                </button>

                {/* Desktop nav */}
                <nav
                  className="hidden items-center gap-1 lg:flex"
                  aria-label={tr('nav.main_nav')}
                >
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.key}
                      href={`${basePath}${item.href}`}
                      onClick={(event) => handleNavClick(event, item.href)}
                      className="group relative cursor-pointer px-5 py-2 text-base font-medium text-custom-secondary transition-colors duration-300 hover:text-custom-title dark:hover:text-white"
                    >
                      {tr(item.key)}

                      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-[#8C0605] transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full dark:bg-red-400" />
                    </Link>
                  ))}
                </nav>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <ControlButton
                    onClick={() => {
                      const nextLanguage = language === 'fr' ? 'en' : 'fr'
                      trackEvent('language_switch', { to: nextLanguage })
                      changeLanguage(nextLanguage)
                    }}
                    className="w-11"
                    ariaLabel="Change language"
                  >
                    {language === 'fr' ? 'EN' : 'FR'}
                  </ControlButton>

                  <ControlButton
                    onClick={toggleTheme}
                    ariaLabel={theme === 'light' ? tr('nav.dark_mode') : tr('nav.light_mode')}
                    className="w-10"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {theme === 'light' ? (
                        <motion.span
                          key="moon"
                          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Moon className="h-5 w-5" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="sun"
                          initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sun className="h-5 w-5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </ControlButton>

                  <ControlButton
                    onClick={() => setIsOpen((open) => !open)}
                    ariaLabel={isOpen ? tr('nav.close_menu') : tr('nav.open_menu')}
                    ariaExpanded={isOpen}
                    ariaControls="mobile-nav"
                    className="w-10 lg:hidden"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isOpen ? (
                        <motion.span
                          key="close"
                          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="h-5 w-5" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="menu"
                          initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="h-5 w-5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </ControlButton>
                </div>
              </div>

              {/* Mobile nav */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.nav
                    id="mobile-nav"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                    className="relative overflow-hidden lg:hidden"
                    aria-label={tr('nav.mobile_nav')}
                  >
                    <div className="mx-4 border-t border-gray-200/80 py-3 dark:border-white/10">
                      <div className="grid gap-1">
                        {NAV_ITEMS.map((item) => {
                          const isActive = item.href.startsWith('#')
                            ? isHome && activeSection === item.href.replace('#', '')
                            : pathname.startsWith(`${basePath}${item.href}`)

                          return (
                            <Link
                              key={item.key}
                              href={`${basePath}${item.href}`}
                              onClick={(event) => handleNavClick(event, item.href)}
                              className={cn(
                                'rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all duration-300',
                                isActive
                                  ? 'bg-[#8C0605]/10 text-[#8C0605] dark:bg-red-400/10 dark:text-red-400'
                                  : 'text-custom-secondary hover:bg-gray-900/[0.035] hover:text-custom-title dark:hover:bg-white/[0.06] dark:hover:text-white'
                              )}
                            >
                              {tr(item.key)}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </motion.nav>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
