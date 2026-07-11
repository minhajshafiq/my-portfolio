import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Minhaj Zubair - Développeur Full-Stack',
    short_name: 'Minhaj',
    description: 'Portfolio de Minhaj Zubair, développeur Full-Stack spécialisé en Next.js, Spring Boot et React Native.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8C0605',
    lang: 'fr',
    icons: [
      {
        src: '/favicon_io/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon_io/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon_io/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon_io/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
