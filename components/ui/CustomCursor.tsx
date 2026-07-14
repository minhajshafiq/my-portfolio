'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

type CursorVariant = 'default' | 'hover' | 'project' | 'cta' | 'external' | 'control'

type CursorIntent = {
  label: string
  variant: CursorVariant
}

const DEFAULT_CURSOR_INTENT: CursorIntent = {
  label: '',
  variant: 'default',
}

const HOVERABLE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'label',
  '[role="button"]',
  '[data-cursor-label]',
  '[data-cursor="hover"]',
  '.hoverable',
].join(',')

function isCursorVariant(value: string | undefined): value is CursorVariant {
  return Boolean(value && ['hover', 'project', 'cta', 'external', 'control'].includes(value))
}

/**
 * Le label du curseur vient uniquement de `data-cursor-label` (déjà traduit par
 * le composant qui le pose). Sans label explicite, l'anneau grossit simplement
 * sur les éléments interactifs, sans texte deviné ni langue hardcodée.
 */
function resolveCursorIntent(target: HTMLElement | null): CursorIntent {
  const hoverable = target?.closest<HTMLElement>(HOVERABLE_SELECTOR)

  if (!hoverable) return DEFAULT_CURSOR_INTENT

  const explicitLabel = hoverable.dataset.cursorLabel
  const explicitVariant = hoverable.dataset.cursorVariant

  return {
    label: explicitLabel ?? '',
    variant: isCursorVariant(explicitVariant) ? explicitVariant : 'hover',
  }
}

function getCursorRingClass(variant: CursorVariant, isClicking: boolean) {
  if (isClicking) {
    return 'h-7 w-7 scale-90 border-white bg-white/20'
  }

  if (variant === 'project') {
    return 'h-24 w-24 border-white bg-white/10'
  }

  if (variant === 'cta') {
    return 'h-20 w-20 border-red-300 bg-red-400/16 shadow-[0_0_34px_rgba(248,113,113,0.32)]'
  }

  if (variant === 'external') {
    return 'h-[4.5rem] w-[4.5rem] border-white bg-white/8'
  }

  if (variant === 'control') {
    return 'h-14 w-14 border-white/90 bg-white/8'
  }

  if (variant === 'hover') {
    return 'h-16 w-16 border-white bg-white/10'
  }

  return 'h-10 w-10 border-white bg-transparent'
}

function getDotClass(variant: CursorVariant, isClicking: boolean) {
  const size = variant === 'default' ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5'
  const color = variant === 'cta' ? 'bg-red-300' : 'bg-white'

  return `${size} ${color} ${isClicking ? 'scale-150' : 'scale-100'}`
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [cursorIntent, setCursorIntent] = useState<CursorIntent>(DEFAULT_CURSOR_INTENT)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (!isFinePointer || isTouchDevice || prefersReducedMotion) {
      setShouldRender(false)
      return
    }

    setShouldRender(true)
  }, [])

  useEffect(() => {
    if (!shouldRender) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const cursorLabel = cursorLabelRef.current

    if (!cursor || !cursorDot || !cursorLabel) return

    gsap.set([cursor, cursorDot, cursorLabel], {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      force3D: true,
    })

    const cursorX = gsap.quickTo(cursor, 'x', {
      duration: 0.45,
      ease: 'power3.out',
    })

    const cursorY = gsap.quickTo(cursor, 'y', {
      duration: 0.45,
      ease: 'power3.out',
    })

    const dotX = gsap.quickTo(cursorDot, 'x', {
      duration: 0.08,
      ease: 'power2.out',
    })

    const dotY = gsap.quickTo(cursorDot, 'y', {
      duration: 0.08,
      ease: 'power2.out',
    })

    const labelX = gsap.quickTo(cursorLabel, 'x', {
      duration: 0.32,
      ease: 'power3.out',
    })

    const labelY = gsap.quickTo(cursorLabel, 'y', {
      duration: 0.32,
      ease: 'power3.out',
    })

    const onMouseMove = (event: MouseEvent) => {
      setIsVisible(true)

      cursorX(event.clientX)
      cursorY(event.clientY)

      dotX(event.clientX)
      dotY(event.clientY)

      labelX(event.clientX + 42)
      labelY(event.clientY + 34)

      const target = event.target as HTMLElement | null
      const nextIntent = resolveCursorIntent(target)
      const nextIsHovering = nextIntent.variant !== 'default'

      setIsHovering(nextIsHovering)
      setCursorIntent((previousIntent) =>
        previousIntent.label === nextIntent.label && previousIntent.variant === nextIntent.variant
          ? previousIntent
          : nextIntent
      )
    }

    const onMouseDown = () => {
      setIsClicking(true)
    }

    const onMouseUp = () => {
      setIsClicking(false)
    }

    const onMouseLeave = () => {
      setIsVisible(false)
      setIsHovering(false)
      setIsClicking(false)
      setCursorIntent(DEFAULT_CURSOR_INTENT)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    const onWindowBlur = () => {
      setIsVisible(false)
      setIsHovering(false)
      setIsClicking(false)
      setCursorIntent(DEFAULT_CURSOR_INTENT)
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    window.addEventListener('blur', onWindowBlur)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('blur', onWindowBlur)
    }
  }, [shouldRender])

  if (!shouldRender) return null

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        aria-hidden="true"
      >
        <div
          className={[
            'rounded-full border transition-[width,height,background-color,border-color,box-shadow,transform] duration-200 ease-out',
            getCursorRingClass(cursorIntent.variant, isClicking),
          ].join(' ')}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        aria-hidden="true"
      >
        <div
          className={[
            'rounded-full transition-[width,height,background-color,transform,opacity] duration-200 ease-out',
            getDotClass(cursorIntent.variant, isClicking),
            isHovering ? 'opacity-90' : 'opacity-100',
          ].join(' ')}
        />
      </div>

      {/* Context label */}
      <div
        ref={cursorLabelRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] transition-[opacity,transform] duration-200 ease-out ${isVisible && isHovering && cursorIntent.label
          ? 'translate-y-0 opacity-100'
          : 'translate-y-2 opacity-0'
          }`}
        aria-hidden="true"
      >
        <div
          className={[
            'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md',
            cursorIntent.variant === 'cta'
              ? 'border-red-300/40 bg-red-400/18 text-red-100'
              : 'border-white/15 bg-black/45 text-white',
          ].join(' ')}
        >
          <span
            className={[
              'h-1.5 w-1.5 rounded-full',
              cursorIntent.variant === 'cta' ? 'bg-red-300' : 'bg-white',
            ].join(' ')}
          />
          {cursorIntent.label}
        </div>
      </div>

      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          html,
          body,
          a,
          button,
          input,
          textarea,
          select,
          label,
          [role='button'],
          [data-cursor-label],
          [data-cursor='hover'],
          .hoverable {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
