"use client";

import React from 'react';
import { LoadingProvider } from './context/LoadingContext';
import Preloader from './components/Preloader';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LoadingProvider>
            <Preloader />
            {children}
        </LoadingProvider>
    );
}
