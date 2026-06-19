'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/utils/cn'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText)
}

const FOOTER_OFFSET = 100
const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const navItems = [
  { href: '#home', key: 'nav.home' },
  { href: '#services', key: 'nav.services' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#about', key: 'nav.about' },
  { href: '#beyond-code', key: 'nav.beyondCode' },
  { href: '#contact', key: 'nav.contact' },
] as const

const transitionClass =
  'transition-[top,padding,background-color,box-shadow,border-color,border-radius,grid-template-rows,opacity] duration-[900ms] ease-[cubic-bezier(0.33,1,0.68,1)]'

const floatingBarClass =
  'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-black/[0.04] dark:shadow-black/20 rounded-3xl md:rounded-full'

function NavSplitLabel({ id, label }: { id: string; label: string }) {
  return (
    <div className="h-6 overflow-hidden relative">
      <div id={`${id}-a`} className="text-base font-medium leading-6">
        {label}
      </div>
      <div id={`${id}-b`} className="text-base font-medium leading-6 absolute top-6 left-0">
        {label}
      </div>
    </div>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const { theme, toggleTheme, mounted } = useTheme()
  const { language, changeLanguage, t } = useTranslation()
  const logoDotRef = useRef<HTMLDivElement>(null)
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const splitCleanup = useRef<(() => void) | null>(null)

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!mounted || window.innerWidth < 768) return

    const timer = setTimeout(() => {
      const splitsA: SplitText[] = []
      const splitsB: SplitText[] = []
      const timelines: gsap.core.Timeline[] = []
      const listeners: Array<{
        el: HTMLButtonElement
        onEnter: () => void
        onLeave: () => void
      }> = []

      navItemRefs.current.forEach((navItem, index) => {
        if (!navItem || index >= navItems.length) return

        const splitA = navItem.querySelector(`#split-${index}-a`) as HTMLElement | null
        const splitB = navItem.querySelector(`#split-${index}-b`) as HTMLElement | null
        if (!splitA || !splitB) return

        const label = t(navItems[index].key) as string
        splitA.textContent = label
        splitB.textContent = label

        const textA = new SplitText(splitA, { type: 'chars', charsClass: 'char' })
        const textB = new SplitText(splitB, { type: 'chars', charsClass: 'char' })
        splitsA.push(textA)
        splitsB.push(textB)

        const tl = gsap.timeline({ paused: true })
        tl.fromTo(
          textA.chars,
          { y: 0, opacity: 1 },
          { duration: 0.5, y: -20, opacity: 0, stagger: 0.05, ease: 'power2.out' }
        ).fromTo(
          textB.chars,
          { y: 0 },
          { duration: 0.5, y: -20, stagger: 0.05, ease: 'power2.out' },
          '<'
        )
        timelines.push(tl)

        const onEnter = () => tl.play()
        const onLeave = () => tl.reverse()
        navItem.addEventListener('mouseenter', onEnter)
        navItem.addEventListener('mouseleave', onLeave)
        listeners.push({ el: navItem, onEnter, onLeave })
      })

      splitCleanup.current = () => {
        listeners.forEach(({ el, onEnter, onLeave }) => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
        })
        splitsA.forEach((s) => s.revert())
        splitsB.forEach((s) => s.revert())
        timelines.forEach((tl) => tl.kill())
        document.querySelectorAll('.char').forEach((el) => el.remove())
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      splitCleanup.current?.()
      splitCleanup.current = null
    }
  }, [t, language, mounted])

  useEffect(() => {
    const updateScrollState = () => {
      const footer = document.querySelector('footer')
      if (!footer) return

      const scrollBottom = window.scrollY + window.innerHeight
      setNearFooter(scrollBottom > footer.offsetTop - FOOTER_OFFSET)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    const dot = logoDotRef.current
    if (!dot) return

    if (nearFooter) {
      gsap.to(dot, {
        scale: 1.5,
        duration: 0.5,
        ease: 'back.out(1.7)',
        yoyo: true,
        repeat: 1,
      })
      gsap.to(dot, {
        boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)',
        duration: 0.3,
        ease: 'power2.out',
      })
      return
    }

    gsap.to(dot, {
      scale: 1.1,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      boxShadow: 'none',
    })
  }, [nearFooter])

  if (!mounted) return null

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_SMOOTH }}
      className={cn('fixed z-50 left-0 right-0 top-3 md:top-4', transitionClass)}
    >
      <div className={cn('container mx-auto px-3 md:px-4 lg:px-6', transitionClass)}>
        <div
          className={cn(
            'w-full px-4 py-3 md:px-6 md:py-4',
            transitionClass,
            floatingBarClass
          )}
        >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 cursor-pointer group"
            aria-label="Retour en haut"
          >
            <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors duration-300">
              Minhaj
            </span>
            <div
              ref={logoDotRef}
              className={cn(
                'w-3 h-3 bg-red-600 dark:bg-red-400 rounded-full',
                nearFooter && 'ring-2 ring-red-300 dark:ring-red-500'
              )}
            />
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {navItems.map((item, index) => (
              <button
                key={item.key}
                ref={(el) => {
                  navItemRefs.current[index] = el
                }}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="relative px-5 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group overflow-hidden cursor-pointer"
              >
                <NavSplitLabel id={`split-${index}`} label={t(item.key) as string} />
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-600 dark:bg-red-400 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeLanguage(language === 'fr' ? 'en' : 'fr')}
              className="px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer font-semibold text-sm"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
              aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="md:hidden p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <nav
          className={cn(
            'md:hidden grid overflow-hidden',
            transitionClass,
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
          aria-hidden={!isOpen}
          aria-label="Navigation mobile"
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mt-4 pt-4 pb-2 border-t border-gray-200/20 dark:border-gray-700/20 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-gray-900 dark:text-white hover:text-[#8C0605] dark:hover:text-[#FFD6D6] transition-colors duration-300 font-medium py-3 px-3 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/50 cursor-pointer"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </div>
        </nav>
        </div>
      </div>
    </motion.header>
  )
}
