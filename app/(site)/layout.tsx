import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getProfile } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
    const profile = await getProfile();
    return {
        title: {
            default: `${profile.shortName} | Software engineering and cybersecurity`,
            template: `%s | ${profile.shortName}`,
        },
        description: profile.intro,
    };
}

interface SiteLayoutProps {
    children: ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
    const profile = await getProfile();
    return (
        <div className="flex min-h-screen flex-col">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
            >
                Skip to content
            </a>
            <SiteHeader name={profile.shortName} />
            <main id="main" className="flex-1">
                {children}
            </main>
            <SiteFooter profile={profile} />
        </div>
    );
}