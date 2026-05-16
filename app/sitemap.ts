import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://1023studios.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, initiativeSlugs] = await Promise.all([
    client.fetch<string[]>(
      `*[_type == "project" && defined(slug.current)][].slug.current`,
    ),
    client.fetch<string[]>(
      `*[_type == "initiative" && defined(slug.current)][].slug.current`,
    ),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/archive`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.6 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/archive/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  const initiativeRoutes: MetadataRoute.Sitemap = initiativeSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes, ...initiativeRoutes]
}
