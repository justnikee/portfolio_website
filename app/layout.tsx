import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import ClientLayout from "./ClientLayout";
import SmoothScrolling from "./components/SmoothScroll";


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nikhil-portfolio.com'),
  title: {
    default: "Nikhil - Personal Portfolio",
    template: "%s | Nikhil"
  },
  description: "Personal portfolio and blog of Nikhil, a developer writing about tech, programming, and building on the web.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Nikhil Portfolio',
    images: [
      {
        url: '/main_images/og-image.png', // We assume this exists or fallback
        width: 1200,
        height: 630,
        alt: 'Nikhil Portfolio',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@nikhil', // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ClientLayout>
          <Header />
          <SmoothScrolling>{children}</SmoothScrolling>
          <Footer />
          <svg aria-hidden="true" className="svg-grid">
            <defs>
              <pattern
                id="hero"
                width="80"
                height="80"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect>
          </svg>
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
