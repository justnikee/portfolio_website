import { createServerSupabaseClient } from '@/app/lib/supabase-server'
import PostCard from '@/app/components/posts/PostCard'
import AnimatedHeading from '@/app/components/Animated-heading'
import type { Post, Category } from '@/app/lib/types'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog | Nikhil',
  description: 'Thoughts on development, design, and technology',
}

async function getPosts() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  return data as Post[] || []
}

async function getCategories() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('categories').select('*')
  return data as Category[] || []
}

export default async function PostsPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  const filteredPosts = params.category
    ? posts.filter(p => p.category?.toLowerCase() === params.category?.toLowerCase())
    : posts

  return (
    <div className="py-32 px-4 relative min-h-screen">
      <div className="max-w-[1300px] m-auto">
        <AnimatedHeading heading="Blog" additionalCss="mb-8" />

        <p className="text-[#888] font-[outfit] text-lg text-center mb-12 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights on development, design, and technology.
        </p>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          <Link
            href="/posts"
            className={`px-4 py-2 rounded-full font-[outfit] text-sm transition-colors ${!params.category
                ? 'bg-white text-black'
                : 'bg-[#151515] text-[#888] border border-[#2a2a2a] hover:text-white hover:border-[#3a3a3a]'
              }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/posts?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full font-[outfit] text-sm transition-colors ${params.category === cat.slug
                  ? 'bg-white text-black'
                  : 'bg-[#151515] text-[#888] border border-[#2a2a2a] hover:text-white hover:border-[#3a3a3a]'
                }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-[#333] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-[#666] font-[outfit] text-lg">
              {params.category ? 'No posts in this category yet' : 'No posts yet'}
            </p>
            <p className="text-[#555] font-[outfit] mt-2">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Background Grid */}
      <svg aria-hidden="true" className="svg-grid-work">
        <defs>
          <pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect>
      </svg>
    </div>
  )
}
