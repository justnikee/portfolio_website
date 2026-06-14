'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function BlogHeader() {
    const pathname = usePathname()
    const isPostPage = pathname?.startsWith('/posts/') && pathname !== '/posts'

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6">
            <div className="max-w-4xl mx-auto">
                <div
                    className="flex items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-md border border-[#2a2a2a] rounded-full px-6 py-3 shadow-lg shadow-black/20"
                >
                    {/* Left: Branding */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center group">
                            <Image
                                src="/main_images/NIKHIL.png"
                                alt="Nikhil"
                                width={90}
                                height={40}
                                className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                        </Link>

                        {/* Breadcrumb / Separator */}
                        <span className="text-[#444]">/</span>

                        <Link
                            href="/posts"
                            className={`font-[outfit] text-sm ${!isPostPage ? 'text-white' : 'text-[#888] hover:text-white'} transition-colors`}
                        >
                            Blog
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="hidden sm:block text-sm font-[outfit] text-[#888] hover:text-white transition-colors"
                        >
                            ← Back to Portfolio
                        </Link>
                        <Link
                            href="/#Contact"
                            className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-[outfit] font-medium hover:bg-gray-200 transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
