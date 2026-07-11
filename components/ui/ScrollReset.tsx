'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// AppLink pose ce flag au clic sur un lien. Le back/forward conserve ainsi la
// restauration native de position du navigateur.
let pendingReset = false

export function requestScrollReset() {
  pendingReset = true
}

export function ScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pendingReset) return

    pendingReset = false
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
