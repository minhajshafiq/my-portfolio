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

const TYPING_SPEED = 30
const COMMAND_PAUSE = 260
const START_DELAY = 420

export function Loader({ children }: LoaderProps) {
  const [localLoading, setLocalLoading] = useState(true)
  const [lines, setLines] = useState<string[]>([])
  const [activeText, setActiveText] = useState('')

  const { setLoading } = useLoader()

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const topBarRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!localLoading) return

    setLoading(true)
    setLines([])
    setActiveText('')

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let currentCommand = 0
    let currentChar = 0
    let isCancelled = false

    const timeoutIds: ReturnType<typeof setTimeout>[] = []

    const addTimeout = (callback: () => void, delay: number) => {
      const timeoutId = setTimeout(() => {
        if (!isCancelled) callback()
      }, delay)

      timeoutIds.push(timeoutId)
      return timeoutId
    }

    const clearAllTimeouts = () => {
      timeoutIds.forEach(clearTimeout)
    }

    const finishLoader = () => {
      document.body.style.overflow = previousOverflow
      setLocalLoading(false)
      setLoading(false)
    }

    const startExitAnimation = () => {
      if (
        !containerRef.current ||
        !contentRef.current ||
        !topBarRef.current ||
        !bottomBarRef.current
      ) {
        finishLoader()
        return
      }

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.inOut',
        },
        onComplete: finishLoader,
      })

      tl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -24,
          scale: 0.94,
          filter: 'blur(10px)',
          duration: 0.42,
          ease: 'power2.in',
        },
        0
      )
        .to(
          topBarRef.current,
          {
            yPercent: -100,
            duration: 0.9,
          },
          0.14
        )
        .to(
          bottomBarRef.current,
          {
            yPercent: 100,
            duration: 0.9,
          },
          0.14
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.28,
            ease: 'power2.out',
          },
          '-=0.18'
        )
    }

    const typeText = () => {
      if (currentCommand >= COMMANDS.length) {
        addTimeout(startExitAnimation, 480)
        return
      }

      const command = COMMANDS[currentCommand]

      if (currentChar < command.length) {
        setActiveText(command.slice(0, currentChar + 1))
        currentChar += 1
        addTimeout(typeText, TYPING_SPEED)
        return
      }

      setLines((previousLines) => [...previousLines, command])
      setActiveText('')

      currentCommand += 1
      currentChar = 0

      if (currentCommand < COMMANDS.length) {
        addTimeout(typeText, COMMAND_PAUSE)
        return
      }

      addTimeout(startExitAnimation, 520)
    }

    const ctx = gsap.context(() => {
      gsap.set([topBarRef.current, bottomBarRef.current], {
        yPercent: 0,
      })

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: 'blur(14px)',
      })

      gsap.set(logoRef.current, {
        opacity: 0,
        y: 18,
        scale: 0.88,
        rotateX: -18,
      })

      gsap.set(terminalRef.current, {
        opacity: 0,
        y: 24,
        scale: 0.97,
      })

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.7,
      })
        .to(
          logoRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.72,
          },
          '-=0.42'
        )
        .to(
          terminalRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.68,
          },
          '-=0.38'
        )

      gsap.to(logoRef.current, {
        y: -4,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, containerRef)

    addTimeout(typeText, START_DELAY)

    return () => {
      isCancelled = true
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
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#07070a_0%,#09090d_48%,#050507_100%)]"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Top panel */}
          <div
            ref={topBarRef}
            className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,#07070a_0%,#09090d_100%)]"
          />

          {/* Bottom panel */}
          <div
            ref={bottomBarRef}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,#09090d_0%,#050507_100%)]"
          />

          {/* Content */}
          <div
            ref={contentRef}
            className="relative z-10 flex w-full max-w-[430px] flex-col items-center px-6"
          >
            {/* Logo */}
            <div
              ref={logoRef}
              className="relative mb-8 flex items-center justify-center"
            >
              <div className="relative flex items-baseline gap-1">
                <span className="text-6xl font-black leading-none tracking-[-0.1em] text-white">
                  M
                </span>

                <span className="text-6xl font-black leading-none tracking-[-0.1em] text-red-400">
                  Z
                </span>

                <span className="ml-1 h-3 w-3 rounded-full bg-[#8C0605]" />
              </div>
            </div>

            {/* Terminal */}
            <div
              ref={terminalRef}
              className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12]/90 shadow-[0_28px_100px_rgba(0,0,0,0.48)] backdrop-blur-xl"
            >
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

              <div className="min-h-[142px] px-4 py-5">
                <div className="space-y-2 font-mono text-sm">
                  {lines.map((line) => (
                    <div key={line} className="text-green-400/70">
                      {line}
                    </div>
                  ))}

                  <div className="flex items-center text-green-400">
                    <span>{activeText}</span>
                    <span className="ml-0.5 animate-pulse text-green-300">
                      ▊
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}