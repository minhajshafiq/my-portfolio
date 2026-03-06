'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)

      // Main cursor follows with slight delay
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      })

      // Dot follows immediately
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      })
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    // Detect hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .hoverable'
      )

      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    // Add hover listeners after a small delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100)

    // Re-add hover listeners when DOM changes
    const observer = new MutationObserver(() => {
      addHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      observer.disconnect()
    }
  }, [isVisible])

  // Don't render on touch devices
  if (typeof window !== 'undefined') {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return null
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border-2 border-white transition-all duration-200 ${
            isHovering
              ? 'w-16 h-16 bg-white/10'
              : isClicking
              ? 'w-6 h-6'
              : 'w-10 h-10'
          }`}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            isHovering ? 'w-2 h-2' : 'w-1.5 h-1.5'
          }`}
        />
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
