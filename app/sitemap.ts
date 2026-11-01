import type { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/app/lib/public-posts'
import { siteUrl } from '@/app/lib/site'

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages: MetadataRoute.Sitemap = [
        { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
        { url: `${siteUrl}/work/anviora`, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${siteUrl}/posts`, changeFrequency: 'weekly', priority: 0.9 },
    ]
    try {
        const posts = await getPublishedPosts()
        return [...pages, ...posts.map(post => {
            const modified = new Date(post.updated_at)
            return {
                url: `${siteUrl}/posts/${encodeURIComponent(post.slug)}`,
                ...(!Number.isNaN(modified.getTime()) ? { lastModified: modified } : {}),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            }
        })]
    } catch {
        // Keep the portfolio discoverable during a temporary database outage.
        console.warn('Sitemap: published posts unavailable; serving core pages')
        return pages
    }
}
