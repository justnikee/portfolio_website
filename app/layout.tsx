import type { Metadata } from "next";
import "./globals.css";
import "./portfolio.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import SmoothScrolling from "./components/SmoothScroll";
import LoadingProvider from "./components/LoadingProvider";
import CustomCursor from "./components/CustomCursor";
import ParallaxController from "./components/ParallaxController";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://doitnikhil.in"),
  title: {
    default: "Nikhil Thakur — Developer & Product Builder",
    template: "%s | Nikhil Thakur",
  },
  description:
    "Frontend developer building full-stack products. Explore Nikhil Thakur’s web projects, commerce experience, and independent battery digital product passport platform.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Nikhil Thakur",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      <body className={`antialiased`}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <CustomCursor />
        <LoadingProvider>
          <Header />
          <SmoothScrolling>{children}</SmoothScrolling>
          <Footer />
          <ParallaxController />
        </LoadingProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
