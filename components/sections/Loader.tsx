'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { useLoader } from '@/hooks/useLoader'

interface LoaderProps {
  children: ReactNode
}

const NAME = 'Minhaj Zubair'

export function Loader({ children }: LoaderProps) {
  const [localLoading, setLocalLoading] = useState(true)

  const { setLoading } = useLoader()

  const containerRef = useRef<HTMLDivElement>(null)
  const topBarRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!localLoading) return

    setLoading(true)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let isDone = false

    const finishLoader = () => {
      if (isDone) return

      isDone = true
      document.body.style.overflow = previousOverflow
      setLocalLoading(false)
      setLoading(false)
    }

    // Garde-fou : si les animations ne se déclenchent pas (onglet en arrière-plan,
    // rAF indisponible), le site doit rester accessible
    const failSafe = window.setTimeout(finishLoader, 4500)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      const timeout = window.setTimeout(finishLoader, 350)

      return () => {
        window.clearTimeout(timeout)
        window.clearTimeout(failSafe)
        document.body.style.overflow = previousOverflow
        setLoading(false)
      }
    }

    const ctx = gsap.context(() => {
      const chars = nameRef.current?.querySelectorAll('[data-char]')

      if (!chars || !containerRef.current) {
        finishLoader()
        return
      }

      // Le header peut ne pas être encore monté (flag hydration-safe `mounted`
      // du thème) au moment où cet effet tourne : mesurer sa position tout de
      // suite serait une course. Les valeurs de la tween ci-dessous sont donc
      // des fonctions, évaluées par GSAP au moment réel du départ du tween
      // (~1.3s plus tard), quand le header est certainement dans le DOM.
      let handoffCache: { dx: number; dy: number; scale: number } | null = null

      const getHandoff = () => {
        if (handoffCache) return handoffCache

        const logoDot = document.querySelector<HTMLElement>('[data-logo-dot]')

        if (!logoDot || !dotRef.current) {
          handoffCache = { dx: 0, dy: -18, scale: 1 }
          return handoffCache
        }

        const from = dotRef.current.getBoundingClientRect()
        const to = logoDot.getBoundingClientRect()

        handoffCache = {
          dx: to.left + to.width / 2 - (from.left + from.width / 2),
          dy: to.top + to.height / 2 - (from.top + from.height / 2),
          scale: to.width / from.width,
        }

        return handoffCache
      }

      gsap.set(chars, { yPercent: 120 })
      gsap.set(dotRef.current, { scale: 0 })
      gsap.set(lineRef.current, { scaleX: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: finishLoader,
      })

      tl.to(chars, {
        yPercent: 0,
        duration: 0.7,
        stagger: 0.028,
      })
        .to(dotRef.current, { scale: 1, duration: 0.35, ease: 'back.out(2.2)' }, '-=0.25')
        .to(lineRef.current, { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, '<')
        .addLabel('exit', '+=0.35')
        .to(
          [nameRef.current, lineRef.current],
          { opacity: 0, y: -18, duration: 0.4, ease: 'power2.in' },
          'exit'
        )

      // Le point ne s'efface pas avec le reste : il rejoint la position exacte du
      // point du logo dans le header, pour que l'intro se prolonge dans le site
      // plutôt que de simplement disparaître — une seule continuité, pas un motif
      // répété partout.
      tl.to(
        dotRef.current,
        {
          x: () => getHandoff().dx,
          y: () => getHandoff().dy,
          scale: () => getHandoff().scale,
          duration: 0.7,
          ease: 'power3.inOut',
        },
        'exit'
      ).to(dotRef.current, { opacity: 0, duration: 0.15 }, 'exit+=0.6')

      tl.to(topBarRef.current, { yPercent: -100, duration: 0.85, ease: 'power3.inOut' }, 'exit+=0.35')
        .to(bottomBarRef.current, { yPercent: 100, duration: 0.85, ease: 'power3.inOut' }, '<')
        .to(containerRef.current, { opacity: 0, duration: 0.2 }, '-=0.15')
    }, containerRef)

    return () => {
      window.clearTimeout(failSafe)
      ctx.revert()
      document.body.style.overflow = previousOverflow
      setLoading(false)
    }
  }, [localLoading, setLoading])

  return (
    <>
      {children}

      {localLoading && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Top panel */}
          <div
            ref={topBarRef}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#141210]"
          />

          {/* Bottom panel */}
          <div
            ref={bottomBarRef}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#141210]"
          />

          {/* Wordmark */}
          <div className="relative z-10 flex flex-col items-center gap-5 px-6">
            <div className="flex items-baseline">
              <div
                ref={nameRef}
                className="flex overflow-hidden font-serif text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-[#FAF7F2] sm:text-5xl md:text-6xl"
              >
                {NAME.split('').map((char, index) => (
                  <span key={`${char}-${index}`} data-char className="inline-block whitespace-pre">
                    {char}
                  </span>
                ))}
              </div>

              <span
                ref={dotRef}
                className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-[#8C0605] sm:h-3 sm:w-3"
              />
            </div>

            <div
              ref={lineRef}
              className="h-px w-40 origin-left bg-[#FAF7F2]/25 sm:w-56"
            />
          </div>
        </div>
      )}
    </>
  )
}
