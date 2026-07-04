'use client'

import { createElement, useEffect, useRef } from 'react'
import type { ElementType } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utils/cn'

gsap.registerPlugin(ScrollTrigger)

type RevealTextProps = {
  text: string
  as?: ElementType
  className?: string
  /** Décalage entre les mots, en secondes */
  stagger?: number
}

/**
 * Révèle un texte mot à mot par masques (les mots montent depuis le bas)
 * à l'entrée dans le viewport. Sans JS ou en reduced-motion, le texte est visible.
 */
export function RevealText({ text, as = 'h2', className, stagger = 0.045 }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)

  const words = text.split(' ')

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const targets = ref.current?.querySelectorAll('[data-reveal-word]')

      if (!targets || targets.length === 0) return

      gsap.fromTo(
        targets,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            once: true,
          },
        }
      )
    }, ref)

    return () => {
      ctx.revert()
    }
  }, [text, stagger])

  return createElement(
    as,
    { ref, className: cn(className) },
    words.map((word, index) => (
      <span key={`${word}-${index}`}>
        <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
          <span data-reveal-word className="inline-block will-change-transform">
            {word}
          </span>
        </span>
        {index < words.length - 1 ? ' ' : ''}
      </span>
    ))
  )
}
