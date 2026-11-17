import type { ReactNode } from "react";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/source-serif-4";
import "./globals.css";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="h-full">
        <body className="min-h-full">{children}</body>
        </html>
    );
}