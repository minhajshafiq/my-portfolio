'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getLenis } from './SmoothScroll'

// next-view-transitions ne remet pas le scroll en haut à la navigation.
// AppLink pose ce flag au clic sur un lien (jamais au back/forward : la
// restauration native du navigateur reste intacte) ; il est consommé ici,
// une fois la nouvelle page montée.
let pendingReset = false
let resetDoneForNav = false

export function requestScrollReset() {
  pendingReset = true
}

/**
 * True si la dernière navigation était un clic de lien (reset vers le haut),
 * false pour un back/forward ou un chargement direct — permet aux sections
 * épinglées (traversée work) de savoir si elles doivent restaurer leur progression.
 */
export function didResetOnLastNavigation() {
  return resetDoneForNav
}

export function ScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    resetDoneForNav = pendingReset

    if (!pendingReset) return

    pendingReset = false

    // Passer par Lenis quand il tourne : un window.scrollTo seul se fait
    // rattraper par sa position interne (visible sur les gros scrolls,
    // ex. la traversée work épinglée).
    const lenis = getLenis()

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
