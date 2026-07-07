'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Link } from '@/components/ui/AppLink'
import { FaArrowRight } from 'react-icons/fa'
import { trackEvent } from '@/utils/analytics'
import { cn } from '@/utils/cn'
import { PROJECTS, type ProjectEntry } from '@/data/projects'
import { getLenis } from '@/components/ui/SmoothScroll'
import { didResetOnLastNavigation } from '@/components/ui/ScrollReset'

gsap.registerPlugin(ScrollTrigger)

// La restauration native du navigateur ne peut pas fonctionner ici : au retour,
// la page remonte sans la section épinglée (détection desktop différée), le
// scroll est restauré contre une page trop courte. On sauvegarde donc la
// progression du parcours nous-mêmes et on la restaure au back/forward.
const PROGRESS_KEY = 'work-journey-progress'

// La hauteur d'image est pilotée en vh (pas en aspect-ratio fixe) : sur un écran
// plus bas, l'image rétrécit avec le reste de la mise en scène au lieu de
// pousser la description et les tags hors du cadre épinglé.
function getPanelSizing(project: ProjectEntry, isLast: boolean) {
  if (project.featured) {
    return { width: 'w-[min(84vw,1040px)]', height: 'h-[38vh]' }
  }

  if (isLast) {
    return { width: 'w-[min(46vw,480px)]', height: 'h-[42vh]' }
  }

  return { width: 'w-[min(64vw,760px)]', height: 'h-[40vh]' }
}

/**
 * Traversée horizontale des projets : la section reste épinglée pendant que
 * les chapitres défilent latéralement. Un point rouge voyage sur un rail fixe
 * au-dessus des titres et « ouvre » chaque image (masque circulaire) au fil
 * de sa progression — la transition entre deux projets devient elle-même
 * la mise en scène, plutôt qu'un simple empilement.
 *
 * Ne monte que côté client, quand la souris fine et `prefers-reduced-motion`
 * le permettent (cf. WorkList) : la liste verticale reste le fallback accessible.
 */
export function WorkHorizontalJourney({
  tr,
  locale,
  visitLabel,
}: {
  tr: (key: string) => string
  locale: string
  visitLabel: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([])
  const panelRefs = useRef<Array<HTMLDivElement | null>>([])
  const maskRefs = useRef<Array<HTMLDivElement | null>>([])

  const [activeIndex, setActiveIndex] = useState(0)

  /**
   * Calcule, à partir des positions réelles des panneaux, le décalage de piste
   * qui centre chacun d'eux à l'écran (`targetX`) et la progression de scroll
   * à laquelle ce centrage doit se produire (`progressAt`, pondérée par la
   * distance réelle à parcourir). Résultat : le tout premier projet est déjà
   * centré à progress=0, le dernier l'est exactement à progress=1.
   */
  const getLayout = () => {
    const centers = panelRefs.current.map((panel) =>
      panel ? panel.offsetLeft + panel.offsetWidth / 2 : 0
    )
    const targetX = centers.map((center) => window.innerWidth / 2 - center)

    const travels = targetX.slice(0, -1).map((x, i) => Math.abs(x - targetX[i + 1]))
    const totalTravel = travels.reduce((sum, d) => sum + d, 0) || 1

    let acc = 0
    const progressAt = [0]
    travels.forEach((d) => {
      acc += d
      progressAt.push(acc / totalTravel)
    })

    const chipXs = chipRefs.current.map((chip) => chip?.offsetLeft ?? 0)

    return { targetX, progressAt, totalTravel, chipXs }
  }

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    if (!section || !track) return

    // Positionne immédiatement le premier projet au centre, avant le premier
    // scroll — évite un flash où la piste démarre décalée.
    gsap.set(track, { x: getLayout().targetX[0] ?? 0 })

    // Le composant monte un tick après l'hydratation (media query) et le layout
    // bouge encore (fonts, reveal du header au-dessus) : sans refresh, le pin
    // démarre parfois au mauvais scroll et la traversée semble ne pas se lancer.
    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(refresh)
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    let lastActiveIndex = -1

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${getLayout().totalTravel}`,
      scrub: 0.4,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const { targetX, progressAt, chipXs } = getLayout()
        const last = targetX.length - 1

        // Segment [k, k+1] dans lequel se trouve la progression actuelle.
        let k = 0
        for (let i = 0; i < progressAt.length - 1; i++) {
          if (self.progress >= progressAt[i]) k = i
        }

        const segStart = progressAt[k]
        const segEnd = progressAt[k + 1] ?? segStart + 0.0001
        const localT = gsap.utils.clamp(0, 1, (self.progress - segStart) / (segEnd - segStart || 1))

        gsap.set(track, { x: gsap.utils.interpolate(targetX[k], targetX[Math.min(k + 1, last)], localT) })

        const nextActive = localT < 0.5 ? k : Math.min(k + 1, last)

        if (nextActive !== lastActiveIndex) {
          lastActiveIndex = nextActive
          setActiveIndex(nextActive)
        }

        if (dotRef.current) {
          const nextChipX = chipXs[Math.min(k + 1, last)] ?? chipXs[k]
          gsap.set(dotRef.current, { x: gsap.utils.interpolate(chipXs[k], nextChipX, localT) })
        }

        // Chaque image ne se révèle que pendant sa propre transition d'entrée/sortie :
        // au milieu d'un segment, la précédente est à 50% et la suivante à 50% ;
        // à la fin, l'image centrée est à 100% et les autres à 0%. Le point d'origine
        // du masque balaie l'image de gauche à droite (plutôt qu'un point fixe en haut) :
        // il traverse chaque image en la révélant, puis poursuit sa course hors cadre
        // pendant que l'image se referme derrière lui.
        maskRefs.current.forEach((mask, index) => {
          if (!mask) return

          let reveal = 0
          let originX = 50

          if (index === k) {
            reveal = 1 - localT
            originX = 94 + localT * 40
          } else if (index === k + 1) {
            reveal = localT
            originX = 6 + localT * 88
          }

          // 0% tant que l'image n'est pas concernée par la transition en cours —
          // sinon un point résiduel reste visible avant même que son tour arrive.
          const radius = reveal * 156

          mask.style.clipPath = `circle(${radius}% at ${originX}% 50%)`
        })
      },
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', refresh)
      st.kill()
    }
  }, [])

  const goToPanel = (index: number) => {
    const st = ScrollTrigger.getAll().find((trigger) => trigger.trigger === sectionRef.current)

    if (!st) return

    const { progressAt } = getLayout()
    const fraction = progressAt[index] ?? 0
    const targetScroll = st.start + fraction * (st.end - st.start)

    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-custom-primary">
      {/* Rail : reprend le langage du rail vertical du site (trait fin + puces
          circulaires bordées) plutôt qu'un composant générique type pilule,
          strictement centré et indépendant de la largeur variable des panneaux. */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(6rem+3vh)] z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <div ref={railRef} className="pointer-events-auto relative flex items-center gap-8">
          <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-custom-border/50" />

          {PROJECTS.map((project, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={project.key}
                ref={(el) => {
                  chipRefs.current[index] = el
                }}
                type="button"
                onClick={() => goToPanel(index)}
                className={cn(
                  'relative flex h-8 w-8 items-center justify-center rounded-full border bg-custom-primary/80 backdrop-blur-md transition-[border-color,color,transform] duration-300 ease-out',
                  isActive
                    ? 'scale-110 border-[#8C0605] text-[#8C0605] dark:border-red-400 dark:text-red-400'
                    : 'border-custom/50 text-custom-muted hover:border-custom'
                )}
                aria-label={tr(`projects.${project.key}.title`)}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="font-serif text-[11px] font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            )
          })}

          {/* Point voyageur — glisse d'une puce à l'autre sur le trait fin */}
          <span
            ref={dotRef}
            className="pointer-events-none absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8C0605] shadow-[0_0_14px_rgba(140,6,5,0.45)] will-change-transform dark:bg-red-400"
            aria-hidden="true"
          />
        </div>

        {/* Légende du chapitre actif */}
        <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-custom-muted">
          {String(activeIndex + 1).padStart(2, '0')} — {tr(`projects.${PROJECTS[activeIndex].key}.title`)}
        </span>
      </div>

      {/* Piste horizontale — alignée en haut avec un espace fixe sous le rail :
          les panneaux ont des hauteurs différentes (variante signature plus grande),
          un centrage vertical les ferait empiéter sur le rail selon lequel est actif.
          Le décalage réutilise la même formule que le `top` du rail (6rem+3vh) plus
          une marge fixe, pour que l'écart entre les deux reste constant à toute
          hauteur d'écran — un clamp() avec un plafond fixe finissait par se faire
          rattraper par le rail sur les écrans plus hauts. */}
      <div className="flex h-full items-start overflow-visible pt-[calc(6rem+3vh+6.25rem)]">
        <div
          ref={trackRef}
          className="flex items-start gap-[6vw] px-[12vw] will-change-transform"
        >
          {PROJECTS.map((project, index) => {
            const isLast = index === PROJECTS.length - 1
            const { width, height } = getPanelSizing(project, isLast)
            const isActive = index === activeIndex

            return (
              <div
                key={project.key}
                ref={(el) => {
                  panelRefs.current[index] = el
                }}
                className={cn(
                  'group shrink-0 transition-[opacity,filter,transform] duration-500 ease-out',
                  width,
                  isActive ? 'opacity-100 saturate-100' : 'opacity-40 saturate-[0.2]'
                )}
              >
                <Link
                  href={`/${locale}/work/${project.slug}`}
                  onClick={() => trackEvent('project_view', { project: project.slug, source: 'work_journey' })}
                  aria-label={`${tr(`projects.${project.key}.title`)} — ${visitLabel}`}
                  className="block"
                >
                  {/* Numéro, catégorie et titre passent AU-DESSUS de l'image plutôt qu'en
                      surimpression : les captures des sites réels portent déjà leur propre
                      texte, et un calque de légende par-dessus finissait par s'y superposer. */}
                  <div className="mb-3 flex items-baseline gap-4">
                    <span className="font-serif text-sm font-medium text-[#8C0605] dark:text-red-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-custom-muted">
                      {tr(`projects.${project.key}.category`)}
                    </span>
                  </div>

                  <h3 className="mb-4 font-serif text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-custom-title md:text-[clamp(1.7rem,2.4vw,2.3rem)]">
                    {tr(`projects.${project.key}.title`)}
                  </h3>

                  <div
                    className={cn(
                      'relative w-full overflow-hidden rounded-2xl border border-custom/40 bg-custom-secondary transition-shadow duration-500 ease-out',
                      'group-hover:shadow-[0_36px_80px_-24px_rgba(140,6,5,0.4)]',
                      height
                    )}
                    style={{ viewTransitionName: `project-image-${project.slug}` }}
                  >
                    <div
                      ref={(el) => {
                        maskRefs.current[index] = el
                      }}
                      className="absolute inset-0"
                      style={{ clipPath: index === 0 ? 'circle(156% at 94% 50%)' : 'circle(0% at 50% 50%)' }}
                    >
                      <Image
                        src={project.image}
                        alt={tr(`projects.${project.key}.title`)}
                        fill
                        sizes="(min-width: 1024px) 70vw, 90vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-6">
                    <p className="max-w-[38ch] text-sm leading-6 text-custom-secondary md:text-[15px] md:leading-7">
                      {tr(`projects.${project.key}.description`)}
                    </p>

                    <span className="inline-flex flex-none items-center gap-2 text-sm font-bold text-custom-title">
                      <span className="relative">
                        {visitLabel}
                        <span className="absolute -bottom-1 left-0 h-px w-full bg-custom-title/25 transition-colors duration-300 group-hover:bg-[#8C0605] dark:group-hover:bg-red-400" />
                      </span>
                      <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#8C0605] dark:group-hover:text-red-400" />
                    </span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium uppercase tracking-[0.14em] text-custom-muted transition-colors duration-300 group-hover:text-custom-title"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
