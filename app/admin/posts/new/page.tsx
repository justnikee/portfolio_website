'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/app/lib/supabase'
import ImageUpload from '@/app/components/admin/ImageUpload'
import type { PostFormData, Category } from '@/app/lib/types'
import slugify from 'slugify'

// Dynamic import for RichTextEditor to avoid SSR issues
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

export default function NewPostPage() {
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
    const [autoSlug, setAutoSlug] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function fetchCategories() {
            const { data } = await supabase.from('categories').select('*')
            if (data) setCategories(data)
        }
        fetchCategories()
    }, [supabase])

    useEffect(() => {
        if (autoSlug && formData.title) {
            setFormData(prev => ({
                ...prev,
                slug: slugify(formData.title, { lower: true, strict: true })
            }))
        }
    }, [formData.title, autoSlug])

    const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
        e.preventDefault()
        setSaving(true)

        const readingTime = calculateReadingTime(formData.content)

        const postData = {
            ...formData,
            published: publish,
            published_at: publish ? new Date().toISOString() : null,
            reading_time: readingTime,
        }

        const { error } = await supabase.from('posts').insert(postData)

        if (error) {
            console.error('Error creating post:', error)
            alert('Failed to create post')
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

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-[Heading] text-white uppercase tracking-wide">New Post</h1>
                    <p className="text-[#666] font-[outfit] mt-1">Create a new blog post</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="text-[#888] hover:text-white font-[outfit] transition-colors"
                >
                    ← Back
                </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
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
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-[outfit] text-[#888]">Slug *</label>
                        <label className="flex items-center gap-2 text-sm font-[outfit] text-[#666] cursor-pointer">
                            <input
                                type="checkbox"
                                checked={autoSlug}
                                onChange={(e) => setAutoSlug(e.target.checked)}
                                className="rounded border-[#2a2a2a]"
                            />
                            Auto-generate
                        </label>
                    </div>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => {
                            setAutoSlug(false)
                            setFormData(prev => ({ ...prev, slug: e.target.value }))
                        }}
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
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#2a2a2a]">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-[#2a2a2a] text-white font-[outfit] font-medium rounded-xl hover:bg-[#3a3a3a] transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save as Draft'}
                    </button>
                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
                        disabled={saving}
                        className="px-6 py-3 bg-white text-black font-[outfit] font-medium rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </form>
        </div>
    )
}
