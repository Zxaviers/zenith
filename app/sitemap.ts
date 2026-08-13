import { MetadataRoute } from 'next'
import { projects } from '@/lib/data/projects'
import { devlogPosts } from '@/lib/data/devlogPosts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zxaviers.site'

  const staticRoutes = ['', '/style-guide', '/devlog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectRoutes = projects.filter(p => !p.comingSoon).map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const devlogRoutes = devlogPosts.map((p) => ({
    url: `${baseUrl}/devlog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes, ...devlogRoutes]
}
