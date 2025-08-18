'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Handshake, Circle, ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import { useLoader } from '@/hooks/useLoader'
import { useTranslation } from '@/hooks/useTranslation'

export function Hero() {
  const logoDotRef = useRef<HTMLDivElement>(null)
  const backgroundShapeRef = useRef<HTMLDivElement>(null)
  const { isLoading } = useLoader()
  const { t } = useTranslation()

  useEffect(() => {

    gsap.to(logoDotRef.current, {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    })


    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      

      gsap.set(backgroundShapeRef.current, {
        y: rate
      })


      const heroSection = document.getElementById('home')
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        const scrollProgress = Math.min(scrolled / (heroHeight * 0.5), 1)
        

        gsap.to('.hero-content', {
          y: scrolled * 0.3,
          opacity: 1 - scrollProgress * 0.3,
          scale: 1 - scrollProgress * 0.1,
          duration: 0.1
        })


        gsap.to('.scroll-indicator', {
          y: scrolled * 0.5,
          opacity: 1 - scrollProgress,
          duration: 0.1
        })


        gsap.to('.hero-background', {
          scale: 1 + scrollProgress * 0.1,
          duration: 0.1
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }


  if (isLoading) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-custom-primary">
        {/* Formes décoratives */}
        <div
          ref={backgroundShapeRef}
          className="hero-background absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-red-800/10 to-red-600/5 rounded-full blur-3xl"
        />
        <div
          ref={backgroundShapeRef}
          className="hero-background absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-red-800/10 to-red-600/5 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="hero-content text-center max-w-4xl mx-auto space-y-8 opacity-0">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-1 mb-8">
              <span className="text-4xl font-bold text-custom-title">Minhaj</span>
              <div
                ref={logoDotRef}
                className="w-4 h-4 bg-red-800 dark:bg-red-600 rounded-full"
              />
            </div>

            {/* Badge disponibilité */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Available for work</span>
              </div>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl lg:text-7xl font-bold text-custom-title leading-tight">
              Développeur Front-End & Full Stack
            </h1>


            <p className="text-xl lg:text-2xl text-custom-secondary max-w-3xl mx-auto leading-relaxed">
              Je suis Minhaj, développeur passionné qui crée des applications web et mobiles performantes pour entreprises et startups qui veulent se démarquer dans le digital.
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button className="flex items-center justify-center gap-2 btn-primary px-8 py-4 rounded-full font-semibold hover:bg-red-700 dark:hover:bg-red-500 transition-colors shadow-lg cursor-pointer">
                Voir mes projets
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="flex items-center justify-center gap-2 btn-secondary px-8 py-4 rounded-full font-semibold transition-colors cursor-pointer">
                Travaillons ensemble
                <Handshake className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
          <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-custom-primary">
      {/* Formes décoratives */}
      <div
        ref={backgroundShapeRef}
        className="hero-background absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-red-800/10 to-red-600/5 rounded-full blur-3xl"
      />
      <div
        ref={backgroundShapeRef}
        className="hero-background absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-red-800/10 to-red-600/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content text-center max-w-4xl mx-auto space-y-8"
        >


          {/* Badge disponibilité */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0.4)",
                  "0 0 0 10px rgba(34, 197, 94, 0)",
                  "0 0 0 0 rgba(34, 197, 94, 0)"
                ]
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Circle className="w-2 h-2 fill-green-500 text-green-500" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">{t('hero.available_for_work')}</span>
            </motion.div>
          </motion.div>

          {/* Titre principal */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-bold text-custom-title leading-tight"
          >
            {t('hero.title')}
          </motion.h1>


          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl text-custom-secondary max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>


          <motion.p 
            variants={itemVariants}
            className="text-lg text-custom-secondary max-w-2xl mx-auto"
          >
            {t('hero.specialization')}
          </motion.p>

          {/* Boutons d'action */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#projects')}
              className="flex items-center justify-center gap-2 btn-primary px-8 py-4 rounded-full font-semibold hover:bg-red-700 dark:hover:bg-red-500 transition-colors shadow-lg cursor-pointer"
            >
              {t('hero.cta_projects')}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="flex items-center justify-center gap-2 btn-secondary px-8 py-4 rounded-full font-semibold transition-colors cursor-pointer"
            >
              {t('hero.cta_contact')}
              <Handshake className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Indicateur de scroll */}
                  <motion.div 
            variants={itemVariants}
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex justify-center w-full"
          >
                      <motion.div
              className="flex flex-col items-center gap-3 text-custom-secondary group"
            >
            <span className="text-sm font-medium tracking-wide">{t('hero.discover')}</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="p-2 rounded-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm group-hover:bg-white/20 dark:group-hover:bg-gray-800/20 transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-[#8C0605] dark:text-[#FFD6D6] transition-colors" />
                          </motion.div>
            </motion.div>
          </motion.div>
      </div>
    </section>
  )
}
