import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import type { Post, Category } from './types'

// Public reads never carry an admin session into the shared cache.
function publicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Public content database is not configured')
    return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
}

export const getPublishedPost = cache(unstable_cache(async (slug: string) => {
    const { data, error } = await publicClient().from('posts').select('*').eq('slug', slug).eq('published', true).maybeSingle()
    if (error) throw new Error('Unable to load published post')
    return data as Post | null
}, ['published-post-v1'], { revalidate: 60 }))

export const getPublishedPosts = unstable_cache(async () => {
    const { data, error } = await publicClient().from('posts')
        .select('id,title,slug,excerpt,featured_image,category,tags,published,published_at,reading_time,author_id,created_at,updated_at')
        .eq('published', true).order('published_at', { ascending: false })
    if (error) throw new Error('Unable to load published posts')
    return (data || []) as Omit<Post, 'content'>[]
}, ['published-posts-v1'], { revalidate: 60 })

export const getPublicCategories = unstable_cache(async () => {
    const { data, error } = await publicClient().from('categories').select('*')
    if (error) throw new Error('Unable to load categories')
    return (data || []) as Category[]
}, ['public-categories-v1'], { revalidate: 60 })
