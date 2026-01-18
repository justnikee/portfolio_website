'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase'
import type { Post } from '@/app/lib/types'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalPosts: 0,
        published: 0,
        drafts: 0,
        pendingComments: 0,
    })
    const [recentPosts, setRecentPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchData() {
            // Fetch posts count
            const { data: posts } = await supabase
                .from('posts')
                .select('*')

            const { data: comments } = await supabase
                .from('comments')
                .select('*')
                .eq('approved', false)

            if (posts) {
                setStats({
                    totalPosts: posts.length,
                    published: posts.filter(p => p.published).length,
                    drafts: posts.filter(p => !p.published).length,
                    pendingComments: comments?.length || 0,
                })

                // Get recent posts
                setRecentPosts(
                    posts
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 5)
                )
            }

            setLoading(false)
        }

        fetchData()
    }, [supabase])

    const statCards = [
        { label: 'Total Posts', value: stats.totalPosts, color: 'bg-blue-500/20 border-blue-500/30 text-blue-400' },
        { label: 'Published', value: stats.published, color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' },
        { label: 'Drafts', value: stats.drafts, color: 'bg-amber-500/20 border-amber-500/30 text-amber-400' },
        { label: 'Pending Comments', value: stats.pendingComments, color: 'bg-purple-500/20 border-purple-500/30 text-purple-400' },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-[Heading] text-white uppercase tracking-wide">Dashboard</h1>
                    <p className="text-[#666] font-[outfit] mt-1">Welcome back! Here&apos;s an overview of your blog.</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="flex items-center gap-2 bg-white text-black font-[outfit] font-medium px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Post
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-[#151515] border border-[#2a2a2a] rounded-xl p-5 ${stat.color.split(' ')[0]}`}
                    >
                        <p className="text-[#888] font-[outfit] text-sm mb-1">{stat.label}</p>
                        <p className={`text-3xl font-[Heading] ${stat.color.split(' ')[2]}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Posts */}
            <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
                    <h2 className="text-lg font-[Heading] text-white uppercase">Recent Posts</h2>
                    <Link href="/admin/posts" className="text-[#888] hover:text-white font-[outfit] text-sm transition-colors">
                        View All →
                    </Link>
                </div>

                {recentPosts.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg className="w-12 h-12 mx-auto text-[#333] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <p className="text-[#666] font-[outfit]">No posts yet</p>
                        <Link
                            href="/admin/posts/new"
                            className="inline-block mt-4 text-white hover:underline font-[outfit]"
                        >
                            Create your first post →
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-[#2a2a2a]">
                        {recentPosts.map((post) => (
                            <div key={post.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-white font-[outfit] truncate">{post.title}</h3>
                                        <span className={`px-2 py-0.5 text-xs font-[outfit] rounded-full ${post.published
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                            }`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-[#666] font-[outfit] text-sm mt-1">
                                        {new Date(post.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/posts/${post.id}/edit`}
                                        className="p-2 text-[#888] hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </Link>
                                    {post.published && (
                                        <Link
                                            href={`/posts/${post.slug}`}
                                            target="_blank"
                                            className="p-2 text-[#888] hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
