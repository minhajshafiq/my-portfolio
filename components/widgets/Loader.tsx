'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useLoader } from '@/hooks/useLoader'

interface LoaderProps {
  children: React.ReactNode
  duration?: number
}

export function Loader({ children }: LoaderProps) {
  const [localLoading, setLocalLoading] = useState(true)
  const { setLoading } = useLoader()

  useEffect(() => {

    setLoading(true)
    

    document.body.style.overflow = 'hidden'


    const tl = gsap.timeline({
      onComplete: () => {

        document.body.style.overflow = 'unset'
        setLocalLoading(false)
        setLoading(false)
      }
    })


    tl.to('.loader-dot', {
      y: -80,
      duration: 0.4,
      ease: "back.out(1.7)"
    })
    .to('.loader-dot', {
      y: 0,
      duration: 0.4,
      ease: "bounce.out"
    })
    .to('.loader-dot', {
      y: -60,
      duration: 0.35,
      ease: "back.out(1.5)"
    })
    .to('.loader-dot', {
      y: 0,
      duration: 0.35,
      ease: "bounce.out"
    })
    .to('.loader-dot', {
      y: -30,
      duration: 0.3,
      ease: "back.out(1.3)"
    })
    .to('.loader-dot', {
      y: 0,
      duration: 0.3,
      ease: "bounce.out"
    })

    .to('.loader-dot', {
      backgroundColor: 'transparent',
      borderWidth: '4px',
      borderColor: '#8C0605',
      width: '24px',
      height: '24px',
      duration: 0.2,
      ease: "power2.out"
    })

    .to('.loader-dot', {
      scale: 200,
      duration: 1,
      ease: "power2.inOut"
    })

    .to('.loader-container', {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    })


    return () => {
      tl.kill()
      document.body.style.overflow = 'unset'
    }
  }, [setLoading])

  if (!localLoading) {
    return <>{children}</>
  }

  return (
    <div className="loader-container fixed inset-0 z-50 flex items-center justify-center bg-[#EDEDED] dark:bg-[#121212]">
      <div 
        className="loader-dot w-5 h-5 bg-[#8C0605] rounded-full border-0"
        style={{
          transformOrigin: 'center'
        }}
      />
    </div>
  )
}
