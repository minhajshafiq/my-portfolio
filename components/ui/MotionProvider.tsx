'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Toutes les animations Framer Motion du site respectent prefers-reduced-motion
 * (les transforms sont neutralisés, les fondus restent) — GSAP le gère déjà
 * localement dans chaque composant.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
