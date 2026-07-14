export type ProjectEntry = {
  /** Clé de traduction sous `projects.<key>` */
  key: string
  slug: string
  image: string
  video?: string
  demo: string
  github: string | null
  technologies: string[]
  /** Badges de preuve : clés de traduction sous `work.badges.<badge>` */
  badges?: string[]
  /** Résultat factuel mis en avant : clé sous `projects.<key>.results` */
  proof?: string
  /** Affiché sur la home (4 max) */
  home?: boolean
  /** Projet montré seul dans le hero : un site client, première preuve vue par un prospect */
  hero?: boolean
  /** Mis en avant comme projet signature sur la page Work (traitement plein cadre) */
  featured?: boolean
}

export const PROJECTS: ProjectEntry[] = [
  {
    key: 'photographe',
    slug: 'photographe',
    image: '/photos/photographe.png',
    video: '/photograph.mp4',
    demo: 'https://photograph-portfolio-five.vercel.app/',
    github: null,
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    badges: ['showcase', 'seo_local'],
    proof: 'gallery',
    home: true,
  },
  {
    key: 'toiture_artisan',
    slug: 'toiture-artisan',
    image: '/photos/toiture-artisan.png',
    demo: 'https://super-chebakia-99a719.netlify.app/',
    github: null,
    technologies: ['Next.js', 'TypeScript', 'Sanity'],
    badges: ['showcase', 'seo_local', 'conversion'],
    proof: 'trust',
    home: true,
  },
  {
    key: 'luxa',
    slug: 'luxa',
    image: '/luxa.jpg',
    demo: 'https://pocketly-web-blush.vercel.app/',
    github: null,
    technologies: ['React Native', 'Supabase', 'TypeScript'],
    badges: ['mobile_app', 'conversion'],
    proof: 'interface',
    home: true,
    featured: true,
  },
  {
    key: 'unityvert',
    slug: 'unityvert',
    image: '/photos/unityvert.webp',
    demo: 'https://unityvert.fr/',
    github: null,
    technologies: ['Next.js', 'TypeScript', 'Sanity'],
    badges: ['showcase', 'cms', 'seo_local'],
    proof: 'contact',
    home: true,
    hero: true,
  },
  {
    key: 'mets_merveilles',
    slug: 'mets-merveilles',
    image: '/metsmerveilles.webp',
    demo: 'https://front-mets-merveilles.vercel.app/',
    github: 'https://github.com/minhajshafiq/mets-merveilles',
    technologies: ['Next.js', 'Spring Boot', 'PostgreSQL'],
  },
  {
    key: 'portfolio',
    slug: 'portfolio',
    image: '/portfolio.png',
    demo: 'https://www.minhajshafiq.com/',
    github: 'https://github.com/minhajshafiq/my-portfolio',
    technologies: ['Next.js', 'GSAP', 'Tailwind CSS'],
  },
]

export const HOME_PROJECTS = PROJECTS.filter((project) => project.home)

/** Projet unique du hero (site client). Les autres projets home vont dans la section Projets. */
export const HERO_PROJECT = HOME_PROJECTS.find((project) => project.hero) ?? HOME_PROJECTS[0]

/** Vignettes de la section Projets (home) : les projets home hors hero, sans doublon. */
export const TEASER_PROJECTS = HOME_PROJECTS.filter((project) => project !== HERO_PROJECT).slice(0, 3)

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}
