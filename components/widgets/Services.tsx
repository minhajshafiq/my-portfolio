'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  Database, 
  Smartphone, 
  Cloud, 
  Users, 
  MessageSquare, 
  Lightbulb, 
  TrendingUp,
  Settings,
  Zap,
  Briefcase,
  Globe
} from 'lucide-react'
import { gsap } from 'gsap'
import { useTranslation } from '@/hooks/useTranslation'

type ServiceMode = 'cdi' | 'freelance'

export function Services() {
  const [mode, setMode] = useState<ServiceMode>('cdi')
  const switchRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const cdiSkills = [
    { 
      icon: Code, 
      title: t('services.skills.web_apps.title'), 
      description: t('services.skills.web_apps.description') 
    },
    { 
      icon: Database, 
      title: t('services.skills.apis.title'), 
      description: t('services.skills.apis.description') 
    },
    { 
      icon: Smartphone, 
      title: t('services.skills.mobile_apps.title'), 
      description: t('services.skills.mobile_apps.description') 
    },
    { 
      icon: Cloud, 
      title: t('services.skills.cloud_infrastructure.title'), 
      description: t('services.skills.cloud_infrastructure.description') 
    },
    { 
      icon: Database, 
      title: t('services.skills.databases.title'), 
      description: t('services.skills.databases.description') 
    },
    { 
      icon: Users, 
      title: t('services.skills.agile_collaboration.title'), 
      description: t('services.skills.agile_collaboration.description') 
    },
    { 
      icon: MessageSquare, 
      title: t('services.skills.communication.title'), 
      description: t('services.skills.communication.description') 
    },
    { 
      icon: Lightbulb, 
      title: t('services.skills.innovative_solutions.title'), 
      description: t('services.skills.innovative_solutions.description') 
    },
    { 
      icon: TrendingUp, 
      title: t('services.skills.tech_watch.title'), 
      description: t('services.skills.tech_watch.description') 
    },
    { 
      icon: Briefcase, 
      title: t('services.skills.testing_quality.title'), 
      description: t('services.skills.testing_quality.description') 
    },
  ]

  const freelanceServices = [
    { 
      icon: Code, 
      title: t('services.freelance_services.web_sites.title'), 
      description: t('services.freelance_services.web_sites.description'),
      benefits: ['Next.js 15 + React', 'TypeScript', 'Integrated SEO'],
      pricing: t('services.freelance_services.web_sites.pricing')
    },
    { 
      icon: Smartphone, 
      title: t('services.freelance_services.mobile_applications.title'), 
      description: t('services.freelance_services.mobile_applications.description'),
      benefits: ['Flutter + Dart', 'React Native/Expo', 'Cross-platform'],
      pricing: t('services.freelance_services.mobile_applications.pricing')
    },
    { 
      icon: Settings, 
      title: t('services.freelance_services.proactive_maintenance.title'), 
      description: t('services.freelance_services.proactive_maintenance.description'),
      benefits: ['Firebase + Supabase', '24/7 Monitoring', 'Automatic backup'],
      pricing: t('services.freelance_services.proactive_maintenance.pricing')
    },
    { 
      icon: Zap, 
      title: t('services.freelance_services.performance_optimization.title'), 
      description: t('services.freelance_services.performance_optimization.description'),
      benefits: ['Next.js optimization', 'Redis cache', 'Global CDN'],
      pricing: t('services.freelance_services.performance_optimization.pricing')
    },
    { 
      icon: Globe, 
      title: t('services.freelance_services.secure_deployment.title'), 
      description: t('services.freelance_services.secure_deployment.description'),
      benefits: ['Docker + CI/CD', 'Clerk authentication', 'JWT security'],
      pricing: t('services.freelance_services.secure_deployment.pricing')
    },
  ]

  useEffect(() => {
    const slider = sliderRef.current
    const container = switchRef.current
    const buttons = container?.querySelectorAll('button')
    
    if (slider && container && buttons) {
      const activeButton = mode === 'freelance' ? buttons[1] : buttons[0]
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      

      gsap.to(slider, {
        x: buttonRect.left - containerRect.left + 2,
        width: buttonRect.width - 4,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [mode])


  useEffect(() => {
    const slider = sliderRef.current
    const container = switchRef.current
    const buttons = container?.querySelectorAll('button')
    
    if (slider && container && buttons) {
      const activeButton = mode === 'freelance' ? buttons[1] : buttons[0]
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      

      gsap.set(slider, {
        x: buttonRect.left - containerRect.left + 2,
        width: buttonRect.width - 4
      })
    }
  }, [mode])

  return (
    <section id="services" className="py-20 bg-custom-primary">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-custom-title mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-custom-secondary max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Basculement de mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div 
            ref={switchRef}
            className="relative bg-white dark:bg-gray-900 rounded-full p-1 pr-3 shadow-xl border border-gray-200 dark:border-gray-600 hover:shadow-2xl transition-all duration-300"
          >
            <div 
              ref={sliderRef}
              className="absolute top-1.5 left-0.5 h-9 bg-gradient-to-r from-[#8C0605] to-[#8C0605]/90 dark:from-[#FFD6D6] dark:to-[#FFD6D6]/90 rounded-full shadow-lg transition-all duration-300"
            />
            <div className="flex relative z-10">
              <motion.button
                onClick={() => setMode('cdi')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-3 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                  mode === 'cdi' 
                    ? 'text-white dark:text-gray-900' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('services.switch_cdi')}
              </motion.button>
              <motion.button
                onClick={() => setMode('freelance')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-3 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                  mode === 'freelance' 
                    ? 'text-white dark:text-gray-900' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('services.switch_freelance')}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Contenu */}
        <AnimatePresence mode="wait">
          {mode === 'cdi' ? (
            <motion.div
              key="cdi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-12 gap-4 max-w-7xl mx-auto"
            >
              {cdiSkills.map((skill, index) => {
                const getCardSize = (index: number) => {
                  if (index === 0) return 'col-span-12 lg:col-span-6'
                  if (index === 1) return 'col-span-12 lg:col-span-6'
                  if (index === 2) return 'col-span-12 md:col-span-6 lg:col-span-4'
                  if (index === 3) return 'col-span-12 md:col-span-6 lg:col-span-4'
                  if (index === 4) return 'col-span-12 md:col-span-6 lg:col-span-4'
                  if (index === 5) return 'col-span-12 md:col-span-6 lg:col-span-6'
                  if (index === 6) return 'col-span-12 md:col-span-6 lg:col-span-6'
                  if (index === 7) return 'col-span-12 md:col-span-6 lg:col-span-4'
                  if (index === 8) return 'col-span-12 md:col-span-6 lg:col-span-4'
                  if (index === 9) return 'col-span-12 lg:col-span-4'
                  return 'col-span-12 md:col-span-6 lg:col-span-4'
                }

                return (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`${getCardSize(index)} bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700`}
                  >
                    <skill.icon className="w-8 h-8 text-[#8C0605] dark:text-[#FFD6D6] mb-4" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {skill.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {skill.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="freelance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-12 gap-4 max-w-7xl mx-auto"
            >
              {freelanceServices.map((service, index) => {
                const getCardSize = (index: number) => {
                  if (index === 0) return 'col-span-12 lg:col-span-8'
                  if (index === 1) return 'col-span-12 lg:col-span-4'
                  if (index === 2) return 'col-span-12 md:col-span-6 lg:col-span-6'
                  if (index === 3) return 'col-span-12 md:col-span-6 lg:col-span-6'
                  if (index === 4) return 'col-span-12 lg:col-span-12'
                  return 'col-span-12 md:col-span-6 lg:col-span-4'
                }

                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`${getCardSize(index)} bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700`}
                  >
                    <service.icon className="w-10 h-10 text-[#8C0605] dark:text-[#FFD6D6] mb-4" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                      {service.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Tarif:</span> {service.pricing}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
