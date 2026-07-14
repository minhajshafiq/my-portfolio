/**
 * Presets motion partagés : une seule courbe et un seul reveal pour tout le site.
 * GSAP garde ses timelines locales ; ceci ne concerne que les fades Framer Motion.
 */

/** Courbe signature du site (easeOutCubic adoucie), même valeur que les eases GSAP power3.out. */
export const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const

/** Reveal standard : translation courte + fondu. Utilisé avec whileInView + viewport once. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}
