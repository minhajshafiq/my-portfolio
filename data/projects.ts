export type ProjectEntry = {
  /** Clé de traduction sous `projects.<key>` */
  key: string
  slug: string
  image: string
  demo: string
  github: string | null
  technologies: string[]
  /** Affiché sur la home (4 max) */
  home?: boolean
}

export const PROJECTS: ProjectEntry[] = [
  {
    key: 'photographe',
    slug: 'photographe',
    image: '/photos/photographe.png',
    demo: 'https://photograph-portfolio-five.vercel.app/',
    github: null,
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    home: true,
  },
  {
    key: 'toiture_artisan',
    slug: 'toiture-artisan',
    image: '/photos/toiture-artisan.png',
    demo: 'https://super-chebakia-99a719.netlify.app/',
    github: null,
    technologies: ['Next.js', 'TypeScript', 'Sanity'],
    home: true,
  },
  {
    key: 'luxa',
    slug: 'luxa',
    image: '/luxa.jpg',
    demo: 'https://pocketly-web-blush.vercel.app/',
    github: null,
    technologies: ['React Native', 'Supabase', 'TypeScript'],
    home: true,
  },
  {
    key: 'unityvert',
    slug: 'unityvert',
    image: '/photos/unityvert.jpg',
    demo: 'https://unityvert.fr/',
    github: null,
    technologies: ['Next.js', 'TypeScript', 'Sanity'],
    home: true,
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

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}
