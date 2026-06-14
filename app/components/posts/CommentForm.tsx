'use client'

import { useState } from 'react'
import { createClient } from '@/app/lib/supabase'
import type { CommentFormData } from '@/app/lib/types'

interface CommentFormProps {
    postId: string
    onCommentAdded: () => void
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
    const [formData, setFormData] = useState<CommentFormData>({
        author_name: '',
        author_email: '',
        content: '',
    })
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        const { error } = await supabase.from('comments').insert({
            ...formData,
            post_id: postId,
        })

        if (error) {
            console.error('Error submitting comment:', error)
            alert('Failed to submit comment')
        } else {
            setSuccess(true)
            setFormData({ author_name: '', author_email: '', content: '' })
            onCommentAdded()
        }

        setSubmitting(false)
    }

    if (success) {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
                <svg className="w-12 h-12 mx-auto text-emerald-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-emerald-400 font-[outfit] font-medium">Thank you for your comment!</p>
                <p className="text-emerald-400/70 font-[outfit] text-sm mt-1">It will appear after approval.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 text-white/80 hover:text-white font-[outfit] text-sm underline"
                >
                    Add another comment
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-[outfit] text-[#888] mb-2">Name *</label>
                    <input
                        type="text"
                        value={formData.author_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                        className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-[outfit] focus:outline-none focus:border-[#3a3a3a] transition-colors"
                        placeholder="Your name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-[outfit] text-[#888] mb-2">Email *</label>
                    <input
                        type="email"
                        value={formData.author_email}
                        onChange={(e) => setFormData(prev => ({ ...prev, author_email: e.target.value }))}
                        className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-[outfit] focus:outline-none focus:border-[#3a3a3a] transition-colors"
                        placeholder="your@email.com"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-[outfit] text-[#888] mb-2">Comment *</label>
                <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-[outfit] focus:outline-none focus:border-[#3a3a3a] transition-colors resize-none"
                    rows={4}
                    placeholder="Share your thoughts..."
                    required
                />
            </div>
            <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-white text-black font-[outfit] font-medium rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
                {submitting ? 'Submitting...' : 'Post Comment'}
            </button>
        </form>
    )
}
