import type { ReactNode } from "react";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/source-serif-4";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="h-full" suppressHydrationWarning>
        <body className="min-h-full bg-paper text-ink">
        <ThemeProvider>
            {children}
            <ServiceWorkerRegister />
        </ThemeProvider>
        </body>
        </html>
    );
}