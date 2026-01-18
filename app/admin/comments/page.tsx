'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase'
import type { Comment } from '@/app/lib/types'

interface CommentWithPost extends Comment {
    post?: { title: string; slug: string }
}

export default function CommentsPage() {
    const [comments, setComments] = useState<CommentWithPost[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending')
    const supabase = createClient()

    useEffect(() => {
        fetchComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchComments() {
        const { data } = await supabase
            .from('comments')
            .select('*, post:posts(title, slug)')
            .order('created_at', { ascending: false })

        if (data) setComments(data)
        setLoading(false)
    }

    async function approveComment(id: string) {
        await supabase.from('comments').update({ approved: true }).eq('id', id)
        setComments(comments.map(c => c.id === id ? { ...c, approved: true } : c))
    }

    async function deleteComment(id: string) {
        if (!confirm('Are you sure you want to delete this comment?')) return
        await supabase.from('comments').delete().eq('id', id)
        setComments(comments.filter(c => c.id !== id))
    }

    const filteredComments = comments.filter(c => {
        if (filter === 'pending') return !c.approved
        if (filter === 'approved') return c.approved
        return true
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
            {/* Header */}
            <div>
                <h1 className="text-2xl font-[Heading] text-white uppercase tracking-wide">Comments</h1>
                <p className="text-[#666] font-[outfit] mt-1">Manage comments on your posts</p>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(['pending', 'approved', 'all'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl font-[outfit] text-sm capitalize transition-colors ${filter === f
                            ? 'bg-white text-black'
                            : 'bg-[#151515] text-[#888] border border-[#2a2a2a] hover:text-white hover:border-[#3a3a3a]'
                            }`}
                    >
                        {f} {f === 'pending' && `(${comments.filter(c => !c.approved).length})`}
                    </button>
                ))}
            </div>

            {/* Comments List */}
            <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden">
                {filteredComments.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg className="w-12 h-12 mx-auto text-[#333] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-[#666] font-[outfit]">
                            {filter === 'pending' ? 'No pending comments' : 'No comments yet'}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#2a2a2a]">
                        {filteredComments.map((comment) => (
                            <div key={comment.id} className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white font-medium text-sm">
                                                {comment.author_name[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-white font-[outfit] font-medium">{comment.author_name}</p>
                                                <p className="text-[#666] font-[outfit] text-sm">{comment.author_email}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-[outfit] rounded-full ${comment.approved
                                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                }`}>
                                                {comment.approved ? 'Approved' : 'Pending'}
                                            </span>
                                        </div>

                                        <p className="text-white/80 font-[outfit] mb-3">{comment.content}</p>

                                        <div className="flex items-center gap-3 text-[#666] font-[outfit] text-sm">
                                            <span>on</span>
                                            <a
                                                href={`/posts/${comment.post?.slug}`}
                                                target="_blank"
                                                className="text-white hover:underline"
                                            >
                                                {comment.post?.title}
                                            </a>
                                            <span>•</span>
                                            <span>
                                                {new Date(comment.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {!comment.approved && (
                                            <button
                                                onClick={() => approveComment(comment.id)}
                                                className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 font-[outfit] text-sm transition-colors"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteComment(comment.id)}
                                            className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
