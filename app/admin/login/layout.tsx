import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Login | Nikhil",
    description: "Sign in to manage your blog",
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // This layout opts out of Header/Footer from root layout
    // The admin/layout.tsx handles the rest
    return children;
}
