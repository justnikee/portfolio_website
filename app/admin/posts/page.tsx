'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/app/lib/supabase'
import type { Post } from '@/app/lib/types'

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const supabase = createClient()

    useEffect(() => {
        fetchPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchPosts() {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setPosts(data)
        setLoading(false)
    }

    async function deletePost(id: string) {
        if (!confirm('Are you sure you want to delete this post?')) return

        await supabase.from('posts').delete().eq('id', id)
        setPosts(posts.filter(p => p.id !== id))
    }

    async function togglePublish(post: Post) {
        const { error } = await supabase
            .from('posts')
            .update({
                published: !post.published,
                published_at: !post.published ? new Date().toISOString() : null
            })
            .eq('id', post.id)

        if (!error) {
            setPosts(posts.map(p =>
                p.id === post.id
                    ? { ...p, published: !p.published, published_at: !p.published ? new Date().toISOString() : null }
                    : p
            ))
        }
    }

    const filteredPosts = posts.filter(post => {
        const matchesFilter = filter === 'all'
            ? true
            : filter === 'published'
                ? post.published
                : !post.published

        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesFilter && matchesSearch
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-[Heading] text-white uppercase tracking-wide">Posts</h1>
                    <p className="text-[#666] font-[outfit] mt-1">Manage your blog posts</p>
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

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl pl-12 pr-4 py-3 text-white font-[outfit] focus:outline-none focus:border-[#3a3a3a] transition-colors"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                    {(['all', 'published', 'draft'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl font-[outfit] text-sm capitalize transition-colors ${filter === f
                                ? 'bg-white text-black'
                                : 'bg-[#151515] text-[#888] border border-[#2a2a2a] hover:text-white hover:border-[#3a3a3a]'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden">
                {filteredPosts.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg className="w-12 h-12 mx-auto text-[#333] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <p className="text-[#666] font-[outfit]">
                            {searchQuery || filter !== 'all' ? 'No posts match your filters' : 'No posts yet'}
                        </p>
                        {!searchQuery && filter === 'all' && (
                            <Link
                                href="/admin/posts/new"
                                className="inline-block mt-4 text-white hover:underline font-[outfit]"
                            >
                                Create your first post →
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#2a2a2a]">
                                    <th className="px-6 py-4 text-left text-xs font-[outfit] font-medium text-[#888] uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-4 text-left text-xs font-[outfit] font-medium text-[#888] uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-[outfit] font-medium text-[#888] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-[outfit] font-medium text-[#888] uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-[outfit] font-medium text-[#888] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2a2a2a]">
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-[#1a1a1a] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {post.featured_image && (
                                                    <Image
                                                        src={post.featured_image}
                                                        alt=""
                                                        width={40}
                                                        height={40}
                                                        className="w-10 h-10 rounded-lg object-cover bg-[#2a2a2a]"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-white font-[outfit] font-medium">{post.title}</p>
                                                    <p className="text-[#666] font-[outfit] text-sm truncate max-w-xs">{post.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.category && (
                                                <span className="px-2.5 py-1 bg-[#2a2a2a] rounded-full text-[#888] font-[outfit] text-xs">
                                                    {post.category}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => togglePublish(post)}
                                                className={`px-3 py-1 text-xs font-[outfit] rounded-full border transition-colors ${post.published
                                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30'
                                                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30'
                                                    }`}
                                            >
                                                {post.published ? 'Published' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-[#888] font-[outfit] text-sm">
                                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/posts/${post.id}/edit`}
                                                    className="p-2 text-[#888] hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                                                    title="Edit"
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
                                                        title="View"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={() => deletePost(post.id)}
                                                    className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
