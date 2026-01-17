import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import ClientLayout from "./ClientLayout";
import SmoothScrolling from "./components/SmoothScroll";


export const metadata: Metadata = {
  title: "Nikhil - Personal Portfolio",
  description: "My personal portfolio website",
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
