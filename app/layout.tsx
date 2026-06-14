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
  title: "Nikhil Thakur — Cooking Things For Web",
  description:
    "Nikhil Thakur is a frontend developer from India crafting engaging, accessible and visually striking web experiences with Next.js, React and Node.js.",
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
