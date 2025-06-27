// components/ThemeWrapper.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import Header from "../common/Header";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Avoid mismatched hydration

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
        </ThemeProvider>
    );
}
