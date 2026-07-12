'use client'

import { motion } from 'framer-motion'
import { EASE_SMOOTH } from '@/lib/motion'
import { cn } from '@/lib/cn'

/**
 * Signature motion du site : le trait rouge se dessine de gauche à droite,
 * puis le label glisse en place — chaque section « s'ouvre » de la même façon.
 * Reduced-motion : géré globalement par MotionProvider (transforms neutralisés).
 */
export function SectionLabel({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.12 }}
      className={cn(
        'mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#8C0605] dark:text-red-400',
        className
      )}
    >
      <motion.span
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.55, ease: EASE_SMOOTH }}
        className="h-px w-10 origin-left bg-current"
      />

      <motion.span
        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.45, ease: EASE_SMOOTH }}
      >
        {children}
      </motion.span>
    </motion.p>
  )
}
