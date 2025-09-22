'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { 
  ExternalLink, 
  Github, 
  ArrowRight, 
  DollarSign, 
  ShoppingBag, 
  Zap,
  Shield,
  Layers,
  Settings
} from 'lucide-react'
import { 
  SiFlutter, 
  SiNextdotjs, 
  SiSpringboot, 
  SiPostgresql, 
  SiFirebase, 
  SiClerk, 
  SiTailwindcss, 
  SiTypescript, 
  SiNodedotjs, 
  SiDocker, 
  SiRedis, 
  SiPrometheus, 
  SiFramer, 
  SiMaterialdesign
} from 'react-icons/si'
import { RiSupabaseFill } from 'react-icons/ri'
import Image from 'next/image'

// Mapping des technologies vers leurs icônes
const technologyIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'Flutter': SiFlutter,
  'Next.js': SiNextdotjs,
  'Spring Boot': SiSpringboot,
  'PostgreSQL': SiPostgresql,
  'Firebase': SiFirebase,
  'Clerk': SiClerk,
  'Tailwind CSS': SiTailwindcss,
  'TypeScript': SiTypescript,
  'Node.js': SiNodedotjs,
  'Docker': SiDocker,
  'Redis': SiRedis,
  'JWT': Shield,
  'Prometheus': SiPrometheus,
  'GSAP': Zap,
  'Framer Motion': SiFramer,
  'Clean Architecture': Layers,
  'Riverpod': Settings,
  'Material Design 3': SiMaterialdesign,
  'Supabase': RiSupabaseFill,
  'Flutter Secure Storage': Shield
}

export function Projects() {
  const { t } = useTranslation()

  const projects = [
    {
      id: 1,
      key: 'pocketly',
      title: t('projects.pocketly.title'),
      description: t('projects.pocketly.description'),
      image: '/pocketly.jpg',
      imageMobile: '/pocketly.jpg',
      technologies: ['Flutter', 'Clean Architecture', 'Riverpod', 'Material Design 3', 'Supabase', 'Flutter Secure Storage'],
      results: [t('projects.pocketly.results.interface'), t('projects.pocketly.results.pockets'), t('projects.pocketly.results.statistics')],
      github: 'https://github.com/minhajshafiq/Budgeting-app',
      demo: 'https://pocketly-web-blush.vercel.app/',
      category: t('projects.pocketly.category'),
      icon: DollarSign
    },
    {
      id: 2,
      key: 'mets_merveilles',
      title: t('projects.mets_merveilles.title'),
      description: t('projects.mets_merveilles.description'),
      image: '/metsmerveilles-mobile.png',
      imageMobile: '/metsmerveilles.webp',
      technologies: ['Next.js', 'Spring Boot', 'PostgreSQL', 'Firebase', 'Clerk', 'Tailwind CSS', 'TypeScript'],
      results: [t('projects.mets_merveilles.results.interface'), t('projects.mets_merveilles.results.recipes'), t('projects.mets_merveilles.results.search')],
      github: 'https://github.com/minhajshafiq/mets-merveilles',
      demo: 'https://front-mets-merveilles.vercel.app/',
      category: t('projects.mets_merveilles.category'),
      icon: ShoppingBag
    },
    {
      id: 3,
      key: 'portfolio',
      title: t('projects.portfolio.title'),
      description: t('projects.portfolio.description'),
      image: '/portfolio.png',
      technologies: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
      results: [t('projects.portfolio.results.performance'), t('projects.portfolio.results.animations'), t('projects.portfolio.results.seo')],
      github: 'https://github.com/minhajshafiq/my-portfolio',
      demo: 'https://www.minhajshafiq.com/',
      category: t('projects.portfolio.category'),
      icon: Zap
    },
    {
      id: 4,
      key: 'wuthering_waves',
      title: t('projects.wuthering_waves.title'),
      description: t('projects.wuthering_waves.description'),
      image: '/wuwa.png',
      technologies: ['Next.js', 'GSAP', 'Tailwind CSS', 'TypeScript'],
      results: [t('projects.wuthering_waves.results.animations'), t('projects.wuthering_waves.results.design'), t('projects.wuthering_waves.results.responsive')],
      github: 'https://github.com/minhajshafiq/wuthering-waves-project',
      demo: 'https://wuwa-delta.vercel.app',
      category: t('projects.wuthering_waves.category'),
      icon: Zap
    }
  ]

  return (
    <section 
      id="projects" 
      className="section bg-custom-primary"
      style={{ 
        paddingTop: '80px', /* Espace pour la navbar */
        minHeight: '100vh'
      }}
    >
      <div className="container">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-custom-title mb-4">
            Ce que j&apos;ai réalisé
          </h2>
          <p className="text-xl text-custom-secondary max-w-2xl mx-auto">
            Une sélection de projets concrets, développés avec soin et impact.
          </p>
        </motion.div>

        {/* Conteneur des cartes */}
        <ul id="cards">
          {projects.map((project, index) => (
            <li key={project.id} id={`card${index + 1}`} className="card">
              <div className="card-body">
                <div className="flex flex-col lg:flex-row h-full w-full">
                  {/* Image du projet */}
                  <div className={`lg:w-2/5 relative h-40 lg:h-full overflow-hidden group hidden lg:block ${
                    project.key === 'mets_merveilles' || project.key === 'pocketly' ? 'rounded-2xl' : ''
                  }`}>
                    {project.image && project.image !== '/api/placeholder/600/400' ? (
                      <>

                        <Image 
                          src={project.image} 
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                      </>
                    ) : (
                                              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-105 ${
                          project.key === 'mets_merveilles' || project.key === 'pocketly'
                            ? 'bg-gradient-to-br from-gray-400/20 to-gray-500/10'
                            : 'bg-gradient-to-br from-[#8C0605]/20 to-[#8C0605]/10 dark:from-[#FFD6D6]/20 dark:to-[#FFD6D6]/10'
                        }`}>
                          <project.icon className={`w-16 h-16 transition-all duration-500 group-hover:scale-110 ${
                            project.key === 'mets_merveilles' || project.key === 'pocketly'
                              ? 'text-white'
                              : 'text-[#8C0605] dark:text-[#FFD6D6]'
                          }`} />
                      </div>
                    )}
                                          <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium z-10 ${
                        project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                          ? 'bg-red-600/80 text-white'
                          : 'bg-white/20 dark:bg-gray-900/20 text-custom-title dark:text-white'
                      }`}>
                        {project.category}
                      </div>
                  </div>

                  {/* Contenu du projet */}
                  <div className={`w-full lg:w-3/5 p-4 sm:p-6 lg:p-8 flex flex-col justify-center relative z-10 ${
                    project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                      ? 'text-white'
                      : ''
                  }`}>
                    <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 ${
                      project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                        ? 'text-white'
                        : 'text-custom-title dark:text-white'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed ${
                      project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                        ? 'text-white/90'
                        : 'text-custom-secondary dark:text-gray-300'
                    }`}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className={`font-semibold mb-2 sm:mb-3 text-base sm:text-lg ${
                        project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                          ? 'text-white'
                          : 'text-custom-title dark:text-white'
                      }`}>
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {project.technologies.map((tech) => {
                          const IconComponent = technologyIcons[tech];
                          return (
                            <div
                              key={tech}
                              className={`flex items-center gap-1 px-2 sm:px-3 py-1 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border ${
                                project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                                  ? 'bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors'
                                  : 'bg-[#8C0605]/10 dark:bg-[#FFD6D6]/10 text-[#8C0605] dark:text-[#FFD6D6] border-[#8C0605]/20 dark:border-[#FFD6D6]/20'
                              }`}
                              title={tech}
                            >
                              {IconComponent ? (
                                <>
                                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">{tech}</span>
                                </>
                              ) : (
                                <span>{tech}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Résultats */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className={`font-semibold mb-2 sm:mb-3 text-base sm:text-lg ${
                        project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                          ? 'text-white'
                          : 'text-custom-title dark:text-white'
                      }`}>
                        Résultats
                      </h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {project.results.map((result, resultIndex) => (
                          <li key={resultIndex} className={`flex items-center text-sm sm:text-base ${
                            project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                              ? 'text-white/90'
                              : 'text-custom-secondary dark:text-gray-300'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 sm:mr-3 ${
                              project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                                ? 'bg-white'
                                : 'bg-[#8C0605] dark:bg-[#FFD6D6]'
                            }`} />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Liens du projet */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm rounded-full transition-colors border font-medium text-sm sm:text-base ${
                          project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                            ? 'bg-white/10 text-white hover:bg-white/20 border-white/30'
                            : 'bg-[#8C0605]/10 dark:bg-[#FFD6D6]/10 text-[#8C0605] dark:text-[#FFD6D6] hover:bg-[#8C0605]/20 dark:hover:bg-[#FFD6D6]/20 border-[#8C0605]/20 dark:border-[#FFD6D6]/20'
                        }`}
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors font-medium shadow-lg text-sm sm:text-base ${
                          project.key === 'mets_merveilles' || project.key === 'pocketly' || project.key === 'portfolio' || project.key === 'wuthering_waves'
                            ? 'bg-white text-gray-900 hover:bg-gray-100'
                            : 'bg-[#8C0605] dark:bg-[#FFD6D6] text-white dark:text-gray-900 hover:bg-[#8C0605]/90 dark:hover:bg-[#FFD6D6]/90'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Démo
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Appel à l'action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://github.com/minhajshafiq', '_blank')}
            className="flex items-center gap-2 bg-[#8C0605] dark:bg-[#FFD6D6] text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-[#8C0605]/90 dark:hover:bg-[#FFD6D6]/90 transition-colors mx-auto shadow-lg hover:shadow-xl cursor-pointer"
          >
            Voir plus de projets
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
