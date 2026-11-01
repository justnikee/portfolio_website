'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BlogHeader() {
    const pathname = usePathname()
    const isPostPage = pathname?.startsWith('/posts/') && pathname !== '/posts'

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6">
            <div className="max-w-4xl mx-auto">
                <div
                    className="flex items-center justify-between bg-[--bg]/80 backdrop-blur-md border border-[--line] rounded-full px-6 py-3 shadow-lg shadow-black/5"
                >
                    {/* Left: Branding */}
                    <div className="flex items-center gap-4">
                        <Link href="/" aria-label="Nikhil — home" className="flex items-center group">
                            <span data-preloader-logo className="site-wordmark" aria-hidden="true">Nikhil<span className="accent-text">.</span></span>
                        </Link>

                        {/* Breadcrumb / Separator */}
                        <span className="text-[--ink-faint]">/</span>

                        <Link
                            href="/posts"
                            className={`font-[outfit] text-sm ${!isPostPage ? 'text-[--ink]' : 'text-[--ink-soft] hover:text-[--ink]'} transition-colors`}
                        >
                            Blog
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="hidden sm:block text-sm font-[outfit] text-[--ink-soft] hover:text-[--ink] transition-colors"
                        >
                            ← Back to Portfolio
                        </Link>
                        <Link
                            href="/#Contact"
                            className="bg-[--ink] text-[--bg] px-4 py-1.5 rounded-full text-sm font-[outfit] font-medium hover:bg-[--accent] transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
