'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/utils/cn'

type MagneticProps = {
  children: ReactNode
  className?: string
  /** Force d'attraction (0 → immobile, 1 → suit le curseur) */
  strength?: number
}

/** Effet magnétique : l'élément est attiré par le curseur, puis revient élastiquement. */
export function Magnetic({ children, className, strength = 0.32 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isFinePointer || prefersReducedMotion) return

    const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' })

    const onMouseMove = (event: MouseEvent) => {
      const bounds = element.getBoundingClientRect()
      const relativeX = event.clientX - (bounds.left + bounds.width / 2)
      const relativeY = event.clientY - (bounds.top + bounds.height / 2)

      xTo(relativeX * strength)
      yTo(relativeY * strength)
    }

    const onMouseLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    }

    element.addEventListener('mousemove', onMouseMove)
    element.addEventListener('mouseleave', onMouseLeave)

    return () => {
      element.removeEventListener('mousemove', onMouseMove)
      element.removeEventListener('mouseleave', onMouseLeave)
      // Ne tuer que les props que Magnetic anime : un kill global saboterait
      // les tweens d'entrée posés par un parent sur ce même élément.
      gsap.killTweensOf(element, 'x,y')
    }
  }, [strength])

  return (
    <div ref={ref} className={cn('inline-block will-change-transform', className)}>
      {children}
    </div>
  )
}
