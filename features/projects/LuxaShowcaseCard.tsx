'use client'

import {
  motion,
  MotionConfig,
  useReducedMotion,
  type Transition,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface LuxaShowcaseCardProps {
  demoUrl?: string
  className?: string
}

type PhoneProps = {
  src: string
  alt: string
  variants: Variants
  className?: string
  sizes?: string
  priority?: boolean
}

const LUXA_DEMO_URL = 'https://pocketly-web-blush.vercel.app/'

const PHONE_IMAGES = {
  stats: '/images/luxa_stats-portrait.webp',
  calendar: '/images/luxa_calendar-portrait.webp',
  dashboard: '/images/luxa_dashboard-portrait.webp',
  mascot: '/images/luxa_mascot.webp',
} as const

const EASE_OUT = [0.22, 1, 0.36, 1] as const

function Phone({
  src,
  alt,
  variants,
  className,
  sizes = '(max-width: 768px) 180px, (max-width: 1280px) 220px, 260px',
  priority = false,
}: PhoneProps) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        'absolute bottom-[-4%] left-1/2 aspect-[9/19.5] will-change-transform',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        draggable={false}
        className="select-none object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,0.48)]"
      />
    </motion.div>
  )
}

export function LuxaShowcaseCard({
  demoUrl = LUXA_DEMO_URL,
  className,
}: LuxaShowcaseCardProps) {
  const reduceMotion = useReducedMotion()

  const spring: Transition = reduceMotion
    ? { duration: 0 }
    : {
      type: 'spring',
      stiffness: 110,
      damping: 18,
      mass: 0.8,
    }

  const smooth: Transition = reduceMotion
    ? { duration: 0 }
    : {
      duration: 0.7,
      ease: EASE_OUT,
    }

  const bgGlow: Variants = {
    initial: {
      opacity: 0.72,
      scale: 1,
    },
    hover: {
      opacity: 1,
      scale: 1.035,
    },
  }

  const headline: Variants = {
    initial: {
      opacity: 0.76,
      y: 0,
    },
    hover: {
      opacity: 0.98,
      y: -2,
    },
  }

  const arrow: Variants = {
    initial: {
      x: 0,
      y: 0,
      rotate: 0,
    },
    hover: {
      x: 6,
      y: -6,
      rotate: 4,
    },
  }

  const mascot: Variants = {
    initial: {
      opacity: 1,
      scale: 1,
      rotate: -5,
      y: 0,
    },
    hover: {
      opacity: 1,
      scale: 1.06,
      rotate: 3,
      y: -5,
    },
  }

  const leftPhone: Variants = {
    initial: {
      x: '-122%',
      y: '17%',
      rotate: -14,
      scale: 0.96,
      opacity: 0.48,
      filter: 'brightness(0.72) blur(0.4px)',
      zIndex: 10,
    },
    hover: {
      x: '-146%',
      y: '3%',
      rotate: -4,
      scale: 1,
      opacity: 0.95,
      filter: 'brightness(0.94) blur(0px)',
      zIndex: 20,
    },
  }

  const centerPhone: Variants = {
    initial: {
      x: '-50%',
      y: '0%',
      rotate: 0,
      scale: 1.06,
      opacity: 1,
      filter: 'brightness(1)',
      zIndex: 30,
    },
    hover: {
      x: '-50%',
      y: '-7%',
      rotate: 0,
      scale: 1.1,
      opacity: 1,
      filter: 'brightness(1)',
      zIndex: 30,
    },
  }

  const rightPhone: Variants = {
    initial: {
      x: '22%',
      y: '17%',
      rotate: 14,
      scale: 0.96,
      opacity: 0.48,
      filter: 'brightness(0.72) blur(0.4px)',
      zIndex: 10,
    },
    hover: {
      x: '46%',
      y: '3%',
      rotate: 4,
      scale: 1,
      opacity: 0.95,
      filter: 'brightness(0.94) blur(0px)',
      zIndex: 20,
    },
  }

  return (
    <MotionConfig transition={spring}>
      <motion.a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Luxa project"
        initial="initial"
        whileHover="hover"
        whileFocus="hover"
        whileTap={reduceMotion ? undefined : { scale: 0.995 }}
        className={cn(
          'group relative isolate z-0 block h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0c0c10] p-2',
          'shadow-[0_20px_60px_rgba(0,0,0,0.35)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070a]',
          '[transform:translateZ(0)]',
          className
        )}
      >
        <div className="relative isolate z-0 h-full min-h-[420px] overflow-hidden rounded-[24px] md:min-h-[500px] lg:min-h-full">
          {/* Base background */}
          <div className="absolute inset-0 z-0 bg-[hsl(353_100%_22%)]" />

          <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,hsl(353_100%_22%)_0%,hsl(340_75%_30%)_44%,hsl(315_70%_68%)_100%)]" />

          <motion.div
            variants={bgGlow}
            transition={smooth}
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.07)_30%,transparent_66%)]"
          />

          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />

          <div className="absolute -left-16 -top-16 z-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 top-0 z-0 h-44 w-44 rounded-full bg-pink-200/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

          {/* Header */}
          <div className="relative z-20 flex items-start justify-between gap-4 p-5 md:p-6">
            <div className="max-w-[80%]">

              <motion.h3
                variants={headline}
                transition={smooth}
                className="text-[clamp(20px,2.6vw,32px)] font-black leading-[1.02] tracking-[-0.055em] text-white/78"
              >
                An intuitive mobile companion for organizing your digital wallets
                and analyzing your financial health
              </motion.h3>
            </div>

            <motion.div
              variants={arrow}
              transition={spring}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-md transition-colors duration-300 group-hover:bg-white/16"
              aria-hidden="true"
            >
              <ArrowUpRight className="h-5 w-5" />
            </motion.div>
          </div>

          {/* Mascot */}
          <motion.div
            variants={mascot}
            transition={spring}
            className="absolute right-5 top-[116px] z-20 md:right-6 md:top-[138px]"
            aria-hidden="true"
          >
            <div className="relative h-14 w-14 rounded-full border border-white/20 bg-white/10 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-md md:h-16 md:w-16">
              <Image
                src={PHONE_IMAGES.mascot}
                alt=""
                fill
                sizes="64px"
                draggable={false}
                className="select-none object-contain p-2"
              />
            </div>
          </motion.div>

          {/* Phones */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-[66%] md:h-[68%]">
            <Phone
              src={PHONE_IMAGES.stats}
              alt="Luxa statistics screen"
              variants={leftPhone}
              className="w-[33%] min-w-[150px] max-w-[220px]"
            />

            <Phone
              src={PHONE_IMAGES.calendar}
              alt="Luxa calendar screen"
              variants={rightPhone}
              className="w-[33%] min-w-[150px] max-w-[220px]"
            />

            <Phone
              src={PHONE_IMAGES.dashboard}
              alt="Luxa dashboard screen"
              variants={centerPhone}
              priority
              className="w-[40%] min-w-[180px] max-w-[260px]"
            />
          </div>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

          {/* Inner ring */}
          <div className="pointer-events-none absolute inset-0 z-30 rounded-[24px] ring-1 ring-inset ring-white/10" />
        </div>
      </motion.a>
    </MotionConfig>
  )
}