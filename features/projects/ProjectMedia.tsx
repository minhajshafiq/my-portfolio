'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import type { ProjectEntry } from '@/data/projects'

type ProjectMediaProps = {
  project: ProjectEntry
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}

/** Image et vidéo partagent strictement le même cadre. `object-contain` :
 * la capture (texte en plein cadre) est montrée en entier, jamais recadrée ;
 * le conteneur peut être plus étroit que le ratio 16:9 sans couper le menu.
 * Les bords éventuels tombent sur le `bg-black` du wrapper. */
const MEDIA_CLASSNAME =
  'absolute inset-0 block h-full w-full object-contain object-center transition-opacity duration-500 ease-out'

/** Le cadrage de la vidéo/poster est piloté ici (object-contain, pas de zoom) :
 * on retire donc de l'appelant tout ce qui l'écraserait : recadrage
 * (object-*), zoom (scale-*) et transitions concurrentes. */
function stripMediaOverrides(classes?: string) {
  return classes
    ?.split(' ')
    .filter(
      (token) =>
        !token.startsWith('object-') &&
        !token.includes('scale-') &&
        !/^(transition|duration|ease)-/.test(token)
    )
    .join(' ')
}

export function ProjectMedia({
  project,
  alt,
  sizes,
  priority = false,
  className,
}: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoActive, setIsVideoActive] = useState(false)

  useEffect(() => {
    const video = videoRef.current

    if (!video || !project.video) return

    const hoverTarget = video.closest('a') ?? video.parentElement

    if (!hoverTarget) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const playVideo = () => {
      if (prefersReducedMotion.matches) return

      setIsVideoActive(true)
      void video.play().catch(() => undefined)
    }

    const pauseVideo = () => {
      video.pause()
      video.currentTime = 0
      setIsVideoActive(false)
    }

    hoverTarget.addEventListener('mouseenter', playVideo)
    hoverTarget.addEventListener('mouseleave', pauseVideo)
    hoverTarget.addEventListener('focusin', playVideo)
    hoverTarget.addEventListener('focusout', pauseVideo)

    return () => {
      hoverTarget.removeEventListener('mouseenter', playVideo)
      hoverTarget.removeEventListener('mouseleave', pauseVideo)
      hoverTarget.removeEventListener('focusin', playVideo)
      hoverTarget.removeEventListener('focusout', pauseVideo)
    }
  }, [project.video])

  if (project.video) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-black">
        <Image
          src={project.image}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(MEDIA_CLASSNAME, stripMediaOverrides(className), isVideoActive ? 'opacity-0' : 'opacity-100')}
        />

        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={project.image}
          aria-label={alt}
          className={cn(MEDIA_CLASSNAME, stripMediaOverrides(className), isVideoActive ? 'opacity-100' : 'opacity-0')}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <Image
      src={project.image}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  )
}
