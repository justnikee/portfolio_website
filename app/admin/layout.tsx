import type { Metadata } from 'next'
import AdminShell from './AdminShell'

// Authenticated management screens must not be prerendered or indexed.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminShell>{children}</AdminShell>
}
