'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiSpringboot,
  SiFlutter,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiSupabase,
  SiFirebase,
  SiGooglecloud,
} from 'react-icons/si'
import { FaCode, FaServer, FaMobile, FaSearch } from 'react-icons/fa'

const mainServices = [
  {
    icon: FaCode,
    title: 'Frontend',
    description: 'Interfaces modernes et réactives avec React et Next.js',
    techs: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'SEO', icon: FaSearch },
    ],
  },
  {
    icon: FaServer,
    title: 'Backend & Cloud',
    description: 'APIs robustes et services cloud avec Spring Boot, Supabase et Firebase',
    techs: [
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'Google Cloud', icon: SiGooglecloud },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Docker', icon: SiDocker },
    ],
  },
  {
    icon: FaMobile,
    title: 'Mobile',
    description: 'Applications cross-platform avec Flutter et Supabase',
    techs: [
      { name: 'Flutter', icon: SiFlutter },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
]

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="py-20 bg-custom-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[#8C0605] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
              {'{ '}{t('services.title')}{' }'}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-custom-title leading-none">
              Ce que je fais
            </h2>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-full border border-gray-200 dark:border-gray-700 hover:border-[#8C0605] dark:hover:border-[#FFD6D6] transition-colors">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#8C0605] dark:bg-[#FFD6D6] flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white dark:text-gray-900" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {service.description}
                  </p>

                  {/* Techs */}
                  <div className="flex flex-wrap gap-2">
                    {service.techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg"
                      >
                        <tech.icon className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* What I can do for you */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left - Pour les entreprises */}
            <div className="bg-gray-900 dark:bg-black rounded-2xl p-8">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                CDI / Alternance
              </span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">
                Pour les entreprises
              </h3>
              <ul className="space-y-3">
                {[
                  'Intégration dans une équipe de développement',
                  'Développement de nouvelles fonctionnalités',
                  'Maintenance et amélioration de l\'existant',
                  'Collaboration en méthode Agile',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                    <span className="text-[#8C0605] dark:text-[#FFD6D6] mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Freelance */}
            <div className="bg-[#8C0605] dark:bg-[#FFD6D6] rounded-2xl p-8">
              <span className="text-xs font-mono text-white/60 dark:text-gray-900/60 uppercase tracking-wider">
                Freelance
              </span>
              <h3 className="text-2xl font-bold text-white dark:text-gray-900 mt-2 mb-4">
                Pour vos projets
              </h3>
              <ul className="space-y-3">
                {[
                  'Création de sites web sur mesure',
                  'Développement d\'applications mobiles',
                  'Refonte et optimisation de sites existants',
                  'Accompagnement technique',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90 dark:text-gray-900/90 text-sm">
                    <span className="text-white/60 dark:text-gray-900/60 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-block mt-6 px-5 py-2.5 bg-white dark:bg-gray-900 text-[#8C0605] dark:text-[#FFD6D6] font-semibold rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Discuter de votre projet →
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
