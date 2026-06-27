'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useTheme } from '@/hooks/useTheme'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/utils/cn'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText)
}

type NavItem = {
  href: string
  key: string
}

type ControlButtonProps = {
  children: ReactNode
  onClick: () => void
  ariaLabel?: string
  className?: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '#home', key: 'nav.home' },
  { href: '#services', key: 'nav.services' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#about', key: 'nav.about' },
  { href: '#beyond-code', key: 'nav.beyondCode' },
  { href: '#contact', key: 'nav.contact' },
]

const FOOTER_OFFSET = 100
const HEADER_SCROLL_OFFSET = 120
const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

function NavSplitLabel({ id, label }: { id: string; label: string }) {
  return (
    <span className="relative block h-6 overflow-hidden">
      <span
        id={`${id}-a`}
        className="block text-base font-medium leading-6"
      >
        {label}
      </span>

      <span
        id={`${id}-b`}
        className="absolute left-0 top-6 block text-base font-medium leading-6"
      >
        {label}
      </span>
    </span>
  )
}

function ControlButton({
  children,
  onClick,
  ariaLabel,
  className,
}: ControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-sm font-bold text-custom-secondary backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-custom-title dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]',
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
  const [nearFooter, setNearFooter] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const { theme, toggleTheme, mounted } = useTheme()
  const { language, changeLanguage, t } = useTranslation()

  const pathname = usePathname()
  const router = useRouter()

  const isHome = pathname === `/${language}` || pathname === `/${language}/`
  const basePath = `/${language}`

  const logoDotRef = useRef<HTMLSpanElement>(null)
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const splitCleanup = useRef<(() => void) | null>(null)

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
    if (!mounted) return
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return

    splitCleanup.current?.()
    splitCleanup.current = null

    const timer = window.setTimeout(() => {
      const splitInstances: SplitText[] = []
      const timelines: gsap.core.Timeline[] = []
      const listeners: Array<{
        element: HTMLAnchorElement
        onEnter: () => void
        onLeave: () => void
      }> = []

      navItemRefs.current.forEach((navItem, index) => {
        if (!navItem) return

        const labelA = navItem.querySelector(`#split-${index}-a`) as HTMLElement | null
        const labelB = navItem.querySelector(`#split-${index}-b`) as HTMLElement | null

        if (!labelA || !labelB) return

        const translatedLabel = tr(NAV_ITEMS[index].key)

        labelA.textContent = translatedLabel
        labelB.textContent = translatedLabel

        const splitA = new SplitText(labelA, {
          type: 'chars',
          charsClass: 'nav-char',
        })

        const splitB = new SplitText(labelB, {
          type: 'chars',
          charsClass: 'nav-char',
        })

        splitInstances.push(splitA, splitB)

        gsap.set(splitA.chars, {
          y: 0,
          opacity: 1,
        })

        gsap.set(splitB.chars, {
          y: 0,
          opacity: 1,
        })

        const timeline = gsap.timeline({
          paused: true,
        })

        timeline
          .to(splitA.chars, {
            duration: 0.5,
            y: -24,
            opacity: 0,
            stagger: 0.045,
            ease: 'power2.out',
          })
          .to(
            splitB.chars,
            {
              duration: 0.5,
              y: -24,
              opacity: 1,
              stagger: 0.045,
              ease: 'power2.out',
            },
            '<'
          )

        timelines.push(timeline)

        const onEnter = () => timeline.play()
        const onLeave = () => timeline.reverse()

        navItem.addEventListener('mouseenter', onEnter)
        navItem.addEventListener('mouseleave', onLeave)

        listeners.push({
          element: navItem,
          onEnter,
          onLeave,
        })
      })

      splitCleanup.current = () => {
        listeners.forEach(({ element, onEnter, onLeave }) => {
          element.removeEventListener('mouseenter', onEnter)
          element.removeEventListener('mouseleave', onLeave)
        })

        timelines.forEach((timeline) => timeline.kill())
        splitInstances.forEach((split) => split.revert())
      }
    }, 120)

    return () => {
      window.clearTimeout(timer)
      splitCleanup.current?.()
      splitCleanup.current = null
    }
  }, [mounted, language, tr])

  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY
      const scrollPosition = scrollY + HEADER_SCROLL_OFFSET

      setIsScrolled(scrollY > 16)

      let currentSection = 'home'

      NAV_ITEMS.forEach((item) => {
        const section = document.querySelector(item.href) as HTMLElement | null

        if (section && section.offsetTop <= scrollPosition) {
          currentSection = item.href.replace('#', '')
        }
      })

      setActiveSection(currentSection)

      const footer = document.querySelector('footer') as HTMLElement | null

      if (footer) {
        const scrollBottom = window.scrollY + window.innerHeight
        setNearFooter(scrollBottom > footer.offsetTop - FOOTER_OFFSET)
      }
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

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  useEffect(() => {
    const dot = logoDotRef.current

    if (!dot) return

    const animation = gsap.to(dot, {
      scale: nearFooter ? 1.45 : 1.12,
      duration: nearFooter ? 0.45 : 1.8,
      ease: nearFooter ? 'back.out(1.7)' : 'power2.inOut',
      yoyo: true,
      repeat: nearFooter ? 1 : -1,
      boxShadow: nearFooter ? '0 0 22px rgba(248, 113, 113, 0.45)' : 'none',
    })

    return () => {
      animation.kill()
    }
  }, [nearFooter])

  if (!mounted) return null

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: EASE_SMOOTH }}
      className="fixed left-0 right-0 top-3 z-50 md:top-4"
    >
      <div className="container mx-auto px-3 md:px-6">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className={cn(
                'relative overflow-hidden border backdrop-blur-xl transition-all duration-500',
                isOpen
                  ? 'rounded-[1.6rem]'
                  : 'rounded-[1.6rem] md:rounded-full',
                isScrolled
                  ? 'border-gray-200/80 bg-white/78 shadow-[0_18px_55px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#09090B]/78 dark:shadow-black/25'
                  : 'border-gray-200/55 bg-white/58 shadow-[0_10px_35px_rgba(0,0,0,0.045)] dark:border-white/[0.08] dark:bg-white/[0.035]'
              )}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(140,6,5,0.08),transparent_32%)] dark:bg-[radial-gradient(circle_at_12%_0%,rgba(248,113,113,0.07),transparent_32%)]" />

              <div className="relative flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
                {/* Logo */}
                <button
                  type="button"
                  onClick={handleLogoClick}
                  className="group inline-flex cursor-pointer items-center gap-2"
                  aria-label={tr('nav.back_to_top')}
                >
                  <span className="text-2xl font-black tracking-[-0.05em] text-custom-title transition-colors duration-300 group-hover:text-[#8C0605] dark:group-hover:text-red-400">
                    Minhaj
                  </span>

                  <span
                    ref={logoDotRef}
                    className={cn(
                      'h-3 w-3 rounded-full bg-[#8C0605] dark:bg-red-400',
                      nearFooter && 'ring-2 ring-[#8C0605]/20 dark:ring-red-400/30'
                    )}
                  />
                </button>

                {/* Desktop nav */}
                <nav
                  className="hidden items-center gap-1 md:flex"
                  aria-label={tr('nav.main_nav')}
                >
                  {NAV_ITEMS.map((item, index) => (
                    <Link
                      key={item.key}
                      ref={(element) => {
                        navItemRefs.current[index] = element
                      }}
                      href={`${basePath}${item.href}`}
                      onClick={(event) => handleNavClick(event, item.href)}
                      className="group relative cursor-pointer overflow-hidden px-5 py-2 text-base font-medium text-custom-secondary transition-colors duration-300 hover:text-custom-title dark:hover:text-white"
                    >
                      <NavSplitLabel id={`split-${index}`} label={tr(item.key)} />

                      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-[#8C0605] transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full dark:bg-red-400" />
                    </Link>
                  ))}
                </nav>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <ControlButton
                    onClick={() => changeLanguage(language === 'fr' ? 'en' : 'fr')}
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
                    className="w-10 md:hidden"
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
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                    className="relative overflow-hidden md:hidden"
                    aria-label={tr('nav.mobile_nav')}
                  >
                    <div className="mx-4 border-t border-gray-200/80 py-3 dark:border-white/10">
                      <div className="grid gap-1">
                        {NAV_ITEMS.map((item) => {
                          const sectionId = item.href.replace('#', '')
                          const isActive = activeSection === sectionId

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