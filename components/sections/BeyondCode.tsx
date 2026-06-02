'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

type LightboxState = { images: string[]; index: number }

gsap.registerPlugin(ScrollTrigger)

// Configuration des photos - Tu peux facilement modifier ces chemins
const PHOTOS = {
  fitness: '/photos/gym_pic.jpeg',
  entrepreneurship: '/photos/profit-split.jpeg',
  music: '/photos/music.jpg',
  main: '/photos/lifestyle.jpg',
}

// Photos de voitures (galerie)
const CAR_PHOTOS = [
  '/photos/4ae4ea19-981d-441b-8392-1a3a9179c288.JPG',
  '/photos/f039b0b2-c73f-44f4-b6ea-b5437926f6eb.JPG',
  '/photos/e01f4724-4f51-4c81-a253-ef52714ca182.JPG',
  '/photos/IMG_0708.JPEG',
  '/photos/IMG_5964.webp',
  '/photos/IMG_5971.webp',
]

// Photos de voyage (galerie)
const TRAVEL_PHOTOS = [
  '/photos/IMG_0040.jpeg',
  '/photos/IMG_1499.jpeg',
  '/photos/IMG_1575.jpeg',
  '/photos/IMG_5983.jpeg',
  '/photos/IMG-20210709-WA0005.jpeg',
  '/photos/IMG_7359.jpeg',
  '/photos/IMG-20210709-WA0036.jpeg',
  '/photos/Snapchat-102351364.jpeg',
]

export function BeyondCode() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ images, index })
  }

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const goToPrev = useCallback(() => {
    setLightbox(prev => {
      if (!prev || prev.images.length <= 1) return prev
      return { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }
    })
  }, [])

  const goToNext = useCallback(() => {
    setLightbox(prev => {
      if (!prev || prev.images.length <= 1) return prev
      return { ...prev, index: (prev.index + 1) % prev.images.length }
    })
  }, [])

  useEffect(() => {
    if (!lightbox) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox, closeLightbox, goToPrev, goToNext])

  // Animation du marquee
  useEffect(() => {
    if (marqueeRef.current) {
      const marquee = marqueeRef.current
      const content = marquee.querySelector('.marquee-content') as HTMLElement
      if (content) {
        gsap.to(content, {
          xPercent: -50,
          ease: 'none',
          duration: 20,
          repeat: -1,
        })
      }
    }
  }, [])

  const handleImageError = (key: string) => {
    setImageErrors(prev => ({ ...prev, [key]: true }))
  }

  // Placeholder pour les images manquantes
  const ImageWithFallback = ({
    src,
    alt,
    className,
    fallbackKey
  }: {
    src: string
    alt: string
    className?: string
    fallbackKey: string
  }) => {
    if (imageErrors[fallbackKey]) {
      return (
        <div className={`bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${className}`}>
          <span className="text-gray-400 dark:text-gray-500 text-sm text-center px-4">
            Ajoute ta photo ici<br />
            <code className="text-xs">{src}</code>
          </span>
        </div>
      )
    }

    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        onError={() => handleImageError(fallbackKey)}
      />
    )
  }

  return (
    <section ref={sectionRef} id="beyond-code" className="py-20 bg-custom-primary overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header avec style manuscrit */}
        <div className="mb-16 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[#8C0605] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
              {'// '}{t('beyondCode.badge')}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-custom-title leading-none mb-6">
              {t('beyondCode.title').toString().split(' ')[0]}
              <span className="block text-[#8C0605] dark:text-[#FFD6D6] italic font-light">
                {t('beyondCode.title').toString().split(' ').slice(1).join(' ')}
              </span>
            </h2>
            <p className="text-lg text-custom-secondary max-w-xl leading-relaxed">
              {t('beyondCode.description')}
            </p>
          </motion.div>

          {/* Élément décoratif */}
          <div className="absolute -top-10 right-0 w-64 h-64 bg-[#8C0605]/5 dark:bg-[#FFD6D6]/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Grille réorganisée */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 mb-16">

          {/* Ligne 1 : Fitness + Entrepreneuriat */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-12 md:col-span-8"
          >
            <div
              className="relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => openLightbox([PHOTOS.fitness], 0)}
            >
              <ImageWithFallback
                src={PHOTOS.fitness}
                alt="Fitness"
                className="transition-transform duration-700 group-hover:scale-105"
                fallbackKey="fitness"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {t('beyondCode.passions.fitness.title')}
                </h3>
                <p className="text-white/80 text-sm max-w-md">
                  {t('beyondCode.passions.fitness.description')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-12 md:col-span-4"
          >
            <div
              className="relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => openLightbox([PHOTOS.entrepreneurship], 0)}
            >
              <ImageWithFallback
                src={PHOTOS.entrepreneurship}
                alt="Entrepreneuriat"
                className="transition-transform duration-700 group-hover:scale-105"
                fallbackKey="entrepreneurship"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {t('beyondCode.passions.entrepreneurship.title')}
                </h3>
                <p className="text-white/70 text-xs">
                  {t('beyondCode.passions.entrepreneurship.description')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Ligne 2 : Voitures + Voyages */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-12 md:col-span-6"
          >
            <div className="relative h-[250px] rounded-2xl overflow-hidden bg-gray-900">
              <div className="grid grid-cols-3 grid-rows-2 gap-0.5 h-full">
                {CAR_PHOTOS.map((src, index) => (
                  <div
                    key={src}
                    className="relative overflow-hidden group cursor-pointer"
                    onClick={() => openLightbox(CAR_PHOTOS, index)}
                  >
                    <ImageWithFallback
                      src={src}
                      alt={`Voiture ${index + 1}`}
                      className="transition-transform duration-500 group-hover:scale-110"
                      fallbackKey={`car-${index}`}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-white">
                  {t('beyondCode.passions.cars.title')}
                </h3>
                <p className="text-white/60 text-xs mt-1">
                  {t('beyondCode.passions.cars.description')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="col-span-12 md:col-span-6"
          >
            <div className="relative h-[250px] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-4 grid-rows-2 gap-0.5 h-full">
                {TRAVEL_PHOTOS.map((src, index) => (
                  <div
                    key={src}
                    className="relative overflow-hidden group cursor-pointer"
                    onClick={() => openLightbox(TRAVEL_PHOTOS, index)}
                  >
                    <ImageWithFallback
                      src={src}
                      alt={`Voyage ${index + 1}`}
                      className="transition-transform duration-500 group-hover:scale-110"
                      fallbackKey={`travel-${index}`}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-white">
                  {t('beyondCode.passions.travel.title')}
                </h3>
                <p className="text-white/60 text-xs mt-1">
                  {t('beyondCode.passions.travel.description')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Ligne 3 : Citation + Musique */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="col-span-12 md:col-span-8"
          >
            <div className="bg-[#8C0605] dark:bg-[#FFD6D6] p-6 md:p-8 rounded-2xl relative overflow-hidden h-full">
              <blockquote className="relative z-10 text-xl md:text-2xl font-medium text-white dark:text-gray-900 leading-relaxed">
                &ldquo;{t('beyondCode.quote')}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-0.5 bg-white/30 dark:bg-gray-900/30" />
                <span className="text-white/70 dark:text-gray-900/70 text-sm">{t('beyondCode.quoteSubtitle')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="col-span-12 md:col-span-4"
          >
            <div className="bg-gray-900 dark:bg-gray-800 p-4 rounded-2xl h-full flex items-center gap-4">
              {/* Album cover */}
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/photos/after-hours.jpg"
                  alt="After Hours - The Weeknd"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-base truncate">The Weeknd</p>
                <p className="text-gray-400 text-sm">After Hours</p>
                <p className="text-gray-500 text-xs mt-2">{t('beyondCode.passions.music.description')}</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Marquee de mots-clés */}
        <div ref={marqueeRef} className="overflow-hidden py-8 border-t border-b border-gray-800 dark:border-gray-200">
          <div className="marquee-content flex gap-8 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8 items-center">
                <span className="text-4xl md:text-6xl font-black text-gray-800 dark:text-gray-200">DISCIPLINE</span>
                <span className="text-[#8C0605] dark:text-[#FFD6D6]">●</span>
                <span className="text-4xl md:text-6xl font-black text-gray-800 dark:text-gray-200">PASSION</span>
                <span className="text-[#8C0605] dark:text-[#FFD6D6]">●</span>
                <span className="text-4xl md:text-6xl font-black text-gray-800 dark:text-gray-200">GROWTH</span>
                <span className="text-[#8C0605] dark:text-[#FFD6D6]">●</span>
                <span className="text-4xl md:text-6xl font-black text-gray-800 dark:text-gray-200">CURIOSITY</span>
                <span className="text-[#8C0605] dark:text-[#FFD6D6]">●</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence mode="wait">
        {lightbox && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightbox.images[lightbox.index]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={lightbox.images[lightbox.index]}
                    alt="Image agrandie"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
                aria-label="Fermer"
              >
                ✕
              </button>

              {lightbox.images.length > 1 && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
                    aria-label="Photo précédente"
                  >
                    <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
                    aria-label="Photo suivante"
                  >
                    <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                  </button>
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white text-sm tabular-nums z-10">
                    {lightbox.index + 1} / {lightbox.images.length}
                  </span>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
