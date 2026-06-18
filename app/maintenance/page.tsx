import type { Metadata } from 'next'
import { Maintenance } from '@/components/sections/Maintenance'
import { siteConfig } from '../metadata'

export const metadata: Metadata = {
  title: 'Maintenance web',
  description:
    'Offres de maintenance web : hébergement, sécurité, sauvegardes et support. Gardez votre site en bonne santé sans vous en soucier.',
  alternates: {
    canonical: '/maintenance',
  },
  openGraph: {
    title: `Maintenance web | ${siteConfig.name}`,
    description:
      'Offres de maintenance web : hébergement, sécurité, sauvegardes et support.',
    url: `${siteConfig.url}/maintenance`,
  },
}

export default function MaintenancePage() {
  return <Maintenance />
}
