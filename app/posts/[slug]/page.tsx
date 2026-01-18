import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/app/lib/supabase-server'
import type { Post, Comment } from '@/app/lib/types'
import { format } from 'date-fns'
import CommentsSection from './CommentsSection'
import ShareButtons from '@/app/components/posts/ShareButtons'

export const dynamic = 'force-dynamic'

async function getPost(slug: string) {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

    return data as Post | null
}

async function getComments(postId: string) {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .eq('approved', true)
        .order('created_at', { ascending: true })

    return data as Comment[] || []
}

async function getRelatedPosts(category: string | null, currentId: string) {
    if (!category) return []

    const supabase = await createServerSupabaseClient()
    const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .neq('id', currentId)
        .limit(3)

    return data as Post[] || []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return { title: 'Post Not Found' }
    }

    return {
        title: `${post.title} | Nikhil`,
        description: post.excerpt || `Read ${post.title} on my blog`,
        openGraph: {
            title: post.title,
            description: post.excerpt || '',
            images: post.featured_image ? [post.featured_image] : [],
        },
    }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    const [comments, relatedPosts] = await Promise.all([
        getComments(post.id),
        getRelatedPosts(post.category, post.id)
    ])

    return (
        <article className="py-32 px-4 relative min-h-screen">
            <div className="max-w-[800px] mx-auto">
                {/* Back Link */}
                <Link
                    href="/posts"
                    className="inline-flex items-center gap-2 text-[#888] hover:text-white font-[outfit] mb-8 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-10">
                    {post.category && (
                        <Link
                            href={`/posts?category=${post.category.toLowerCase()}`}
                            className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-[outfit] text-white/80 hover:bg-white/20 transition-colors mb-4"
                        >
                            {post.category}
                        </Link>
                    )}

                    <h1 className="text-4xl md:text-5xl font-[Heading] text-white uppercase leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-[#888] font-[outfit]">
                        <span>
                            {format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}
                        </span>
                        <span>•</span>
                        <span>{post.reading_time} min read</span>
                        {post.tags && post.tags.length > 0 && (
                            <>
                                <span>•</span>
                                <div className="flex gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="text-white/60">#{tag}</span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                {post.featured_image && (
                    <div className="relative h-[400px] rounded-2xl overflow-hidden mb-10">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-invert prose-lg max-w-none mb-12
            prose-headings:font-[Heading] prose-headings:uppercase prose-headings:tracking-wide
            prose-h1:text-4xl prose-h1:mt-14 prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
            prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
            prose-p:text-white/80 prose-p:font-[outfit] prose-p:leading-relaxed prose-p:text-lg
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-code:bg-[#2a2a2a] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-[#151515] prose-pre:border prose-pre:border-[#2a2a2a] prose-pre:rounded-xl
            prose-ul:text-white/80 prose-ol:text-white/80
            prose-li:font-[outfit] prose-li:text-lg
            prose-blockquote:border-l-white/30 prose-blockquote:text-white/60 prose-blockquote:font-[outfit]
            prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />

                {/* Share & Tags */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-y border-[#2a2a2a]">
                    <ShareButtons url={`/posts/${post.slug}`} title={post.title} />

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-[#151515] border border-[#2a2a2a] rounded-full text-sm font-[outfit] text-[#888]"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Comments Section */}
                <CommentsSection postId={post.id} initialComments={comments} />

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-xl font-[Heading] text-white uppercase mb-6">Related Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/posts/${relatedPost.slug}`}
                                    className="group block bg-[#151515] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#3a3a3a] transition-colors"
                                >
                                    <h3 className="font-[Heading] text-white uppercase text-sm group-hover:text-[#ccc] transition-colors line-clamp-2">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-[#666] font-[outfit] text-xs mt-2">
                                        {format(new Date(relatedPost.published_at || relatedPost.created_at), 'MMM d, yyyy')}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
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
        </article>
    )
}
