'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Globe } from 'lucide-react'

interface LuxaShowcaseCardProps {
  demoUrl?: string
}

export function LuxaShowcaseCard({ demoUrl = 'https://pocketly-web-blush.vercel.app/' }: LuxaShowcaseCardProps) {
  const springTransition = {
    type: 'spring' as const,
    stiffness: 100,
    damping: 18,
    mass: 0.8,
    duration: 0.7,
  }

  // Animation variants for the card background glow and gradient shifts
  const bgVariants = {
    initial: {
      background: 'radial-gradient(circle at 50% 120%, rgba(139, 92, 246, 0.4) 0%, rgba(88, 28, 135, 0.15) 50%, rgba(0, 0, 0, 1) 100%)',
      scale: 1,
    },
    hover: {
      background: 'radial-gradient(circle at 50% 100%, rgba(167, 139, 250, 0.6) 0%, rgba(124, 58, 237, 0.3) 40%, rgba(15, 23, 42, 1) 100%)',
      scale: 1.01,
    },
  }

  // Left Phone Animation Variants
  const leftPhoneVariants = {
    initial: {
      x: '-15%',
      y: '18%',
      rotate: -12,
      scale: 1.05,
      opacity: 0.65,
      filter: 'brightness(0.75) blur(0.5px)',
      zIndex: 10,
    },
    hover: {
      x: '-105%',
      y: '-8%',
      rotate: 0,
      scale: 1.1,
      opacity: 1,
      filter: 'brightness(1) blur(0px)',
      zIndex: 10,
    },
  }

  // Center Phone Animation Variants (Higher z-index, centered, moves slightly up)
  const centerPhoneVariants = {
    initial: {
      x: '-50%',
      y: '2%',
      scale: 1.1,
      filter: 'brightness(0.95)',
      zIndex: 30,
    },
    hover: {
      x: '-50%',
      y: '-8%',
      scale: 1.15,
      filter: 'brightness(1)',
      zIndex: 30,
    },
  }

  // Right Phone Animation Variants
  const rightPhoneVariants = {
    initial: {
      x: '15%',
      y: '18%',
      rotate: 12,
      scale: 1.05,
      opacity: 0.65,
      filter: 'brightness(0.75) blur(0.5px)',
      zIndex: 20,
    },
    hover: {
      x: '105%',
      y: '-8%',
      rotate: 0,
      scale: 1.1,
      opacity: 1,
      filter: 'brightness(1) blur(0px)',
      zIndex: 20,
    },
  }

  // Mascot 1 (Top Left): Pops up and rotates slightly
  const mascot1Variants = {
    initial: { opacity: 0, scale: 0.2, rotate: -30, y: 20 },
    hover: { opacity: 1, scale: 1, rotate: -5, y: 0 },
  }

  // Mascot 2 (Top Right): Peeks out from the top right, rotating slightly
  const mascot2Variants = {
    initial: { opacity: 0, scale: 0.2, rotate: 30, x: 20, y: 10 },
    hover: { opacity: 1, scale: 1, rotate: 12, x: 0, y: 0 },
  }

  // Mascot 3 (Bottom Left): Popping up near left phone
  const mascot3Variants = {
    initial: { opacity: 0, scale: 0.2, rotate: -15, y: 30 },
    hover: { opacity: 1, scale: 0.9, rotate: -8, y: 0 },
  }

  // Mascot 4 (Bottom Right): Peeking near right phone
  const mascot4Variants = {
    initial: { opacity: 0, scale: 0.2, rotate: 15, y: 30 },
    hover: { opacity: 0.85, scale: 0.95, rotate: 6, y: 0 },
  }

  // Arrow Translation Animation
  const arrowVariants = {
    initial: { x: 0, y: 0 },
    hover: { x: 8, y: -8 },
  }

  return (
    <motion.a
      href={demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial="initial"
      whileHover="hover"
      className="group relative block w-full h-full min-h-[420px] lg:min-h-full overflow-hidden cursor-pointer"
    >
      {/* Premium Outer Inner Glow & Gradient Background */}
      <motion.div
        variants={bgVariants}
        transition={springTransition}
        className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 md:p-8 overflow-hidden"
      >
        {/* Subtle grid pattern overlay for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Top Section: Globe Button only */}
        <div className="relative z-40 flex justify-end items-start">
          <motion.div
            variants={arrowVariants}
            transition={springTransition}
            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300 shadow-lg"
          >
            <Globe className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        </div>

        {/* Center/Bottom Section: Interactive Phone Showcase */}
        <div className="relative w-full h-[60%] md:h-[65%] mt-auto flex items-end justify-center">
          
          {/* Mascot 1 - Top Left */}
          <motion.div
            variants={mascot1Variants}
            transition={{ ...springTransition, delay: 0.05 }}
            className="absolute left-[2%] top-[5%] md:left-[8%] z-40 pointer-events-none"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl">
              <Image
                src="/images/luxa_mascot.webp"
                alt="Luxa Mascot 1"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Mascot 2 - Top Right */}
          <motion.div
            variants={mascot2Variants}
            transition={{ ...springTransition, delay: 0.1 }}
            className="absolute right-[4%] top-[15%] md:right-[10%] z-40 pointer-events-none"
          >
            <div className="relative w-14 h-14 md:w-18 md:h-18 drop-shadow-2xl">
              <Image
                src="/images/luxa_mascot_2.webp"
                alt="Luxa Mascot 2"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Mascot 3 - Bottom Left */}
          <motion.div
            variants={mascot3Variants}
            transition={{ ...springTransition, delay: 0.15 }}
            className="absolute left-[3%] bottom-[8%] md:left-[10%] z-40 pointer-events-none"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl">
              <Image
                src="/images/luxa_mascot_3.webp"
                alt="Luxa Mascot 3"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Mascot 4 - Bottom Right */}
          <motion.div
            variants={mascot4Variants}
            transition={{ ...springTransition, delay: 0.2 }}
            className="absolute right-[3%] bottom-[12%] md:right-[8%] z-40 pointer-events-none"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl">
              <Image
                src="/images/luxa_mascot_4.webp"
                alt="Luxa Mascot 4"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Left Phone Mockup (using user provided mockup) */}
          <motion.div
            variants={leftPhoneVariants}
            transition={springTransition}
            className="absolute bottom-[-110px] left-[32%] w-[48%] sm:w-[42%] md:w-[32%] aspect-[9/19.5]"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/luxa_stats-portrait.webp"
                alt="Luxa Stats"
                fill
                sizes="(max-width: 768px) 180px, 260px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Right Phone Mockup (using user provided mockup) */}
          <motion.div
            variants={rightPhoneVariants}
            transition={springTransition}
            className="absolute bottom-[-110px] right-[32%] w-[48%] sm:w-[42%] md:w-[32%] aspect-[9/19.5]"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/luxa_calendar-portrait.webp"
                alt="Luxa Calendar"
                fill
                sizes="(max-width: 768px) 180px, 260px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Center Phone Mockup (z-index highest, using user provided mockup) */}
          <motion.div
            variants={centerPhoneVariants}
            transition={springTransition}
            className="absolute bottom-[-90px] left-1/2 w-[52%] sm:w-[46%] md:w-[36%] aspect-[9/19.5]"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/luxa_dashboard-portrait.webp"
                alt="Luxa Dashboard"
                fill
                sizes="(max-width: 768px) 200px, 300px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </motion.a>
  )
}
