'use client'

import { useAuth } from '@/app/context/AuthContext'
import Image from 'next/image'

export default function AdminHeader() {
    const { user, signOut } = useAuth()

    return (
        <header className="h-16 bg-[#0a0a0a] border-b border-[#2a2a2a] flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <h1 className="text-white font-[outfit] text-lg">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center overflow-hidden">
                        {user?.user_metadata?.avatar_url ? (
                            <Image
                                src={user.user_metadata.avatar_url}
                                alt="Avatar"
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-white text-sm font-medium">
                                {user?.email?.[0]?.toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                    <span className="text-[#888] font-[outfit] text-sm hidden sm:block">
                        {user?.user_metadata?.full_name || user?.email}
                    </span>
                </div>

                {/* Sign Out */}
                <button
                    onClick={signOut}
                    className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#888] hover:text-white hover:border-[#3a3a3a] font-[outfit] text-sm transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </header>
    )
}
