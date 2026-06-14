import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import SmoothScrolling from "./components/SmoothScroll";
import LoadingProvider from "./components/LoadingProvider";
import CustomCursor from "./components/CustomCursor";
import ParallaxController from "./components/ParallaxController";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nikhil-portfolio.com"),
  title: {
    default: "Nikhil Thakur — Cooking Things For Web",
    template: "%s | Nikhil Thakur",
  },
  description:
    "Nikhil Thakur is a frontend developer from India crafting engaging, accessible and visually striking web experiences with Next.js, React and Node.js.",
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
