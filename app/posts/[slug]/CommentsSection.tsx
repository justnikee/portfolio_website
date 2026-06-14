'use client'

import type { Comment } from '@/app/lib/types'
import CommentForm from '@/app/components/posts/CommentForm'
import { format } from 'date-fns'

interface CommentsSectionProps {
    postId: string
    initialComments: Comment[]
}

export default function CommentsSection({ postId, initialComments }: CommentsSectionProps) {
    const handleCommentAdded = () => {
        // Comment will show after approval, so we just show success message
        // Page will need to be refreshed to see approved comments
    }

    return (
        <section className="mt-12">
            <h2 className="text-xl font-[Heading] text-white uppercase mb-6">
                Comments {initialComments.length > 0 && `(${initialComments.length})`}
            </h2>

            {/* Comment Form */}
            <div className="mb-8">
                <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
            </div>

            {/* Comments List */}
            {initialComments.length > 0 && (
                <div className="space-y-6">
                    {initialComments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white font-medium">
                                    {comment.author_name[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-white font-[outfit] font-medium">{comment.author_name}</p>
                                    <p className="text-[#666] font-[outfit] text-sm">
                                        {format(new Date(comment.created_at), 'MMM d, yyyy · h:mm a')}
                                    </p>
                                </div>
                            </div>
                            <p className="text-white/80 font-[outfit] leading-relaxed">{comment.content}</p>
                        </div>
                    ))}
                </div>
            )}

            {initialComments.length === 0 && (
                <p className="text-[#666] font-[outfit] text-center py-8">
                    Be the first to leave a comment!
                </p>
            )}
        </section>
    )
}

