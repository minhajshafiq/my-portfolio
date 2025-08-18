import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation d'entrée pour les éléments
export const fadeInUp = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
    }
  )
}

// Animation de stagger pour les listes
export const staggerFadeIn = (elements: string | Element[], stagger = 0.1) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      ease: 'power2.out',
    }
  )
}

// Animation de parallaxe
export const parallaxEffect = (element: string | Element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// Animation de texte typewriter
export const typewriterEffect = (element: string | Element, text: string, speed = 0.05) => {
  const chars = text.split('')
  const timeline = gsap.timeline()
  
  chars.forEach((char, index) => {
    timeline.to(element, {
      duration: speed,
      onUpdate: () => {
        if (typeof element === 'string') {
          const el = document.querySelector(element)
          if (el) el.textContent = chars.slice(0, index + 1).join('')
        } else {
          element.textContent = chars.slice(0, index + 1).join('')
        }
      },
    })
  })
  
  return timeline
}

// Animation de counter
export const counterAnimation = (element: string | Element, endValue: number, duration = 2) => {
  return gsap.to(element, {
    duration,
    innerHTML: endValue,
    snap: { innerHTML: 1 },
    ease: 'power2.out',
  })
}

// Animation de morphing pour les formes
export const morphShape = (element: string | Element, morphTo: string) => {
  return gsap.to(element, {
    morphSVG: morphTo,
    duration: 1,
    ease: 'power2.inOut',
  })
}

// Animation de scroll progress
export const scrollProgress = (element: string | Element) => {
  return gsap.to(element, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (typeof element === 'string') {
          const el = document.querySelector(element) as HTMLElement
          if (el) el.style.transform = `scaleX(${self.progress})`
        } else {
          (element as HTMLElement).style.transform = `scaleX(${self.progress})`
        }
      },
    },
  })
}

// Nettoyer les animations GSAP
export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  gsap.killTweensOf('*')
}

export default gsap
