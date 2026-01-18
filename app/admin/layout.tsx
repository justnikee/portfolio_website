'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from '@/app/components/admin/Sidebar'
import AdminHeader from '@/app/components/admin/AdminHeader'
import { AuthProvider } from '@/app/context/AuthContext'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    // Skip auth check for login page
    const isLoginPage = pathname === '/admin/login'

    useEffect(() => {
        if (!loading && !user && !isLoginPage) {
            router.push('/admin/login')
        }
    }, [user, loading, router, isLoginPage])

    // If on login page, render children directly without auth wrapper
    if (isLoginPage) {
        return <>{children}</>
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#666] font-[outfit]">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Sidebar />
            <div className="ml-64">
                <AdminHeader />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    )
}

