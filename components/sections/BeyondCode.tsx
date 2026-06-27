'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/utils/cn'

type LightboxState = {
  images: string[]
  index: number
}

type ImageWithFallbackProps = {
  src: string
  alt: string
  className?: string
  fallbackKey: string
  sizes: string
  priority?: boolean
}

type BentoImageCardProps = {
  title: string
  description: string
  eyebrow?: string
  image: string
  fallbackKey: string
  className?: string
  imageSizes: string
  onClick: () => void
}

type GalleryCardProps = {
  title: string
  description: string
  images: string[]
  type: 'cars' | 'travel'
  className?: string
  columns: string
  imageSizes: string
  onOpen: (index: number) => void
}

const PHOTOS = {
  fitness: '/photos/gym_pic.jpeg',
  entrepreneurship: '/photos/profit-split.jpeg',
  music: '/photos/after-hours.jpg',
} as const

const CAR_PHOTOS = [
  '/photos/4ae4ea19-981d-441b-8392-1a3a9179c288.JPG',
  '/photos/f039b0b2-c73f-44f4-b6ea-b5437926f6eb.JPG',
  '/photos/e01f4724-4f51-4c81-a253-ef52714ca182.JPG',
  '/photos/IMG_0708.JPEG',
  '/photos/IMG_5964.webp',
  '/photos/IMG_5971.webp',
]

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

const MARQUEE_WORDS = ['DISCIPLINE', 'PASSION', 'GROWTH', 'CURIOSITY']

const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[4%] top-16 h-[clamp(15rem,24vw,28rem)] w-[clamp(15rem,24vw,28rem)] rounded-full bg-[#8C0605]/10 blur-3xl dark:bg-red-400/[0.08] lg:right-[10%] xl:right-[14%]" />

      <div className="absolute bottom-16 left-[2%] h-[clamp(14rem,20vw,24rem)] w-[clamp(14rem,20vw,24rem)] rounded-full bg-[#8C0605]/8 blur-3xl dark:bg-red-400/[0.06] lg:left-[8%]" />

      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/18 to-transparent dark:from-black/20" />

      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/14 to-transparent dark:from-black/20" />
    </div>
  )
}

function CardShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07070a] shadow-[0_18px_58px_rgba(0,0,0,0.14)]',
        className
      )}
    >
      {children}
    </div>
  )
}

export function BeyondCode() {
  const { t } = useTranslation()

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const tr = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const value = params ? t(key, params) : t(key)
      return Array.isArray(value) ? value.join(' ') : String(value)
    },
    [t]
  )

  const titleParts = useMemo(() => {
    const words = tr('beyondCode.title').split(' ')

    return {
      first: words[0] ?? '',
      rest: words.slice(1).join(' '),
    }
  }, [tr])

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightbox({ images, index })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  const goToPrev = useCallback(() => {
    setLightbox((previousLightbox) => {
      if (!previousLightbox || previousLightbox.images.length <= 1) {
        return previousLightbox
      }

      return {
        ...previousLightbox,
        index:
          (previousLightbox.index - 1 + previousLightbox.images.length) %
          previousLightbox.images.length,
      }
    })
  }, [])

  const goToNext = useCallback(() => {
    setLightbox((previousLightbox) => {
      if (!previousLightbox || previousLightbox.images.length <= 1) {
        return previousLightbox
      }

      return {
        ...previousLightbox,
        index: (previousLightbox.index + 1) % previousLightbox.images.length,
      }
    })
  }, [])

  const handleImageError = useCallback((key: string) => {
    setImageErrors((previousErrors) => ({
      ...previousErrors,
      [key]: true,
    }))
  }, [])

  const ImageWithFallback = ({
    src,
    alt,
    className,
    fallbackKey,
    sizes,
    priority = false,
  }: ImageWithFallbackProps) => {
    if (imageErrors[fallbackKey]) {
      return (
        <div
          className={cn(
            'flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900',
            className
          )}
        >
          <span className="px-4 text-center text-sm text-gray-400 dark:text-gray-500">
            {tr('beyondCode.add_photo_placeholder')}

            <br />

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
        sizes={sizes}
        priority={priority}
        draggable={false}
        onError={() => handleImageError(fallbackKey)}
        className={cn('select-none object-cover', className)}
      />
    )
  }

  const BentoImageCard = ({
    title,
    description,
    eyebrow,
    image,
    fallbackKey,
    className,
    imageSizes,
    onClick,
  }: BentoImageCardProps) => {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.62, ease: EASE_SMOOTH }}
        className={className}
      >
        <button
          type="button"
          onClick={onClick}
          className="group relative h-full min-h-[300px] w-full cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07070a] text-left shadow-[0_18px_58px_rgba(0,0,0,0.14)] md:min-h-[340px]"
        >
          <ImageWithFallback
            src={image}
            alt={title}
            fallbackKey={fallbackKey}
            sizes={imageSizes}
            className="transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/32 to-transparent" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(140,6,5,0.18),transparent_35%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

          {eyebrow && (
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              {eyebrow}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h3 className="mb-2.5 text-2xl font-black tracking-[-0.05em] text-white md:text-3xl">
              {title}
            </h3>

            <p className="max-w-md text-sm leading-6 text-white/72">
              {description}
            </p>
          </div>
        </button>
      </motion.div>
    )
  }

  const GalleryCard = ({
    title,
    description,
    images,
    type,
    className,
    columns,
    imageSizes,
    onOpen,
  }: GalleryCardProps) => {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.62, ease: EASE_SMOOTH }}
        className={className}
      >
        <CardShell className="h-[260px] md:h-[300px]">
          <div className={cn('grid h-full grid-rows-2 gap-0.5', columns)}>
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => onOpen(index)}
                className="group relative overflow-hidden"
              >
                <ImageWithFallback
                  src={src}
                  alt={
                    type === 'cars'
                      ? tr('beyondCode.car_alt', { n: index + 1 })
                      : tr('beyondCode.travel_alt', { n: index + 1 })
                  }
                  fallbackKey={`${type}-${index}`}
                  sizes={imageSizes}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </button>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-xl font-black tracking-[-0.05em] text-white md:text-2xl">
              {title}
            </h3>

            <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/68 md:text-sm">
              {description}
            </p>
          </div>

          <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/70 backdrop-blur-md">
            {images.length} photos
          </div>
        </CardShell>
      </motion.div>
    )
  }

  useEffect(() => {
    if (!lightbox) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') goToPrev()
      if (event.key === 'ArrowRight') goToNext()
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightbox, closeLightbox, goToPrev, goToNext])

  return (
    <section
      id="beyond-code"
      className="relative isolate overflow-hidden bg-custom-primary py-[clamp(4rem,5.5vw,6.5rem)]"
    >
      <SectionBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(1120px,calc(100vw-5rem))] xl:max-w-[min(1160px,calc(100vw-7rem))] 2xl:max-w-[1160px]">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="relative mb-10 md:mb-12"
          >
            <div className="grid min-h-[clamp(12rem,20vh,17rem)] grid-cols-1 content-end gap-6 pb-9 pt-3 md:grid-cols-12 md:pb-10">
              <div className="md:col-span-8">
                <span className="mb-4 block font-mono text-xs uppercase tracking-[0.28em] text-[#8C0605] dark:text-red-400 sm:text-sm">
                  {'// '}
                  {tr('beyondCode.badge')}
                </span>

                <h2 className="max-w-[min(820px,100%)] text-4xl font-black leading-[0.94] tracking-[-0.065em] text-custom-title sm:text-5xl md:text-[clamp(3.35rem,5.4vw,5.2rem)] lg:text-[clamp(3.75rem,5vw,5.7rem)]">
                  {titleParts.first}

                  {titleParts.rest && (
                    <span className="block font-light italic text-[#8C0605] dark:text-red-400">
                      {titleParts.rest}
                    </span>
                  )}
                </h2>
              </div>

              <div className="md:col-span-4 md:self-end">
                <p className="max-w-sm text-sm leading-6 text-custom-secondary md:text-[15px] md:leading-7">
                  {tr('beyondCode.description')}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#8C0605]/30 via-gray-300 to-transparent dark:from-red-400/30 dark:via-white/10" />

            <div className="pointer-events-none absolute -bottom-7 right-0 hidden select-none text-[5.75rem] font-black leading-none tracking-[-0.08em] text-gray-950/[0.035] dark:text-white/[0.035] md:block">
              04
            </div>
          </motion.div>

          {/* Bento grid */}
          <div className="mx-auto mb-12 grid w-full max-w-[min(1080px,100%)] grid-cols-12 gap-5">
            <BentoImageCard
              title={tr('beyondCode.passions.fitness.title')}
              description={tr('beyondCode.passions.fitness.description')}
              eyebrow="Discipline"
              image={PHOTOS.fitness}
              fallbackKey="fitness"
              imageSizes="(min-width: 768px) 680px, 100vw"
              onClick={() => openLightbox([PHOTOS.fitness], 0)}
              className="col-span-12 md:col-span-7"
            />

            <BentoImageCard
              title={tr('beyondCode.passions.entrepreneurship.title')}
              description={tr('beyondCode.passions.entrepreneurship.description')}
              image={PHOTOS.entrepreneurship}
              fallbackKey="entrepreneurship"
              imageSizes="(min-width: 768px) 430px, 100vw"
              onClick={() => openLightbox([PHOTOS.entrepreneurship], 0)}
              className="col-span-12 md:col-span-5"
            />

            <GalleryCard
              title={tr('beyondCode.passions.cars.title')}
              description={tr('beyondCode.passions.cars.description')}
              images={CAR_PHOTOS}
              type="cars"
              columns="grid-cols-3"
              imageSizes="(min-width: 768px) 180px, 33vw"
              onOpen={(index) => openLightbox(CAR_PHOTOS, index)}
              className="col-span-12 md:col-span-6"
            />

            <GalleryCard
              title={tr('beyondCode.passions.travel.title')}
              description={tr('beyondCode.passions.travel.description')}
              images={TRAVEL_PHOTOS}
              type="travel"
              columns="grid-cols-4"
              imageSizes="(min-width: 768px) 135px, 25vw"
              onOpen={(index) => openLightbox(TRAVEL_PHOTOS, index)}
              className="col-span-12 md:col-span-6"
            />

            {/* Quote card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.62, ease: EASE_SMOOTH }}
              className="col-span-12 md:col-span-7"
            >
              <div className="relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-[#8C0605] p-5 shadow-[0_18px_58px_rgba(140,6,5,0.18)] dark:bg-red-400 md:p-6">
                <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10 dark:bg-gray-950/10" />

                <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-black/10 blur-3xl dark:bg-gray-950/10" />

                <blockquote className="relative z-10 max-w-2xl text-2xl font-black leading-tight tracking-[-0.05em] text-white dark:text-gray-950 md:text-3xl">
                  &ldquo;{tr('beyondCode.quote')}&rdquo;
                </blockquote>

                <div className="relative z-10 mt-8 flex items-center gap-3">
                  <div className="h-0.5 w-8 bg-white/35 dark:bg-gray-950/35" />

                  <span className="text-sm font-semibold text-white/70 dark:text-gray-950/70">
                    {tr('beyondCode.quoteSubtitle')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Music card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.62, ease: EASE_SMOOTH }}
              className="col-span-12 md:col-span-5"
            >
              <CardShell className="flex min-h-[210px] items-center gap-5 p-5 dark:bg-[#101114] md:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(140,6,5,0.28),transparent_36%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(248,113,113,0.20),transparent_36%)]" />

                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl shadow-2xl md:h-28 md:w-28">
                  <ImageWithFallback
                    src={PHOTOS.music}
                    alt="After Hours - The Weeknd"
                    fallbackKey="music"
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <div className="relative min-w-0 flex-1">
                  <p className="truncate text-xl font-black tracking-[-0.04em] text-white">
                    The Weeknd
                  </p>

                  <p className="text-sm font-medium text-gray-400">
                    After Hours
                  </p>

                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-gray-500">
                    {tr('beyondCode.passions.music.description')}
                  </p>
                </div>
              </CardShell>
            </motion.div>
          </div>

          {/* Marquee */}
          <div className="relative w-full overflow-hidden border-y border-gray-800/20 py-6 dark:border-white/15">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/15" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/10 dark:bg-white/15" />

            <motion.div
              className="flex w-max whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...Array(2)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-8 pr-8">
                  {MARQUEE_WORDS.map((word) => (
                    <div
                      key={`${word}-${groupIndex}`}
                      className="flex items-center gap-8"
                    >
                      <span className="text-3xl font-black tracking-[-0.06em] text-gray-950/65 dark:text-white/75 md:text-5xl">
                        {word}
                      </span>

                      <span className="text-[#8C0605] dark:text-red-400">
                        ●
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
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
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_SMOOTH }}
              className="relative h-full max-h-[90vh] w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightbox.images[lightbox.index]}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={lightbox.images[lightbox.index]}
                    alt={tr('beyondCode.enlarged_image_alt')}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                aria-label={tr('beyondCode.close')}
              >
                <X className="h-5 w-5" />
              </button>

              {lightbox.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:left-4 md:h-12 md:w-12"
                    aria-label={tr('beyondCode.prev_photo')}
                  >
                    <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-4 md:h-12 md:w-12"
                    aria-label={tr('beyondCode.next_photo')}
                  >
                    <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
                  </button>

                  <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm tabular-nums text-white backdrop-blur-md">
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