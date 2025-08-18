'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/utils/cn'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText)
}

const navItems = [
  { href: '#home', key: 'nav.home' },
  { href: '#services', key: 'nav.services' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#about', key: 'nav.about' },
  { href: '#contact', key: 'nav.contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const { theme, toggleTheme, mounted } = useTheme()
  const { language, changeLanguage, t, mounted: tMounted } = useTranslation()
  const logoDotRef = useRef<HTMLDivElement>(null)
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const splitTextsA = useRef<SplitText[]>([])
  const splitTextsB = useRef<SplitText[]>([])
  const timelines = useRef<gsap.core.Timeline[]>([])

  // Initialiser SplitText pour chaque élément de navigation
  useEffect(() => {
    if (!mounted || !tMounted) return

    // Désactiver SplitText sur mobile pour de meilleures performances
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    // Ajouter un petit délai pour s'assurer que le DOM est complètement rendu
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && navItemRefs.current.length > 0) {
        // Nettoyer les splits précédents
        splitTextsA.current.forEach(split => split.revert())
        splitTextsB.current.forEach(split => split.revert())
        splitTextsA.current = []
        splitTextsB.current = []
        timelines.current.forEach(tl => tl.kill())
        timelines.current = []

        // Créer de nouveaux splits et timelines pour chaque élément de navigation
        navItemRefs.current.forEach((navItem, index) => {
          if (navItem) {
            // Vérifier d'abord les éléments desktop
            let splitAElement = navItem.querySelector(`#split-${index}-a`) as HTMLElement
            let splitBElement = navItem.querySelector(`#split-${index}-b`) as HTMLElement
            
            // Si non trouvé, vérifier les éléments mobile
            if (!splitAElement || !splitBElement) {
              splitAElement = navItem.querySelector(`#split-mobile-${index - navItems.length}-a`) as HTMLElement
              splitBElement = navItem.querySelector(`#split-mobile-${index - navItems.length}-b`) as HTMLElement
            }
            
            if (splitAElement && splitBElement) {
              // S'assurer que le contenu texte est correctement traduit avant le split
              const translatedText = t(navItems[index % navItems.length].key)
              if (splitAElement.textContent !== translatedText) {
                splitAElement.textContent = translatedText as string
              }
              if (splitBElement.textContent !== translatedText) {
                splitBElement.textContent = translatedText as string
              }

              const splitA = new SplitText(splitAElement, { 
                type: "chars",
                charsClass: "char"
              })
              const splitB = new SplitText(splitBElement, { 
                type: "chars",
                charsClass: "char"
              })
              
              splitTextsA.current.push(splitA)
              splitTextsB.current.push(splitB)

              const tl = gsap.timeline({ paused: true })
              
              // Animation pour la première couche de texte (monte et disparaît)
              tl.fromTo(splitA.chars, 
                { y: 0, opacity: 1 }, 
                {
                  duration: 0.5,
                  y: -20,
                  opacity: 0,
                  stagger: 0.05,
                  ease: "power2.out"
                }
              )

              // Animation pour la deuxième couche de texte (monte depuis le bas)
              tl.fromTo(splitB.chars, 
                { y: 0 }, 
                {
                  duration: 0.5,
                  y: -20,
                  stagger: 0.05,
                  ease: "power2.out"
                }, 
                "<"
              )

              timelines.current.push(tl)

              // Ajouter les event listeners
              navItem.addEventListener('mouseenter', () => {
                tl.play()
              })
              
              navItem.addEventListener('mouseleave', () => {
                tl.reverse()
              })
            }
          }
        })
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      splitTextsA.current.forEach(split => split.revert())
      splitTextsB.current.forEach(split => split.revert())
      timelines.current.forEach(tl => tl.kill())
      
      // Nettoyage supplémentaire pour supprimer les artefacts de caractères restants
      if (typeof window !== 'undefined') {
        document.querySelectorAll('.char').forEach(char => {
          char.remove()
        })
      }
    }
  }, [t, language, isOpen, mounted, tMounted]) // Re-exécuter quand la traduction, la langue, l'état du menu mobile, ou l'état de montage changent

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Vérifier si on est près du footer
      const footer = document.querySelector('footer')
      if (footer) {
        const footerTop = footer.offsetTop
        const windowHeight = window.innerHeight
        const scrollPosition = window.scrollY + windowHeight
        
        if (scrollPosition > footerTop - 100) {
          setNearFooter(true)
        } else {
          setNearFooter(false)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Animation GSAP pour le point rouge du logo
    if (logoDotRef.current) {
      if (nearFooter) {
        gsap.to(logoDotRef.current, {
          scale: 1.5,
          duration: 0.5,
          ease: "back.out(1.7)",
          yoyo: true,
          repeat: 1
        })
        
        // Ajouter un effet de "remplissage"
        gsap.to(logoDotRef.current, {
          boxShadow: "0 0 20px rgba(220, 38, 38, 0.6)",
          duration: 0.3,
          ease: "power2.out"
        })
      } else {
        // Animation normale de pulse
        gsap.to(logoDotRef.current, {
          scale: 1.1,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          boxShadow: "none"
        })
      }
    }
  }, [nearFooter])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!mounted || !tMounted) return null

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out will-change-transform',
        scrolled
          ? 'bg-custom-primary/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20'
          : 'bg-transparent'
      )}
    >
      <div className={cn(
        "container mx-auto px-6 py-4",
        isOpen && "bg-custom-primary/95 backdrop-blur-xl"
      )}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToTop}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-red-800 dark:group-hover:text-red-400 transition-colors duration-300">
              Minhaj
            </span>
            <div
              ref={logoDotRef}
              className={cn(
                "w-3 h-3 bg-red-600 dark:bg-red-400 rounded-full transition-all duration-300",
                nearFooter && "ring-2 ring-red-300 dark:ring-red-500"
              )}
            />
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.key}
                ref={(el) => {
                  navItemRefs.current[index] = el
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.href)}
                className="relative px-5 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group overflow-hidden cursor-pointer"
              >
                <div className="h-6 overflow-hidden relative">
                  <div 
                    ref={(el) => {
                      if (el) {
                        const splitId = `split-${index}-a`
                        el.id = splitId
                        el.setAttribute('data-split-id', splitId)
                      }
                    }}
                    className="text-base font-medium leading-6"
                  >
                    {t(item.key)}
                  </div>
                  <div 
                    ref={(el) => {
                      if (el) {
                        const splitId = `split-${index}-b`
                        el.id = splitId
                        el.setAttribute('data-split-id', splitId)
                      }
                    }}
                    className="text-base font-medium leading-6 absolute top-6 left-0"
                  >
                    {t(item.key)}
                  </div>
                </div>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-600 dark:bg-red-400 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
              </motion.button>
            ))}
          </nav>

          {/* Contrôles */}
          <div className="flex items-center space-x-3">
            {/* Basculement de langue */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeLanguage(language === 'fr' ? 'en' : 'fr')}
              className="px-3 py-2 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer font-semibold text-sm"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </motion.button>

            {/* Basculement de thème */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </motion.button>

            {/* Bouton menu mobile */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Navigation mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.2, 
                ease: "easeInOut",
                opacity: { duration: 0.15 },
                height: { duration: 0.2 }
              }}
              className="md:hidden mt-4 pb-4 border-t border-gray-200/20 dark:border-gray-700/20 bg-custom-primary/95 backdrop-blur-xl"
            >
              <div className="flex flex-col space-y-2 pt-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    ref={(el) => {
                      navItemRefs.current[index + navItems.length] = el
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.15,
                      ease: "easeOut"
                    }}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-gray-900 dark:text-white hover:text-[#8C0605] dark:hover:text-[#FFD6D6] transition-colors duration-300 font-medium py-3 px-3 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/50 text-base overflow-hidden cursor-pointer"
                  >
                    <div className="h-6 overflow-hidden relative">
                      <div 
                        ref={(el) => {
                          if (el) {
                            const splitId = `split-mobile-${index}-a`
                            el.id = splitId
                            el.setAttribute('data-split-id', splitId)
                          }
                        }}
                        className="text-base font-medium leading-6"
                      >
                        {t(item.key)}
                      </div>
                      <div 
                        ref={(el) => {
                          if (el) {
                            const splitId = `split-mobile-${index}-b`
                            el.id = splitId
                            el.setAttribute('data-split-id', splitId)
                          }
                        }}
                        className="text-base font-medium leading-6 absolute top-6 left-0"
                      >
                        {t(item.key)}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
