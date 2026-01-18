import { MetadataRoute } from 'next'
import { createServerSupabaseClient } from '@/app/lib/supabase-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doitnikhil.com'
    const supabase = await createServerSupabaseClient()

    // Fetch all published posts
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at')
        .eq('published', true)

    const postUrls = (posts || []).map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/posts`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...postUrls,
    ]
}
