'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import Image from 'next/image'
import { LuxaShowcaseCard } from './LuxaShowcaseCard'
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowRight,
  FaMobileAlt,
  FaUtensils,
  FaLaptopCode,
  FaLeaf,
} from 'react-icons/fa'
import {
  SiExpo,
  SiNextdotjs,
  SiSpringboot,
  SiPostgresql,
  SiFirebase,
  SiClerk,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiSupabase,
  SiSanity,
} from 'react-icons/si'

const technologyIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'React Native': SiExpo,
  'Next.js': SiNextdotjs,
  'Spring Boot': SiSpringboot,
  'PostgreSQL': SiPostgresql,
  'Firebase': SiFirebase,
  'Clerk': SiClerk,
  'Tailwind CSS': SiTailwindcss,
  'TypeScript': SiTypescript,
  'Framer Motion': SiFramer,
  'Supabase': SiSupabase,
  'GSAP': () => <span className="text-xs font-bold">GS</span>,
  'Sanity': SiSanity,
}

export function Projects() {
  const { t } = useTranslation()
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      key: 'luxa',
      title: t('projects.luxa.title'),
      description: t('projects.luxa.description'),
      image: '/luxa.jpg',
      technologies: ['React Native', 'Supabase', 'TypeScript'],
      results: [
        t('projects.luxa.results.interface'),
        t('projects.luxa.results.pockets'),
        t('projects.luxa.results.statistics'),
      ],
      github: null,
      demo: 'https://pocketly-web-blush.vercel.app/',
      category: t('projects.luxa.category'),
      icon: FaMobileAlt,
      color: 'from-emerald-500 to-teal-600',
      featured: true,
    },
    {
      id: 2,
      key: 'mets_merveilles',
      title: t('projects.mets_merveilles.title'),
      description: t('projects.mets_merveilles.description'),
      image: '/metsmerveilles.webp',
      technologies: ['Next.js', 'Spring Boot', 'PostgreSQL', 'Firebase', 'Clerk'],
      results: [
        t('projects.mets_merveilles.results.interface'),
        t('projects.mets_merveilles.results.recipes'),
        t('projects.mets_merveilles.results.search'),
      ],
      github: 'https://github.com/minhajshafiq/mets-merveilles',
      demo: 'https://front-mets-merveilles.vercel.app/',
      category: t('projects.mets_merveilles.category'),
      icon: FaUtensils,
      color: 'from-orange-500 to-red-600',
    },
    {
      id: 3,
      key: 'portfolio',
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.description'),
      image: '/portfolio.png',
      technologies: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
      results: [
        t('projects.portfolio.results.performance'),
        t('projects.portfolio.results.animations'),
        t('projects.portfolio.results.seo'),
      ],
      github: 'https://github.com/minhajshafiq/my-portfolio',
      demo: 'https://www.minhajshafiq.com/',
      category: t('projects.portfolio.category'),
      icon: FaLaptopCode,
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 4,
      key: 'unityvert',
      title: t('projects.unityvert.title'),
      description: t('projects.unityvert.description'),
      image: '/photos/unityvert.jpg',
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Sanity'],
      results: [
        t('projects.unityvert.results.presence'),
        t('projects.unityvert.results.design'),
        t('projects.unityvert.results.contact'),
      ],
      github: null,
      demo: 'https://unityvert.fr/',
      category: t('projects.unityvert.category'),
      icon: FaLeaf,
      color: 'from-green-600 to-emerald-700',
    },
  ]

  const featuredProject = projects.find((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20 bg-custom-primary overflow-hidden">
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
              {'<'} {t('projects.title')} {'/>'}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-custom-title leading-none mb-6">
              {t('projects.subtitle')}
            </h2>
            <p className="text-lg text-custom-secondary max-w-2xl">
              {t('projects.intro')}
            </p>
          </motion.div>

          {/* Featured Project */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                    {/* Badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-[#8C0605] text-white text-xs font-bold rounded-full uppercase">
                        {t('projects.featured_badge')}
                      </span>
                      <span className="text-gray-400 text-sm">{featuredProject.category}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                      {featuredProject.title}
                    </h3>

                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {featuredProject.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject.technologies.map((tech) => {
                        const IconComponent = technologyIcons[tech]
                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-white text-sm"
                          >
                            {IconComponent && <IconComponent className="w-4 h-4" />}
                            {tech}
                          </span>
                        )
                      })}
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                      <h4 className="text-white font-semibold mb-3">{t('projects.key_results')}</h4>
                      <ul className="space-y-2">
                        {featuredProject.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="text-[#8C0605] mt-1">→</span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <motion.a
                        href={featuredProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#8C0605] text-white font-semibold rounded-full hover:bg-[#8C0605]/90 transition-colors"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        {t('projects.view_project')}
                      </motion.a>
                      {featuredProject.github && (
                        <motion.a
                          href={featuredProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors"
                        >
                          <FaGithub className="w-4 h-4" />
                          {t('projects.source_code')}
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Image/Showcase */}
                  <div className="relative order-1 lg:order-2 overflow-hidden w-full h-full min-h-[420px] lg:min-h-full">
                    {featuredProject.key === 'luxa' ? (
                      <LuxaShowcaseCard demoUrl={featuredProject.demo} />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-gray-900 via-transparent to-transparent z-10" />
                        <Image
                          src={featuredProject.image}
                          alt={String(featuredProject.title)}
                          fill
                          sizes="(min-width: 1024px) 576px, 100vw"
                          className="object-cover"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={String(project.title)}
                      fill
                      sizes="(min-width: 768px) 564px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover overlay with links */}
                    <AnimatePresence>
                      {hoveredProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                        >
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              whileHover={{ scale: 1.1 }}
                              className="p-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                              <FaGithub className="w-5 h-5" />
                            </motion.a>
                          )}
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ delay: 0.05 }}
                            whileHover={{ scale: 1.1 }}
                            className="p-3 bg-[#8C0605] rounded-full text-white hover:bg-[#8C0605]/90 transition-colors"
                          >
                            <FaExternalLinkAlt className="w-5 h-5" />
                          </motion.a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => {
                        const IconComponent = technologyIcons[tech]
                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 text-xs"
                          >
                            {IconComponent && <IconComponent className="w-3 h-3" />}
                            {tech}
                          </span>
                        )
                      })}
                      {project.technologies.length > 4 && (
                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Results preview */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <ul className="space-y-1">
                        {project.results.slice(0, 2).map((result, i) => (
                          <li
                            key={i}
                            className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#8C0605] dark:bg-[#FFD6D6]" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-left">
                <p className="text-gray-900 dark:text-white font-semibold">
                  {t('projects.see_more_title')}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t('projects.see_more_subtitle')}
                </p>
              </div>
              <motion.a
                href="https://github.com/minhajshafiq"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                <FaGithub className="w-5 h-5" />
                {t('projects.my_github')}
                <FaArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
