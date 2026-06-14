'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/app/lib/supabase'

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    const handleUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }

        setUploading(true)

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('post-images')
                .upload(fileName, file)

            if (uploadError) throw uploadError

            const { data } = supabase.storage
                .from('post-images')
                .getPublicUrl(fileName)

            onChange(data.publicUrl)
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(false)

        if (e.dataTransfer.files?.[0]) {
            handleUpload(e.dataTransfer.files[0])
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(true)
    }

    const handleDragLeave = () => {
        setDragActive(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleUpload(e.target.files[0])
        }
    }

    const removeImage = () => {
        onChange('')
    }

    return (
        <div>
            {value ? (
                <div className="relative">
                    <Image
                        src={value}
                        alt="Featured"
                        width={800}
                        height={192}
                        className="w-full h-48 object-cover rounded-xl border border-[#2a2a2a]"
                    />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 bg-black/80 text-white rounded-lg hover:bg-black transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => inputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragActive
                        ? 'border-white bg-[#1a1a1a]'
                        : 'border-[#2a2a2a] hover:border-[#3a3a3a]'
                        } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="hidden"
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[#888] font-[outfit]">Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <svg className="w-10 h-10 mx-auto text-[#444] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-[#888] font-[outfit]">
                                <span className="text-white">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-[#666] font-[outfit] text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
