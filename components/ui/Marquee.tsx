'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from '@/hooks/useTranslation'

/** Bande défilante en serif géant — alternance texte plein / contour. */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation()

  const rawItems = t('marquee.items', { returnObjects: true })
  const items: string[] = Array.isArray(rawItems) ? rawItems.map(String) : []

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !trackRef.current) return

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [items.length])

  if (items.length === 0) return null

  const renderTrack = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-baseline"
    >
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex shrink-0 items-baseline">
          <span
            className={
              index % 2 === 0
                ? 'font-serif text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-none tracking-[-0.02em] text-custom-title'
                : 'font-serif text-[clamp(2.6rem,7vw,5.5rem)] font-medium italic leading-none tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_var(--color-text-title)]'
            }
          >
            {item}
          </span>

          <span className="mx-[clamp(1.5rem,3vw,3rem)] inline-block h-[0.45em] w-[0.45em] shrink-0 translate-y-[-0.1em] rounded-full bg-[#8C0605] dark:bg-red-400" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative overflow-hidden border-y border-custom bg-custom-primary py-[clamp(2rem,4vw,3.5rem)]">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {renderTrack(false)}
        {renderTrack(true)}
      </div>
    </div>
  )
}
