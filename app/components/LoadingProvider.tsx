"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Preloader from "./Preloader";
import { usePathname } from "next/navigation";

type LoadingContextType = {
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType>({ isLoading: true });

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(pathname === "/");
  const [showPreloader, setShowPreloader] = useState(pathname === "/");
  const introVisible = pathname === "/" && showPreloader;

  // Lock body scroll while the preloader is on screen.
  useEffect(() => {
    if (introVisible) {
      document.body.classList.add("is-loading");
    } else {
      document.body.classList.remove("is-loading");
    }
    return () => document.body.classList.remove("is-loading");
  }, [introVisible]);

  return (
    <LoadingContext.Provider value={{ isLoading: pathname === "/" && isLoading }}>
      {introVisible && <Preloader
        onReveal={() => setIsLoading(false)}
        onComplete={() => { setIsLoading(false); setShowPreloader(false); }}
      />}
      {children}
    </LoadingContext.Provider>
  );
}
