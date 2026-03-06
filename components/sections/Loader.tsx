'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { useLoader } from '@/hooks/useLoader'

interface LoaderProps {
  children: React.ReactNode
}

export function Loader({ children }: LoaderProps) {
  const [localLoading, setLocalLoading] = useState(true)
  const { setLoading } = useLoader()
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setLoading(true)
    document.body.style.overflow = 'hidden'

    const commands = [
      '> npm run dev',
      '> Building portfolio...',
      '> Ready'
    ]

    let currentCommand = 0
    let currentChar = 0
    const typingSpeed = 50

    const typeText = () => {
      if (!textRef.current) return

      if (currentCommand < commands.length) {
        const command = commands[currentCommand]

        if (currentChar < command.length) {
          textRef.current.textContent = command.slice(0, currentChar + 1)
          currentChar++
          setTimeout(typeText, typingSpeed)
        } else {
          // Pause entre les commandes
          currentChar = 0
          currentCommand++
          if (currentCommand < commands.length) {
            setTimeout(() => {
              if (textRef.current) {
                textRef.current.textContent = ''
              }
              setTimeout(typeText, 200)
            }, 400)
          } else {
            // Animation finale
            setTimeout(startExitAnimation, 300)
          }
        }
      }
    }

    const startExitAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'unset'
          setLocalLoading(false)
          setLoading(false)
        }
      })

      // Les barres se séparent
      tl.to('.loader-bar-top', {
        y: '-100%',
        duration: 0.6,
        ease: 'power3.inOut'
      }, 0)
      .to('.loader-bar-bottom', {
        y: '100%',
        duration: 0.6,
        ease: 'power3.inOut'
      }, 0)
      .to('.loader-content', {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in'
      }, 0)
      .to('.loader-container', {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out'
      })
    }

    // Démarrer l'animation après un court délai
    const startTimeout = setTimeout(() => {
      typeText()
    }, 300)

    return () => {
      clearTimeout(startTimeout)
      document.body.style.overflow = 'unset'
    }
  }, [setLoading])

  if (!localLoading) {
    return <>{children}</>
  }

  return (
    <div
      ref={containerRef}
      className="loader-container fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Barre supérieure */}
      <div className="loader-bar-top absolute top-0 left-0 right-0 h-1/2 bg-[#121212]" />

      {/* Barre inférieure */}
      <div className="loader-bar-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-[#121212]" />

      {/* Contenu central */}
      <div className="loader-content relative z-10 flex flex-col items-center gap-6">
        {/* Logo/Initiales */}
        <div className="flex items-center gap-1">
          <span className="text-5xl font-black text-white tracking-tighter">
            M
          </span>
          <span className="text-5xl font-black text-[#8C0605] tracking-tighter">
            Z
          </span>
        </div>

        {/* Terminal */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 min-w-[280px] border border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
          </div>
          <div className="font-mono text-sm text-green-400 flex items-center">
            <span ref={textRef}></span>
            <span className="animate-pulse ml-0.5">▊</span>
          </div>
        </div>
      </div>
    </div>
  )
}
