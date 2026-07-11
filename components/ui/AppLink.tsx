'use client'

import { useCallback } from 'react'
import type { MouseEvent } from 'react'
import { Link as NextLink } from 'next-view-transitions'
import { requestScrollReset } from './ScrollReset'

/**
 * Lien interne basé sur `next-view-transitions` (wrapper de `next/link` qui
 * déclenche `document.startViewTransition`) : active le morph des images
 * partagées (`viewTransitionName`) déjà posé dans globals.css et les pages
 * projets. Reduced-motion et navigateurs sans l'API retombent nativement
 * sur une navigation classique.
 */
function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  const target = event.currentTarget.getAttribute('target')
  return Boolean(
    (target && target !== '_self') ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button === 1
  )
}

export function Link(props: React.ComponentProps<typeof NextLink>) {
  const { href, onClick } = props

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      if (isModifiedEvent(event)) return
      if (typeof href !== 'string' || !href.startsWith('/')) return

      if (!href.includes('#')) {
        requestScrollReset()
      }
    },
    [onClick, href]
  )

  return <NextLink {...props} onClick={handleClick} />
}
