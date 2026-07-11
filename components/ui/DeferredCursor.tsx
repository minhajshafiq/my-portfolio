'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const CustomCursor = dynamic(
  () => import('./CustomCursor').then((module) => module.CustomCursor),
  { ssr: false }
)

/** Charge le curseur décoratif après le contenu principal, uniquement sur les
 * appareils qui disposent réellement d'une souris précise. */
export function DeferredCursor() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const enable = () => setEnabled(true)

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(enable, { timeout: 1200 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = globalThis.setTimeout(enable, 600)
    return () => globalThis.clearTimeout(timeoutId)
  }, [])

  return enabled ? <CustomCursor /> : null
}
