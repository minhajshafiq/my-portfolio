'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { useLoader } from '@/hooks/useLoader'

interface LoaderProps {
  children: ReactNode
}

const COMMANDS = [
  '> Initializing portfolio...',
  '> Loading interface...',
  '> Building experience...',
  '> Ready',
]

const TYPING_SPEED = 34
const COMMAND_PAUSE = 320
const START_DELAY = 260

export function Loader({ children }: LoaderProps) {
  const [localLoading, setLocalLoading] = useState(true)

  const { setLoading } = useLoader()

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const topBarRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!localLoading) return

    setLoading(true)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let currentCommand = 0
    let currentChar = 0
    const timeoutIds: ReturnType<typeof setTimeout>[] = []

    const addTimeout = (callback: () => void, delay: number) => {
      const timeoutId = setTimeout(callback, delay)
      timeoutIds.push(timeoutId)
      return timeoutId
    }

    const clearAllTimeouts = () => {
      timeoutIds.forEach(clearTimeout)
    }

    const setText = (value: string) => {
      if (textRef.current) {
        textRef.current.textContent = value
      }
    }

    const startExitAnimation = () => {
      if (
        !containerRef.current ||
        !contentRef.current ||
        !topBarRef.current ||
        !bottomBarRef.current
      ) {
        document.body.style.overflow = previousOverflow
        setLocalLoading(false)
        setLoading(false)
        return
      }

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.inOut',
        },
        onComplete: () => {
          document.body.style.overflow = previousOverflow
          setLocalLoading(false)
          setLoading(false)
        },
      })

      tl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -18,
          scale: 0.96,
          duration: 0.34,
          ease: 'power2.in',
        },
        0
      )
        .to(
          topBarRef.current,
          {
            yPercent: -100,
            duration: 0.82,
          },
          0.12
        )
        .to(
          bottomBarRef.current,
          {
            yPercent: 100,
            duration: 0.82,
          },
          0.12
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.22,
            ease: 'power2.out',
          },
          '-=0.12'
        )
    }

    const typeText = () => {
      if (!textRef.current) return

      if (currentCommand >= COMMANDS.length) {
        addTimeout(startExitAnimation, 420)
        return
      }

      const command = COMMANDS[currentCommand]

      if (currentChar < command.length) {
        setText(command.slice(0, currentChar + 1))
        currentChar += 1
        addTimeout(typeText, TYPING_SPEED)
        return
      }

      currentCommand += 1
      currentChar = 0

      if (currentCommand < COMMANDS.length) {
        addTimeout(() => {
          setText('')
          addTimeout(typeText, 120)
        }, COMMAND_PAUSE)
        return
      }

      addTimeout(startExitAnimation, 420)
    }

    const ctx = gsap.context(() => {
      gsap.set([topBarRef.current, bottomBarRef.current], {
        yPercent: 0,
      })

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 24,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(
        progressRef.current,
        {
          scaleX: 0,
          transformOrigin: 'left center',
        },
        {
          scaleX: 1,
          duration: 2.9,
          ease: 'power2.inOut',
        }
      )
    }, containerRef)

    addTimeout(typeText, START_DELAY)

    return () => {
      clearAllTimeouts()
      ctx.revert()
      document.body.style.overflow = previousOverflow
      setLoading(false)
    }
  }, [localLoading, setLoading])

  return (
    <>
      {children}

      {localLoading && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#07070a]"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Top panel */}
          <div
            ref={topBarRef}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#07070a]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(140,6,5,0.18),transparent_42%)]" />
          </div>

          {/* Bottom panel */}
          <div
            ref={bottomBarRef}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#07070a]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,113,113,0.12),transparent_42%)]" />
          </div>

          {/* Subtle grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.26)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.26)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8C0605]/18 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-140px] left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-red-400/10 blur-3xl" />

          {/* Content */}
          <div
            ref={contentRef}
            className="loader-content relative z-10 flex w-full max-w-[420px] flex-col items-center px-6"
          >
            {/* Logo */}
            <div className="relative mb-8 flex items-center justify-center">
              <div className="relative flex items-baseline gap-1">
                <span className="text-6xl font-black leading-none tracking-[-0.1em] text-white">
                  M
                </span>

                <span className="text-6xl font-black leading-none tracking-[-0.1em] text-red-400">
                  Z
                </span>

                <span className="ml-1 h-3 w-3 rounded-full bg-[#8C0605] shadow-[0_0_24px_rgba(248,113,113,0.7)]" />
              </div>
            </div>

            {/* Terminal */}
            <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12]/90 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27ca40]" />
                </div>

                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
                  portfolio.sh
                </span>
              </div>

              <div className="min-h-[92px] px-4 py-5">
                <div className="flex items-center font-mono text-sm text-green-400">
                  <span ref={textRef} />
                  <span className="ml-0.5 animate-pulse text-green-300">▊</span>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    ref={progressRef}
                    className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#8C0605] via-red-400 to-red-300"
                  />
                </div>
              </div>
            </div>

            {/* Bottom text */}
            <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.22em] text-white/35">
              Crafting digital experience
            </p>
          </div>
        </div>
      )}
    </>
  )
}