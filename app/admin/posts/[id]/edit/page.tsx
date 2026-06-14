'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/app/lib/supabase'
import ImageUpload from '@/app/components/admin/ImageUpload'
import type { PostFormData, Category, Post } from '@/app/lib/types'
import slugify from 'slugify'

const RichTextEditor = dynamic(() => import('@/app/components/admin/RichTextEditor'), {
    ssr: false,
    loading: () => (
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl h-[400px] flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    ),
})

function calculateReadingTime(text: string): number {
    const wordsPerMinute = 200
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        category: '',
        tags: [],
        published: false,
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [tagInput, setTagInput] = useState('')
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function fetchData() {
            const [postResult, categoriesResult] = await Promise.all([
                supabase.from('posts').select('*').eq('id', id).single(),
                supabase.from('categories').select('*')
            ])

            if (postResult.data) {
                const post = postResult.data as Post
                setFormData({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt || '',
                    content: post.content || '',
                    featured_image: post.featured_image || '',
                    category: post.category || '',
                    tags: post.tags || [],
                    published: post.published,
                })
            }

            if (categoriesResult.data) {
                setCategories(categoriesResult.data)
            }

            setLoading(false)
        }
        fetchData()
    }, [id, supabase])

    const handleSubmit = async (e: React.FormEvent, publish?: boolean) => {
        e.preventDefault()
        setSaving(true)

        const readingTime = calculateReadingTime(formData.content)
        const shouldPublish = publish ?? formData.published

        const postData = {
            ...formData,
            published: shouldPublish,
            published_at: shouldPublish && !formData.published ? new Date().toISOString() : undefined,
            reading_time: readingTime,
        }

        const { error } = await supabase
            .from('posts')
            .update(postData)
            .eq('id', id)

        if (error) {
            console.error('Error updating post:', error)
            alert('Failed to update post')
            setSaving(false)
            return
        }

        router.push('/admin/posts')
        router.refresh()
    }

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }))
            setTagInput('')
        }
    }

    const removeTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag)
        }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-[Heading] text-white uppercase tracking-wide">Edit Post</h1>
                    <p className="text-[#666] font-[outfit] mt-1">Update your blog post</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="text-[#888] hover:text-white font-[outfit] transition-colors"
                >
                    ← Back
                </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-[outfit] text-[#888] mb-2">Title *</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-[outfit] text-lg focus:outline-none focus:border-[#3a3a3a] transition-colors"
                        placeholder="Enter post title"
                        required
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-[outfit] text-[#888] mb-2">Slug *</label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: slugify(e.target.value, { lower: true, strict: true }) }))}
                        className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-[outfit] focus:outline-none focus:border-[#3a3a3a] transition-colors"
                        placeholder="post-url-slug"
                        required
                    />
                </div>

                {/* Featured Image */}
                <div>
                    <label className="block text-sm font-[outfit] text-[#888] mb-2">Featured Image</label>
                    <ImageUpload
                        value={formData.featured_image}
                        onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
                    />
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-[outfit] text-[#888] mb-2">Excerpt</label>
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-[outfit] focus:outline-none focus:border-[#3a3a3a] transition-colors resize-none"
                        rows={3}
                        placeholder="Brief description of the post..."
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-[outfit] text-[#888] mb-2">Content *</label>
                    <RichTextEditor
                        content={formData.content}
                        onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                        placeholder="Start writing your post..."
                    />
                </div>

                {/* Category & Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-[outfit] text-[#888] mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-[outfit] focus:outline-none focus:border-[#3a3a3a] transition-colors"
                        >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-[outfit] text-[#888] mb-2">Tags</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                className="flex-1 bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-[outfit] focus:outline-none focus:border-[#3a3a3a] transition-colors"
                                placeholder="Add a tag"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="px-4 bg-[#2a2a2a] text-white rounded-xl hover:bg-[#3a3a3a] transition-colors"
                            >
                                Add
                            </button>
                        </div>
                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {formData.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-1 px-3 py-1 bg-[#2a2a2a] rounded-full text-sm font-[outfit] text-white"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="text-[#888] hover:text-white"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-[#2a2a2a]">
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-[outfit] rounded-full ${formData.published
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                            {formData.published ? 'Published' : 'Draft'}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-3 bg-[#2a2a2a] text-white font-[outfit] font-medium rounded-xl hover:bg-[#3a3a3a] transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        {!formData.published && (
                            <button
                                type="button"
                                onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
                                disabled={saving}
                                className="px-6 py-3 bg-white text-black font-[outfit] font-medium rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                {saving ? 'Publishing...' : 'Publish'}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}
