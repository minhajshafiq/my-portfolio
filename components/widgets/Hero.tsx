'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Handshake, Circle, ChevronDown, Sparkles, Code2, Smartphone, Zap } from 'lucide-react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useLoader } from '@/hooks/useLoader'
import { useTranslation } from '@/hooks/useTranslation'

export function Hero() {
  const logoDotRef = useRef<HTMLDivElement>(null)
  const backgroundShapeRef = useRef<HTMLDivElement>(null)
  const { isLoading } = useLoader()
  const { t } = useTranslation()
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    // Initialiser les particules
    const initialParticles = Array.from({ length: 6 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
    }))
    setParticles(initialParticles)

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
      {/* Formes décoratives animées */}
      <div
        ref={backgroundShapeRef}
        className="hero-background absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-red-800/20 via-red-600/10 to-transparent rounded-full blur-3xl animate-pulse"
      />
      <div
        ref={backgroundShapeRef}
        className="hero-background absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-red-800/20 via-red-600/10 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div className="hero-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-red-800/5 via-transparent to-transparent rounded-full blur-3xl" />
      
      {/* Grille de fond subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      
      {/* Particules flottantes */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#8C0605]/20 dark:bg-[#FFD6D6]/20 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0.3,
          }}
          animate={{
            y: [particle.y, particle.y + (Math.random() - 0.5) * 200, particle.y],
            x: [particle.x, particle.x + (Math.random() - 0.5) * 200, particle.x],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content text-center max-w-4xl mx-auto space-y-8"
        >


          {/* Photo de profil avec effet glow */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <motion.div 
              className="relative"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8C0605]/30 via-[#8C0605]/20 to-transparent dark:from-[#FFD6D6]/30 dark:via-[#FFD6D6]/20 rounded-full blur-2xl scale-150" />
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 ring-4 ring-[#8C0605]/20 dark:ring-[#FFD6D6]/20">
                <Image
                  src="/minhaj.jpg"
                  alt="Photo de profil Minhaj"
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

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
            className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-custom-title"
          >
            {t('hero.title')}
          </motion.h1>
          
          {/* Badges de technologies */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            {[
              { icon: Code2, label: 'Next.js', color: 'from-blue-500/20 to-cyan-500/20' },
              { icon: Smartphone, label: 'Flutter', color: 'from-blue-400/20 to-indigo-500/20' },
              { icon: Zap, label: 'Spring Boot', color: 'from-green-500/20 to-emerald-500/20' },
            ].map((tech, index) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
              >
                <tech.icon className="w-4 h-4 text-[#8C0605] dark:text-[#FFD6D6]" />
                <span className="text-sm font-medium text-custom-title">{tech.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl text-custom-secondary max-w-3xl mx-auto leading-relaxed font-light"
          >
            {t('hero.description')}
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-lg lg:text-xl text-custom-secondary max-w-2xl mx-auto font-medium mt-4"
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8C0605] dark:text-[#FFD6D6]" />
              {t('hero.specialization')}
            </span>
          </motion.p>

          {/* Boutons d'action avec glassmorphism */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 pb-24 relative z-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#projects')}
              className="group relative flex items-center justify-center gap-2 btn-primary px-8 py-4 rounded-full font-semibold hover:bg-red-700 dark:hover:bg-red-500 transition-all shadow-lg hover:shadow-xl cursor-pointer overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">{t('hero.cta_projects')}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="group relative flex items-center justify-center gap-2 btn-secondary px-8 py-4 rounded-full font-semibold transition-all cursor-pointer backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 shadow-md hover:shadow-lg border-2"
            >
              <span className="relative z-10">{t('hero.cta_contact')}</span>
              <Handshake className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Indicateur de scroll amélioré */}
        <motion.div 
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center w-full z-30 pointer-events-auto"
        >
          <motion.div
            className="flex flex-col items-center gap-3 text-custom-secondary group cursor-pointer"
            onClick={() => scrollToSection('#about')}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm font-medium tracking-wide opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {t('hero.discover')}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md group-hover:bg-white/30 dark:group-hover:bg-gray-800/30 transition-all border border-white/30 dark:border-gray-700/30 shadow-lg"
            >
              <ChevronDown className="w-5 h-5 text-[#8C0605] dark:text-[#FFD6D6] transition-colors" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
