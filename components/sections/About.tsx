'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDownload, FaArrowRight, FaCalendarAlt, FaDocker, FaGitAlt, FaJava } from 'react-icons/fa'
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiSpringboot,
  SiExpo,
  SiPostgresql,
  SiTailwindcss,
  SiNodedotjs,
  SiFigma,
  SiSupabase,
  SiFirebase,
  SiGooglecloud,
} from 'react-icons/si'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'

gsap.registerPlugin(ScrollTrigger)

// Stack technique par catégorie
const TECH_CATEGORIES = [
  {
    name: 'Frontend',
    techs: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind', icon: SiTailwindcss },
    ]
  },
  {
    name: 'Backend & Cloud',
    techs: [
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'Google Cloud', icon: SiGooglecloud },
    ]
  },
  {
    name: 'Mobile & Tools',
    techs: [
      { name: 'React Native', icon: SiExpo },
      { name: 'Docker', icon: FaDocker },
      { name: 'Git', icon: FaGitAlt },
      { name: 'Figma', icon: SiFigma },
    ]
  },
]

export function About() {
  const [activeTab, setActiveTab] = useState<'experience' | 'formation'>('experience')
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  // Animation de la photo au scroll
  useEffect(() => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 80%',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const TIMELINE_DATA = [
    {
      year: 'Mars 2025',
      title: t('about.timeline.experiences.freelance.degree'),
      company: t('about.timeline.experiences.freelance.school'),
      type: 'experience' as const,
      bullets: [
        t('about.timeline.experiences.freelance.bullet1'),
        t('about.timeline.experiences.freelance.bullet2'),
        t('about.timeline.experiences.freelance.bullet3'),
      ],
    },
    {
      year: 'Nov 2024 - Fév 2025',
      title: t('about.timeline.experiences.ukenoon.degree'),
      company: t('about.timeline.experiences.ukenoon.school'),
      type: 'experience' as const,
      bullets: [
        t('about.timeline.experiences.ukenoon.bullet1'),
        t('about.timeline.experiences.ukenoon.bullet2'),
        t('about.timeline.experiences.ukenoon.bullet3'),
      ],
    },
    {
      year: '2024 - 2025',
      title: t('about.timeline.formations.doranco.degree'),
      company: t('about.timeline.formations.doranco.school'),
      type: 'formation' as const,
      bullets: [
        t('about.timeline.formations.doranco.bullet1'),
        t('about.timeline.formations.doranco.bullet2'),
        t('about.timeline.formations.doranco.bullet3'),
      ],
    },
    {
      year: '2022 - 2023',
      title: t('about.timeline.formations.openclassrooms.degree'),
      company: t('about.timeline.formations.openclassrooms.school'),
      type: 'formation' as const,
      bullets: [
        t('about.timeline.formations.openclassrooms.bullet1'),
        t('about.timeline.formations.openclassrooms.bullet2'),
        t('about.timeline.formations.openclassrooms.bullet3'),
      ],
    },
  ]

  const filteredTimeline = TIMELINE_DATA.filter((item) => item.type === activeTab)

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-custom-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header style signature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[#8C0605] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
              {'< '}{t('about.title')}{' />'}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-custom-title leading-none">
              {t('about.subtitle')}
            </h2>
          </motion.div>

          {/* Grille principale */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">

            {/* Grande carte photo + intro */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-5 row-span-2"
            >
              <div
                ref={photoRef}
                className="relative h-full min-h-[500px] rounded-3xl overflow-hidden group"
              >
                {/* Photo de fond */}
                <Image
                  src="/minhaj.jpg"
                  alt="Minhaj Zubair - Développeur Full-Stack basé à Paris"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Contenu */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">
                      {t('contact.available_immediately')}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Minhaj Zubair
                  </h3>
                  <p className="text-white/70 text-lg mb-4">
                    Full-Stack Developer
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'Spring Boot', 'React Native'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badge coin */}
                <div className="absolute top-6 right-6 bg-[#8C0605] text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-3 shadow-lg">
                  Paris, FR 🇫🇷
                </div>
              </div>
            </motion.div>

            {/* Bio personnelle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-7"
            >
              <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-lg h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('about.profile.title')}
                </h3>

                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>{t('about.profile.paragraph1')}</p>
                  <p>{t('about.profile.paragraph2')}</p>
                  <p>{t('about.profile.paragraph3')}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-[#8C0605] dark:text-[#FFD6D6] font-medium">
                    {t('about.profile.paragraph4')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack - Aligné avec la bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-7"
            >
              <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-lg h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Stack technique
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TECH_CATEGORIES.map((category) => (
                    <div key={category.name}>
                      <span className="text-xs font-mono text-[#8C0605] dark:text-[#FFD6D6] uppercase tracking-wider mb-3 block">
                        {category.name}
                      </span>
                      <div className="space-y-2">
                        {category.techs.map((tech) => (
                          <div
                            key={tech.name}
                            className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-[#8C0605] dark:hover:text-[#FFD6D6] transition-colors"
                          >
                            <tech.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-5"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FaCalendarAlt className="text-[#8C0605] dark:text-[#FFD6D6]" />
                    {t('about.timeline.title')}
                  </h3>

                  {/* Toggle */}
                  <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                    <button
                      onClick={() => setActiveTab('experience')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'experience'
                          ? 'bg-[#8C0605] text-white dark:bg-[#FFD6D6] dark:text-gray-900'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      💼 XP
                    </button>
                    <button
                      onClick={() => setActiveTab('formation')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'formation'
                          ? 'bg-[#8C0605] text-white dark:bg-[#FFD6D6] dark:text-gray-900'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      🎓 Edu
                    </button>
                  </div>
                </div>

                {/* Timeline items */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {filteredTimeline.map((item, index) => (
                      <motion.div
                        key={`${item.year}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700"
                      >
                        {/* Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#8C0605] dark:bg-[#FFD6D6] border-2 border-white dark:border-gray-800" />

                        <span className="text-xs font-mono text-[#8C0605] dark:text-[#FFD6D6] bg-[#8C0605]/10 dark:bg-[#FFD6D6]/10 px-2 py-0.5 rounded">
                          {item.year}
                        </span>
                        <h4 className="font-bold text-gray-900 dark:text-white mt-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {item.company}
                        </p>
                        <ul className="space-y-1">
                          {item.bullets.map((bullet, i) => (
                            <li
                              key={i}
                              className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2"
                            >
                              <span className="text-[#8C0605] dark:text-[#FFD6D6] mt-0.5">→</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* CTA Cards - empilées à côté de la Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-7"
            >
              <div className="flex flex-col gap-4 h-full">
                {/* CV Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl flex-1 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-gray-400 text-sm uppercase tracking-wider">PDF</span>
                    <h3 className="text-xl font-bold text-white mt-2">{t('about.cv.title')}</h3>
                    <p className="text-gray-400 text-sm mt-2">{t('about.cv.description')}</p>
                  </div>
                  <button
                    onClick={() => window.open('/cv-minhaj_zubair.pdf', '_blank')}
                    className="relative z-10 mt-4 inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors w-fit"
                  >
                    <FaDownload className="w-4 h-4" />
                    {t('about.cv.button')}
                  </button>
                </div>

                {/* Let's Talk Card */}
                <div className="bg-[#8C0605] dark:bg-[#FFD6D6] p-6 rounded-3xl flex-1 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 dark:bg-gray-900/10 rounded-full" />
                  <div className="relative z-10">
                    <span className="text-white/70 dark:text-gray-900/70 text-sm uppercase tracking-wider">
                      Let&apos;s talk
                    </span>
                    <h3 className="text-xl font-bold text-white dark:text-gray-900 mt-2">
                      {t('about.collaboration.title')}
                    </h3>
                    <p className="text-white/80 dark:text-gray-900/80 text-sm mt-2">
                      {t('about.collaboration.description')}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="relative z-10 mt-4 inline-flex items-center gap-2 bg-white dark:bg-gray-900 text-[#8C0605] dark:text-[#FFD6D6] px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg transition-shadow w-fit group"
                  >
                    {t('about.collaboration.button')}
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
