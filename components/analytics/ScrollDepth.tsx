'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/utils/analytics'

const THRESHOLDS = [25, 50, 75, 100]

/** Envoie un événement scroll_depth à 25/50/75/100 %, une fois par page vue. */
export function ScrollDepth() {
  const pathname = usePathname()

  useEffect(() => {
    const reached = new Set<number>()

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight

      if (scrollable <= 0) return

      const percent = Math.round((window.scrollY / scrollable) * 100)

      THRESHOLDS.forEach((threshold) => {
        if (percent >= threshold && !reached.has(threshold)) {
          reached.add(threshold)
          trackEvent('scroll_depth', { percent: threshold, page: pathname })
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  return null
}
