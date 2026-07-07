'use client'

import { useCallback } from 'react'
import type { MouseEvent } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useTransitionRouter } from 'next-view-transitions'
import { triggerPageCover, triggerPageReveal } from './PageTransition'
import { requestScrollReset } from './ScrollReset'

/**
 * Remplace le `Link` de next-view-transitions : mêmes props, mais déclenche
 * le rideau de transition (PageTransition) au lieu du simple fondu par défaut.
 * Exception : liste de projets <-> fiche projet, où le morph d'image partagé
 * (viewTransitionName) reste seul maître à bord.
 */
function isWorkFlow(pathname: string) {
  return /^\/[a-z]{2}\/work(\/|$)/.test(pathname)
}

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
  const router = useTransitionRouter()
  const pathname = usePathname()
  const { href, replace, scroll, onClick } = props

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e)
      if (e.defaultPrevented) return
      if (!('startViewTransition' in document)) return
      if (isModifiedEvent(e)) return
      if (typeof href !== 'string' || !href.startsWith('/')) return

      const targetPath = href.split(/[?#]/)[0]
      if (targetPath === pathname) return

      const navigate = replace ? router.replace : router.push

      // Nouvelle page = départ en haut, sauf lien vers une ancre (#...).
      // Le flag n'est posé qu'au clic : le back/forward garde la restauration
      // native de position du navigateur.
      if (!href.includes('#')) {
        requestScrollReset()
      }

      if (isWorkFlow(pathname) && isWorkFlow(targetPath)) {
        e.preventDefault()
        navigate(href, { scroll: scroll ?? true })
        return
      }

      e.preventDefault()
      triggerPageCover(() => {
        navigate(href, {
          scroll: scroll ?? true,
          onTransitionReady: () => triggerPageReveal(),
        })
      })
    },
    [onClick, href, replace, scroll, pathname, router]
  )

  return <NextLink {...props} onClick={handleClick} />
}
