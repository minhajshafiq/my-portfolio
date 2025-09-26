'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Linkedin, Mail, Heart, MapPin, Calendar, ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'

const socialLinks = [
  {
    name: 'Malt',
    href: 'https://www.malt.fr/profile/minhajzubair',
    icon: ExternalLink,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/minhajshafiq/',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:minhaj.shafiq@icloud.com',
    icon: Mail,
  },
]

export function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false)

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
    <footer className="bg-custom-primary py-16 relative">
      <div className="container mx-auto px-4">
        {/* Section principale */}
        <div className="flex flex-col items-center mb-12">
          {/* Disponibilité et Contact */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 xl:gap-32 mb-8">
            {/* Disponibilité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-custom-title text-center md:text-left">
                Disponible pour
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-custom-secondary">CDI - Paris/Remote</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-custom-secondary">Freelance - France/Europe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-custom-secondary" />
                  <span className="text-custom-secondary">Paris, France</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-custom-secondary" />
                  <span className="text-custom-secondary">Disponible immédiatement</span>
                </div>
              </div>
            </motion.div>

            {/* Contact rapide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-custom-title text-center md:text-left mb-4">
                Contact rapide
              </h3>
              <div className="space-y-3">
                <a 
                  href="mailto:minhaj.shafiq@icloud.com"
                  className="flex items-center space-x-3 text-custom-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>minhaj.shafiq@icloud.com</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/minhajshafiq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-custom-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://www.malt.fr/profile/minhajzubair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-custom-secondary hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Malt</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-custom-title">Minhaj</span>
              <div className="w-3 h-3 bg-red-600 dark:bg-red-400 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-1 text-sm text-custom-secondary">
              <span>Made with</span>
              <span className="text-red-600 dark:text-red-400">❤️</span>
            </div>
          </motion.div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200 dark:border-gray-700 mb-8"></div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-custom-secondary text-center md:text-left mb-4 md:mb-0"
          >
            <p className="flex items-center gap-2">
              © 2024 Minhaj. Tous droits réservés.
              <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-custom-primary hover:bg-red-50 dark:hover:bg-gray-600 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <link.icon className="w-5 h-5 text-custom-secondary" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bouton Retour en haut */}
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
              className="fixed bottom-8 right-8 z-50 group p-4 bg-[#8C0605] dark:bg-[#FFD6D6] text-white dark:text-gray-900 rounded-full transition-all duration-300 hover:shadow-xl hover:bg-[#8C0605]/90 dark:hover:bg-[#FFD6D6]/90 shadow-lg cursor-pointer"
            >
              <ArrowUp className="w-6 h-6 group-hover:-translate-y-2 transition-all duration-300 ease-out" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}
