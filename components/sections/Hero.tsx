'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useLoader } from '@/hooks/useLoader'
import { useTranslation } from '@/hooks/useTranslation'
import {
  FaGithub,
  FaLinkedinIn,
  FaArrowDown,
  FaPlay,
} from 'react-icons/fa'
import {
  SiNextdotjs,
  SiFlutter,
  SiSpringboot,
  SiTypescript,
} from 'react-icons/si'

const VALUE_PROPS = [
  { emoji: '🚀', text: 'Apps performantes' },
  { emoji: '📱', text: 'Web & Mobile' },
  { emoji: '⚡', text: 'Code propre' },
]

const TECH_STACK = [
  { icon: SiNextdotjs, name: 'Next.js', color: 'group-hover:text-black dark:group-hover:text-white' },
  { icon: SiFlutter, name: 'Flutter', color: 'group-hover:text-[#02569B]' },
  { icon: SiSpringboot, name: 'Spring', color: 'group-hover:text-[#6DB33F]' },
  { icon: SiTypescript, name: 'TypeScript', color: 'group-hover:text-[#3178C6]' },
]

const SOCIAL_LINKS = [
  { icon: FaGithub, href: 'https://github.com/minhajshafiq', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/minhajshafiq/', label: 'LinkedIn' },
]

export function Hero() {
  const { isLoading } = useLoader()
  const { t } = useTranslation()
  const photoRef = useRef<HTMLDivElement>(null)

  // GSAP animations
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      // Photo entrance animation
      gsap.fromTo(
        photoRef.current,
        { scale: 0.8, opacity: 0, rotation: -5 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)', delay: 0.3 }
      )
    })

    return () => ctx.revert()
  }, [isLoading])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (isLoading) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-custom-primary">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#8C0605]/10 to-transparent rounded-full blur-3xl" />
      </section>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-custom-primary">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Gradient orbs */}
        <div className="absolute top-20 right-[20%] w-[500px] h-[500px] bg-gradient-to-br from-[#8C0605]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-gradient-to-tr from-[#8C0605]/10 to-transparent rounded-full blur-3xl" />

        {/* Decorative lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" className="text-[#8C0605]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-20">

          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                  {t('hero.available_for_work')}
                </span>
              </div>
            </motion.div>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <span className="text-[#8C0605] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
                {'>'} Hello World_
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-custom-title leading-[1.1] mb-4">
                {t('hero.greeting')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8C0605] to-red-500 dark:from-[#FFD6D6] dark:to-red-300">
                  Minhaj
                </span>
              </h1>
            </motion.div>

            {/* Tagline directe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-2xl md:text-3xl font-bold text-custom-title mb-4">
                {t('hero.tagline')}
              </p>

              {/* Value props */}
              <div className="flex flex-wrap gap-3">
                {VALUE_PROPS.map((prop, index) => (
                  <motion.div
                    key={prop.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700"
                  >
                    <span>{prop.emoji}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{prop.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-custom-secondary max-w-lg mb-8 leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {TECH_STACK.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-default"
                >
                  <tech.icon className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors ${tech.color}`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#projects')}
                className="group flex items-center gap-3 px-8 py-4 bg-[#8C0605] hover:bg-[#8C0605]/90 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <FaPlay className="w-3 h-3" />
                {t('hero.cta_projects')}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact')}
                className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 cursor-pointer"
              >
                {t('hero.cta_contact')}
                <span className="group-hover:rotate-12 transition-transform">👋</span>
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4 mt-8"
            >
              <span className="text-gray-400 text-sm">Me retrouver →</span>
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#8C0605] dark:hover:text-[#FFD6D6] hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  title={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Photo & decorations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Background shapes */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#8C0605]/20 to-transparent rounded-[3rem] blur-2xl" />

              {/* Main photo container */}
              <div
                ref={photoRef}
                className="relative"
              >
                {/* Photo frame */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  {/* Decorative border */}
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#8C0605] via-red-500 to-[#8C0605] rounded-[2rem] opacity-30 blur-sm" />

                  {/* Photo */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                    <Image
                      src="/minhaj.jpg"
                      alt="Minhaj"
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, type: 'spring' }}
                    className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📍</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Paris, France</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: 'spring' }}
                    className="absolute top-1/2 -right-6 bg-gradient-to-br from-[#8C0605] to-red-600 p-3 rounded-xl shadow-xl text-white"
                  >
                    <span className="text-sm font-bold">1 an XP</span>
                  </motion.div>
                </div>
              </div>

              {/* Code snippet decoration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-8 -right-8 hidden lg:block"
              >
                <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs shadow-2xl border border-gray-800 max-w-[200px]">
                  <div className="text-gray-500">{'// passion'}</div>
                  <div className="text-green-400">const</div>
                  <div className="text-white ml-2">
                    mindset = <span className="text-yellow-400">&quot;🔥&quot;</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('#services')}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#8C0605] dark:hover:text-[#FFD6D6] transition-colors cursor-pointer"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-700"
            >
              <FaArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
