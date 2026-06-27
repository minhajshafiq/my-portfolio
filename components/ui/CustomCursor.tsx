'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const HOVERABLE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'label',
  '[role="button"]',
  '[data-cursor="hover"]',
  '.hoverable',
].join(',')

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

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

    if (!cursor || !cursorDot) return

    gsap.set([cursor, cursorDot], {
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

    const onMouseMove = (event: MouseEvent) => {
      setIsVisible(true)

      cursorX(event.clientX)
      cursorY(event.clientY)

      dotX(event.clientX)
      dotY(event.clientY)

      const target = event.target as HTMLElement | null
      const hoverable = target?.closest(HOVERABLE_SELECTOR)

      setIsHovering(Boolean(hoverable))
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
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    const onWindowBlur = () => {
      setIsVisible(false)
      setIsHovering(false)
      setIsClicking(false)
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
            'rounded-full border border-white transition-[width,height,background-color,border-color,transform] duration-200 ease-out',
            isClicking
              ? 'h-6 w-6 scale-90 bg-white/20'
              : isHovering
                ? 'h-16 w-16 bg-white/10'
                : 'h-10 w-10 bg-transparent',
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
            'rounded-full bg-white transition-[width,height,transform,opacity] duration-200 ease-out',
            isHovering ? 'h-2 w-2 opacity-80' : 'h-1.5 w-1.5 opacity-100',
            isClicking ? 'scale-150' : 'scale-100',
          ].join(' ')}
        />
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
          [data-cursor='hover'],
          .hoverable {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}