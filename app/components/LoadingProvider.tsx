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

  // Lock body scroll while the preloader is on screen.
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("is-loading");
    } else {
      document.body.classList.remove("is-loading");
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {children}
    </LoadingContext.Provider>
  );
}
