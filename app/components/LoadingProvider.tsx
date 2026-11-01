"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Preloader from "./Preloader";

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
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  // Lock body scroll while the preloader is on screen.
  useEffect(() => {
    if (showPreloader) {
      document.body.classList.add("is-loading");
    } else {
      document.body.classList.remove("is-loading");
    }
  }, [showPreloader]);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {showPreloader && <Preloader
        onReveal={() => setIsLoading(false)}
        onComplete={() => { setIsLoading(false); setShowPreloader(false); }}
      />}
      {children}
    </LoadingContext.Provider>
  );
}
