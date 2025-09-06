'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaCode, FaBriefcase, FaGraduationCap, FaDownload, FaArrowRight, FaUsers, FaComments, FaLightbulb } from 'react-icons/fa'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'

gsap.registerPlugin(ScrollTrigger)

// Types
interface Formation {
  year: string
  degree: string
  school: string
  type?: "formation" | "experience"
  description?: string
}

interface CareerInfo {
  formations: Formation[]
}

  // Données
export function About() {
  const [activeTab, setActiveTab] = useState<"formation" | "experience">("experience")
  const { t } = useTranslation()

  const STRENGTHS_DATA = [
    {
      icon: FaCode,
      title: t('about.skills.fullstack.title'),
      description: t('about.skills.fullstack.description')
    },
    {
      icon: FaBriefcase,
      title: t('about.skills.mobile.title'),
      description: t('about.skills.mobile.description')
    },
    {
      icon: FaGraduationCap,
      title: t('about.skills.learning.title'),
      description: t('about.skills.learning.description')
    },
    {
      icon: FaUsers,
      title: t('about.skills.teamwork.title'),
      description: t('about.skills.teamwork.description')
    },
    {
      icon: FaComments,
      title: t('about.skills.communication.title'),
      description: t('about.skills.communication.description')
    },
    {
      icon: FaLightbulb,
      title: t('about.skills.problem_solving.title'),
      description: t('about.skills.problem_solving.description')
    },
  ]

  const CAREER_DATA: CareerInfo[] = [
    {
      formations: [
        {
          year: "2017-2019",
          degree: t('about.timeline.formations.stti2d.degree'),
          school: t('about.timeline.formations.stti2d.school'),
          type: "formation",
          description: t('about.timeline.formations.stti2d.description')
        },
        {
          year: "2022-2023",
          degree: t('about.timeline.formations.openclassrooms.degree'),
          school: t('about.timeline.formations.openclassrooms.school'),
          type: "formation",
          description: t('about.timeline.formations.openclassrooms.description')
        },
        {
          year: "2024-2025",
          degree: t('about.timeline.formations.doranco.degree'),
          school: t('about.timeline.formations.doranco.school'),
          type: "formation",
          description: t('about.timeline.formations.doranco.description')
        },
        {
          year: "Mars 2025",
          degree: t('about.timeline.experiences.freelance.degree'),
          school: t('about.timeline.experiences.freelance.school'),
          type: "experience",
          description: t('about.timeline.experiences.freelance.description')
        },
        {
          year: "Nov 2024 - Fév 2025",
          degree: t('about.timeline.experiences.ukenoon.degree'),
          school: t('about.timeline.experiences.ukenoon.school'),
          type: "experience",
          description: t('about.timeline.experiences.ukenoon.description')
        },
      ],
    },
  ]





// Hook pour les animations GSAP
function useGSAPAnimation() {
  const createScrollAnimation = (element: HTMLElement | null, animation: { from: Record<string, unknown>, to: Record<string, unknown> }) => {
    if (element && element.dataset.animated !== 'true') {
      gsap.fromTo(element, animation.from, {
        ...animation.to,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        },
        onComplete: () => {
          if (element) {
            element.dataset.animated = 'true'
          }
        }
      })
    }
  }

  return { createScrollAnimation }
}

// Fonction pour obtenir l'année la plus récente
function getLatestYear(yearString: string): number {
  const years = yearString.match(/\d{4}/g)
  if (years) {
    return Math.max(...years.map(Number))
  }
  return 0
}



  // Références
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const strengthsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const tabIndicatorRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const { createScrollAnimation } = useGSAPAnimation()

  // Animations GSAP simplifiées
  useEffect(() => {
    // Animation simple du header
    createScrollAnimation(headerRef.current, {
      from: { opacity: 0, y: 30 },
      to: { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    })

    // Animation simple de la photo
    createScrollAnimation(photoRef.current, {
      from: { opacity: 0, scale: 0.9 },
      to: { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    })

    // Animation simple du contenu principal
    createScrollAnimation(descriptionRef.current, {
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [createScrollAnimation])


  useEffect(() => {
    if (tabIndicatorRef.current) {
      gsap.to(tabIndicatorRef.current, {
        left: activeTab === 'experience' ? '2px' : 'calc(50% + 2px)',
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }, [activeTab])


  const filteredFormations = CAREER_DATA[0].formations
    .filter(formation => formation.type === activeTab)
    .sort((a, b) => getLatestYear(b.year) - getLatestYear(a.year))

  return (
    <section ref={sectionRef} id="about" className="py-16 bg-custom-primary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div ref={headerRef} className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-custom-title mb-6">
              {t('about.subtitle')}
            </h2>
            
            <p className="text-lg text-custom-secondary max-w-3xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 w-full max-w-7xl mx-auto">
            {/* Photo */}
            <div className="col-span-12 lg:col-span-4 row-span-1">
              <div ref={photoRef} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center">
                <div className="relative overflow-hidden rounded-2xl shadow-xl w-64 h-64">
                  <Image
                    src="/minhaj.jpg"
                    alt="Photo de profil"
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="col-span-12 lg:col-span-8 row-span-1">
              <div ref={descriptionRef} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('about.profile.title')}</h3>
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
                  <p>
                    {t('about.profile.paragraph1')}
                  </p>
                  <p>
                    {t('about.profile.paragraph2')}
                  </p>
                  <p>
                    {t('about.profile.paragraph3')}
                  </p>
                  <p>
                    {t('about.profile.paragraph4')}
                  </p>
                </div>
              </div>
            </div>

            {/* Compétences */}
            <div className="col-span-12 row-span-2">
              <div ref={strengthsRef} className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">{t('about.skills.title')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                  {STRENGTHS_DATA.map((strength) => (
                    <div key={strength.title} className="flex items-start gap-3 p-3 lg:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="p-2 bg-[#8C0605]/10 dark:bg-[#FFD6D6]/10 rounded-lg flex-shrink-0 mt-0.5">
                        <strength.icon className="w-4 h-4 lg:w-6 lg:h-6 text-[#8C0605] dark:text-[#FFD6D6]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base mb-1">
                          {strength.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm leading-relaxed">
                          {strength.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="col-span-12 lg:col-span-8 row-span-2">
              <div ref={timelineRef} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('about.timeline.title')}</h3>
                
                {/* Onglets de filtrage */}
                <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl w-full sm:w-fit border border-gray-200 dark:border-gray-600 relative">
                  <div 
                    ref={tabIndicatorRef}
                    className="absolute top-1 bottom-1 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-lg shadow-lg"
                    style={{ 
                      width: 'calc(50% - 4px)', 
                      left: '2px'
                    }}
                  />
                  
                  <button
                    onClick={() => setActiveTab('experience')}
                    className={`relative z-10 flex-1 sm:flex-none px-3 sm:px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer text-sm sm:text-base ${
                      activeTab === 'experience'
                        ? 'text-white dark:text-gray-900'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {t('about.timeline.experience_tab')}
                  </button>
                  <button
                    onClick={() => setActiveTab('formation')}
                    className={`relative z-10 flex-1 sm:flex-none px-3 sm:px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer text-sm sm:text-base ${
                      activeTab === 'formation'
                        ? 'text-white dark:text-gray-900'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {t('about.timeline.education_tab')}
                  </button>
                </div>

                {/* Chronologie */}
                <div className="space-y-4">
                  {filteredFormations.map((formation) => (
                    <div key={`${formation.degree}-${formation.year}`} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#8C0605]/10 dark:bg-[#FFD6D6]/10 rounded-full flex items-center justify-center">
                        {formation.type === 'formation' ? (
                          <FaGraduationCap size={16} className="text-[#8C0605] dark:text-[#FFD6D6]" />
                        ) : (
                          <FaBriefcase size={16} className="text-[#8C0605] dark:text-[#FFD6D6]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#8C0605] dark:text-[#FFD6D6] bg-[#8C0605]/10 dark:bg-[#FFD6D6]/10 px-2 py-1 rounded-full">
                            {formation.year}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {formation.degree}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          {formation.school}
                        </p>
                        {formation.description && (
                          <div className="text-gray-500 dark:text-gray-400 text-xs">
                            {formation.school === t('about.timeline.experiences.ukenoon.school') ? (
                              <ul className="space-y-1">
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.experiences.ukenoon.bullet1')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.experiences.ukenoon.bullet2')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.experiences.ukenoon.bullet3')}</span>
                                </li>
                              </ul>
                            ) : formation.school === t('about.timeline.experiences.freelance.school') ? (
                              <ul className="space-y-1">
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.experiences.freelance.bullet1')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.experiences.freelance.bullet2')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.experiences.freelance.bullet3')}</span>
                                </li>
                              </ul>
                            ) : formation.school === t('about.timeline.formations.doranco.school') ? (
                              <ul className="space-y-1">
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.formations.doranco.bullet1')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.formations.doranco.bullet2')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.formations.doranco.bullet3')}</span>
                                </li>
                              </ul>
                            ) : formation.school === t('about.timeline.formations.openclassrooms.school') ? (
                              <ul className="space-y-1">
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.formations.openclassrooms.bullet1')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.formations.openclassrooms.bullet2')}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full mt-1.5 flex-shrink-0"></span>
                                  <span>{t('about.timeline.formations.openclassrooms.bullet3')}</span>
                                </li>
                              </ul>
                            ) : (
                              <p>{formation.description}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA CV */}
            <div className="col-span-12 lg:col-span-4 row-span-1">
                          <div className="bg-gradient-to-br from-[#8C0605] to-[#8C0605]/90 dark:from-[#FFD6D6] dark:to-[#FFD6D6]/90 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-4">{t('about.cv.title')}</h3>
              <p className="text-white/90 dark:text-gray-900/90 mb-6 text-sm">
                {t('about.cv.description')}
              </p>
              <button
                onClick={() => window.open('/cv-minhaj_zubair.pdf', '_blank')}
                className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-[#8C0605] dark:text-[#FFD6D6] rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
              >
                <FaDownload className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                {t('about.cv.button')}
              </button>
            </div>
            </div>

            {/* CTA Collaboration */}
            <div className="col-span-12 lg:col-span-4 row-span-1">
                          <div className="bg-gradient-to-br from-[#8C0605] to-[#8C0605]/90 dark:from-[#FFD6D6] dark:to-[#FFD6D6]/90 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-4">{t('about.collaboration.title')}</h3>
              <p className="text-white/90 dark:text-gray-900/90 mb-6 text-sm">
                {t('about.collaboration.description')}
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-white dark:bg-gray-900 text-[#8C0605] dark:text-[#FFD6D6] px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 cursor-pointer"
              >
                {t('about.collaboration.button')}
                <FaArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
