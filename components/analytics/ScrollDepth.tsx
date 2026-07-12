'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

const THRESHOLDS = [25, 50, 75, 100]

/** Envoie un événement scroll_depth à 25/50/75/100 %, une fois par page vue. */
export function ScrollDepth() {
  const pathname = usePathname()

  useEffect(() => {
    const reached = new Set<number>()
    let frameId: number | null = null

    const evaluateDepth = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return

      const percent = Math.round((window.scrollY / scrollable) * 100)

      for (const threshold of THRESHOLDS) {
        if (percent < threshold || reached.has(threshold)) continue

        reached.add(threshold)
        trackEvent('scroll_depth', { percent: threshold, page: pathname })
      }

      if (reached.size === THRESHOLDS.length) {
        window.removeEventListener('scroll', onScroll)
      }
    }

    const onScroll = () => {
      if (frameId !== null) return

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        evaluateDepth()
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [pathname])

  return null
}
