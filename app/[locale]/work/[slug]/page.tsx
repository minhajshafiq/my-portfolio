import type { Metadata } from 'next'
import { Link } from '@/components/ui/AppLink'
import { notFound } from 'next/navigation'
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { getPageMetadata } from '@/app/metadata'
import { LuxaShowcaseCard } from '@/components/sections/LuxaShowcaseCard'
import { PROJECTS, getProjectBySlug } from '@/data/projects'
import { locales, isValidLocale, type Locale } from '@/utils/i18n'
import { getServerT } from '@/utils/server-i18n'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectMedia } from '@/components/sections/ProjectMedia'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, slug: project.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) return {}

  const project = getProjectBySlug(slug)

  if (!project) return {}

  const t = getServerT(locale)
  const title = `${t(`projects.${project.key}.title`)} — ${t(`projects.${project.key}.category`)}`
  const description = t(`projects.${project.key}.description`)

  return getPageMetadata(locale, `/work/${slug}`, title, description)
}

function ResultsList({ locale, projectKey }: { locale: Locale; projectKey: string }) {
  const t = getServerT(locale)

  const resultKeys: Record<string, string[]> = {
    photographe: ['gallery', 'branding', 'contact'],
    toiture_artisan: ['local_seo', 'conversion', 'trust'],
    luxa: ['interface', 'pockets', 'statistics'],
    unityvert: ['presence', 'design', 'contact'],
    mets_merveilles: ['interface', 'recipes', 'search'],
    portfolio: ['performance', 'animations', 'seo'],
  }

  const keys = resultKeys[projectKey] ?? []

  return (
    <ul className="space-y-3">
      {keys.map((key) => (
        <li
          key={key}
          className="flex items-start gap-3 border-b border-custom pb-3 text-sm leading-6 text-custom-secondary last:border-b-0 md:text-base"
        >
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#8C0605] dark:bg-red-400" />
          <span>{t(`projects.${projectKey}.results.${key}`)}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) notFound()

  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const t = getServerT(locale)

  return (
    <article className="relative bg-custom-primary pb-[clamp(4.5rem,8vw,8rem)] pt-[clamp(9rem,14vw,12rem)]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(1180px,calc(100vw-2.5rem))]">
          {/* Back link */}
          <Link
            href={`/${locale}/work`}
            className="group mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-custom-muted transition-colors hover:text-custom-title"
          >
            <FaArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" />
            {t('case_studies.labels.back')}
          </Link>

          {/* Header */}
          <header id="case-hero" className="mb-12 md:mb-16">
            <SectionLabel>{t(`projects.${project.key}.category`)}</SectionLabel>

            <h1 className="mb-6 font-serif text-[clamp(2.8rem,8vw,6rem)] font-medium leading-[1.02] tracking-[-0.025em] text-custom-title">
              {t(`projects.${project.key}.title`)}
            </h1>

            <p className="max-w-[62ch] text-base leading-7 text-custom-secondary md:text-lg md:leading-8">
              {t(`projects.${project.key}.description`)}
            </p>
          </header>

          {/* Hero image */}
          <div
            className="relative mb-14 aspect-[16/9] overflow-hidden rounded-xl bg-custom-secondary md:mb-20"
            style={{ viewTransitionName: `project-image-${project.slug}` }}
          >
            {project.key === 'luxa' ? (
              <LuxaShowcaseCard demoUrl={project.demo} />
            ) : (
              <ProjectMedia
                project={project}
                alt={t(`projects.${project.key}.title`)}
                priority
                sizes="(min-width: 1280px) 1180px, 100vw"
                className="object-cover"
              />
            )}
          </div>

          {/* Meta + content */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            {/* Sidebar meta */}
            <aside className="md:col-span-4">
              <div className="space-y-8 md:sticky md:top-32">
                <div>
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-custom-muted">
                    {t('case_studies.labels.stack')}
                  </h2>

                  <ul className="space-y-2">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="border-b border-custom pb-2 text-sm font-medium text-custom-title last:border-b-0"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-[#8C0605] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300"
                  >
                    <FaExternalLinkAlt className="h-3.5 w-3.5" />
                    {t('case_studies.labels.live')}
                  </a>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2.5 rounded-full border border-custom px-6 py-3.5 text-sm font-bold text-custom-title transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8C0605] hover:text-[#8C0605] dark:hover:border-red-400 dark:hover:text-red-400"
                    >
                      <FaGithub className="h-4 w-4" />
                      {t('projects.source_code')}
                    </a>
                  )}
                </div>
              </div>
            </aside>

            {/* Body */}
            <div className="md:col-span-8">
              <section id="case-context" className="mb-12">
                <h2 className="mb-5 font-serif text-2xl font-medium tracking-[-0.02em] text-custom-title md:text-3xl">
                  {t('case_studies.labels.context')}
                </h2>

                <p className="max-w-[62ch] text-sm leading-7 text-custom-secondary md:text-base md:leading-8">
                  {t(`case_studies.${project.key}.context`)}
                </p>
              </section>

              <section id="case-approach" className="mb-12">
                <h2 className="mb-5 font-serif text-2xl font-medium tracking-[-0.02em] text-custom-title md:text-3xl">
                  {t('case_studies.labels.approach')}
                </h2>

                <p className="max-w-[62ch] text-sm leading-7 text-custom-secondary md:text-base md:leading-8">
                  {t(`case_studies.${project.key}.approach`)}
                </p>
              </section>

              <section id="case-results">
                <h2 className="mb-5 font-serif text-2xl font-medium tracking-[-0.02em] text-custom-title md:text-3xl">
                  {t('case_studies.labels.results')}
                </h2>

                <ResultsList locale={locale} projectKey={project.key} />
              </section>
            </div>
          </div>

          {/* CTA */}
          <div id="case-cta" className="mt-20 border-t border-custom pt-12 md:mt-28">
            <h2 className="mb-4 font-serif text-3xl font-medium tracking-[-0.02em] text-custom-title md:text-4xl">
              {t('case_studies.labels.cta_title')}
            </h2>

            <p className="mb-8 max-w-[52ch] text-sm leading-7 text-custom-secondary md:text-base">
              {t('case_studies.labels.cta_text')}
            </p>

            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 rounded-full bg-[#8C0605] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300 sm:text-base"
            >
              {t('case_studies.labels.cta_button')}
              <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
