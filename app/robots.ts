import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/static/', '/_next/image/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/*.jpg$',
          '/*.jpeg$',
          '/*.png$',
          '/*.webp$',
          '/*.gif$',
        ],
      },
    ],
    sitemap: 'https://www.minhajshafiq.com/sitemap.xml',
  }
}
