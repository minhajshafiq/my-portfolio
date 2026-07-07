'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

type PageTransitionController = {
  cover: (onCovered: () => void) => void
  reveal: () => void
}

let controller: PageTransitionController | null = null

/**
 * Déclenché par AppLink avant la navigation : couvre l'écran puis appelle
 * onCovered une fois le rideau fermé (le composant n'est pas encore monté
 * si prefers-reduced-motion ou si l'API View Transitions est indisponible,
 * d'où le fallback direct).
 */
export function triggerPageCover(onCovered: () => void) {
  if (controller) {
    controller.cover(onCovered)
  } else {
    onCovered()
  }
}

/** Déclenché une fois la nouvelle page prête (onTransitionReady) pour rouvrir le rideau. */
export function triggerPageReveal() {
  controller?.reveal()
}

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const pulseRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const cover: PageTransitionController['cover'] = (onCovered) => {
      if (prefersReducedMotion) {
        onCovered()
        return
      }

      pulseRef.current?.kill()
      gsap.set(overlayRef.current, { display: 'flex', pointerEvents: 'auto' })
      gsap.set(dotRef.current, { scale: 0, opacity: 0 })

      gsap
        .timeline({ onComplete: onCovered })
        .fromTo(topRef.current, { yPercent: -100 }, { yPercent: 0, duration: 0.5, ease: 'power3.inOut' })
        .fromTo(bottomRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: 'power3.inOut' }, '<')
        .to(dotRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.4)' }, '-=0.2')
        .call(() => {
          // Pulse discret tant que la page suivante n'est pas prête : évite
          // l'impression de rideau figé si le chargement prend plus longtemps.
          pulseRef.current = gsap.to(dotRef.current, {
            scale: 1.5,
            opacity: 0.45,
            duration: 0.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        })
    }

    const reveal: PageTransitionController['reveal'] = () => {
      pulseRef.current?.kill()
      pulseRef.current = null

      if (prefersReducedMotion) {
        gsap.set(overlayRef.current, { display: 'none', pointerEvents: 'none' })
        return
      }

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(overlayRef.current, { display: 'none', pointerEvents: 'none' })
          },
        })
        .to(dotRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
        .to(topRef.current, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' }, '-=0.05')
        .to(bottomRef.current, { yPercent: 100, duration: 0.55, ease: 'power3.inOut' }, '<')
    }

    controller = { cover, reveal }

    return () => {
      controller = null
      pulseRef.current?.kill()
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[150] hidden items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div ref={topRef} className="absolute inset-x-0 top-0 h-1/2 bg-[#141210]" />
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-[#141210]" />
      <span ref={dotRef} className="relative z-10 h-3 w-3 rounded-full bg-[#8C0605]" />
    </div>
  )
}
