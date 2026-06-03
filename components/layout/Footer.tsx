'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { FaLinkedinIn, FaEnvelope, FaGithub } from 'react-icons/fa'
import { SiMalt } from 'react-icons/si'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/minhajshafiq/',
    icon: FaLinkedinIn,
    color: 'hover:bg-[#0A66C2]',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/minhajshafiq',
    icon: FaGithub,
    color: 'hover:bg-gray-700',
  },
  {
    name: 'Malt',
    href: 'https://www.malt.fr/profile/minhajzubair',
    icon: SiMalt,
    color: 'hover:bg-[#FC5757]',
  },
  {
    name: 'Email',
    href: 'mailto:contact@minhajshafiq.com',
    icon: FaEnvelope,
    color: 'hover:bg-[#8C0605]',
  },
]

const quickLinks = [
  { name: 'Accueil', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Projets', href: '#projects' },
  { name: 'À propos', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.querySelector('#contact') as HTMLElement
      if (contactSection) {
        const contactTop = contactSection.offsetTop
        const scrollPosition = window.scrollY + window.innerHeight

        if (scrollPosition >= contactTop + 200) {
          setShowScrollButton(true)
        } else {
          setShowScrollButton(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <footer className="bg-custom-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#8C0605]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8C0605]/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">

        {/* Top section - Big CTA */}
        <div className="py-16 border-b border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-[#8C0605] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
              {'// '}Ready to collaborate?
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-custom-title leading-tight mb-6">
              Let&apos;s build
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8C0605] to-red-500 dark:from-[#FFD6D6] dark:to-red-400">
                something great
              </span>
            </h2>
            <p className="text-custom-secondary text-lg mb-8 max-w-2xl mx-auto">
              Une idée de projet ? Une opportunité ? N&apos;hésitez pas à me contacter.
              Je suis toujours ouvert à discuter de nouveaux projets.
            </p>
            <motion.a
              href="mailto:contact@minhajshafiq.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[#8C0605] hover:bg-[#8C0605]/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
            >
              <FaEnvelope className="w-5 h-5" />
              contact@minhajshafiq.com
            </motion.a>
          </motion.div>
        </div>

        {/* Middle section - Links grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-200 dark:border-gray-700">

          {/* Logo & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-black text-custom-title">Minhaj</span>
              <div className="w-3 h-3 bg-[#8C0605] rounded-full animate-pulse" />
            </div>
            <p className="text-custom-secondary text-sm leading-relaxed mb-6 max-w-sm">
              Développeur Full-Stack passionné par la création d&apos;expériences digitales
              uniques et performantes. Basé à Paris, disponible partout.
            </p>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">Disponible pour nouveaux projets</span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            <h3 className="text-custom-title font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-custom-secondary hover:text-custom-title transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#8C0605] transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4"
          >
            <h3 className="text-custom-title font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-custom-secondary">
                <span className="text-lg">📍</span>
                <span>Paris, France</span>
              </div>
              <div className="flex items-center gap-3 text-custom-secondary">
                <span className="text-lg">💼</span>
                <span>CDI / Freelance / Remote</span>
              </div>
              <div className="flex items-center gap-3 text-custom-secondary">
                <span className="text-lg">⚡</span>
                <span>Réponse sous 24h</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-custom-secondary hover:text-white transition-all duration-300 ${link.color}`}
                  title={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom section - Copyright */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-custom-secondary text-sm"
          >
            © {currentYear} Minhaj Zubair. Tous droits réservés.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-custom-secondary text-sm flex items-center gap-2"
          >
            Fait avec
            <span className="text-[#8C0605] animate-pulse">❤️</span>
            et beaucoup de
            <span className="text-amber-500">☕</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-custom-secondary text-sm"
          >
            <span className="font-mono text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded text-custom-title">
              Next.js
            </span>
            <span className="font-mono text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded text-custom-title">
              Tailwind
            </span>
            <span className="font-mono text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded text-custom-title">
              GSAP
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 group p-4 bg-[#8C0605] dark:bg-[#FFD6D6] text-white dark:text-gray-900 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#8C0605]/25 shadow-lg cursor-pointer"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
