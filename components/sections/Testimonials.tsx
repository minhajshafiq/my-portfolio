'use client'

import { Star, Quote, ExternalLink } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

const testimonials = [
  {
    id: 1,
    name: 'Marie Dubois',
    role: 'CEO, TechStart',
    content: 'Minhaj a transformé notre plateforme e-commerce. +200% de ventes en 3 mois grâce à son expertise technique et sa vision produit.',
    rating: 5,
    avatar: '👩‍💼',
    company: 'TechStart',
    results: '+200% ventes'
  },
  {
    id: 2,
    name: 'Thomas Martin',
    role: 'CTO, InnovCorp',
    content: 'Une expertise technique remarquable. Il a réduit nos temps de chargement de 70% et amélioré notre SEO de 150%.',
    rating: 5,
    avatar: '👨‍💻',
    company: 'InnovCorp',
    results: '-70% temps chargement'
  },
  {
    id: 3,
    name: 'Sophie Bernard',
    role: 'Product Manager, DigitalAgency',
    content: 'Communication parfaite, code propre et maintenable. Livraison dans les délais avec une qualité exceptionnelle.',
    rating: 5,
    avatar: '👩‍🎨',
    company: 'DigitalAgency',
    results: '100% délais respectés'
  },
  {
    id: 4,
    name: 'Alexandre Moreau',
    role: 'Lead Developer, ScaleUp',
    content: 'Excellent collaborateur en équipe. Son mentorat a amélioré la productivité de notre équipe de 40%.',
    rating: 5,
    avatar: '👨‍💼',
    company: 'ScaleUp',
    results: '+40% productivité équipe'
  },
  {
    id: 5,
    name: 'Camille Rousseau',
    role: 'CEO, StartupFood',
    content: 'Grâce à Minhaj, notre app mobile a atteint 50k utilisateurs en 6 mois. Un partenaire de confiance !',
    rating: 5,
    avatar: '👩‍🍳',
    company: 'StartupFood',
    results: '50k utilisateurs'
  },
  {
    id: 6,
    name: 'David Chen',
    role: 'Technical Lead, BigTech',
    content: 'Architecture solide et code de qualité. Il a intégré notre équipe rapidement et apporté une vraie valeur ajoutée.',
    rating: 5,
    avatar: '👨‍🔬',
    company: 'BigTech',
    results: 'Intégration réussie'
  }
]

export function Testimonials() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-custom-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-custom-title mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-custom-secondary max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <Quote className="w-6 h-6 text-[#8C0605] dark:text-[#FFD6D6] mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-[#8C0605] dark:fill-[#FFD6D6] text-[#8C0605] dark:text-[#FFD6D6]" 
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Results Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#8C0605]/10 dark:bg-[#FFD6D6]/10 text-[#8C0605] dark:text-[#FFD6D6] rounded-full text-sm font-medium border border-[#8C0605]/20 dark:border-[#FFD6D6]/20">
                  {testimonial.results}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://www.linkedin.com/in/minhajshafiq/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#8C0605] dark:bg-[#FFD6D6] text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-[#8C0605]/90 dark:hover:bg-[#FFD6D6]/90 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            Voir plus de recommandations
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
