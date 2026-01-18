import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/app/lib/types'
import { format } from 'date-fns'

interface PostCardProps {
    post: Post
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Link href={`/posts/${post.slug}`} className="group block">
            <article className="bg-[#151515] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#3a3a3a] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-black/20">
                {/* Featured Image */}
                {post.featured_image ? (
                    <div className="relative h-48 overflow-hidden bg-[#0a0a0a]">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {post.category && (
                            <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-[outfit] text-white/90">
                                {post.category}
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="h-48 bg-[#1a1a1a] flex items-center justify-center">
                        <svg className="w-12 h-12 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        {post.category && (
                            <span className="absolute top-3 left-3 px-3 py-1 bg-[#2a2a2a] rounded-full text-xs font-[outfit] text-white/90">
                                {post.category}
                            </span>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-5">
                    <h2 className="text-xl font-[Heading] text-white uppercase group-hover:text-[#ccc] transition-colors mb-2 line-clamp-2">
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p className="text-[#888] font-[outfit] text-sm line-clamp-2 mb-4">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="flex items-center justify-between">
                        <span className="text-[#666] font-[outfit] text-sm">
                            {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
                        </span>
                        <span className="text-[#666] font-[outfit] text-sm">
                            {post.reading_time} min read
                        </span>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-[#2a2a2a] rounded-full text-[10px] font-[outfit] text-[#888]"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    )
}
