import Link from "next/link";
import { Container, Section } from "@/components/layout";

export default function WorksPage() {
    const projects = [
        {
            title: "Didache Milk & Honey",
            category: "Software Engineering",
            track: "violet",
            description: "A Next.js 16.4.3, TypeScript, and Supabase web application featuring QR-code scanning, offline queue syncing, and geofenced attendance check-in deployed on Vercel.",
            tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
            link: "#",
        },
        {
            title: "AuthorShelf",
            category: "Software Architecture",
            track: "violet",
            description: "A web platform built for authors to manage serial manuscripts, organize chapters, and collect structured beta reader feedback with secure role-based access.",
            tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
            link: "#",
        },
        {
            title: "Byte & Security Portal",
            category: "Cybersecurity & GRC",
            track: "emerald",
            description: "Internal Zero-Trust security protocols, mandatory Multi-Factor Authentication telemetry, and secure credential workflows for collaborator access control.",
            tech: ["Next.js", "Sanity CMS", "Zero-Trust", "Ubuntu CLI"],
            link: "#",
        },
    ];

    return (
        <div className="bg-paper text-ink py-12 sm:py-20">
            <Container>
                {/* Header Breadcrumb */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
                        <span>← Back to Home</span>
                    </Link>
                </div>

                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-emerald">
                        <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
                        <span>Selected Projects &amp; Systems</span>
                    </div>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Engineering &amp; GRC Works
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                        Explore production web applications, secure infrastructure prototypes, and governance frameworks built under the Byte &amp; Security initiative.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => {
                        const isViolet = project.track === "violet";
                        return (
                            <div
                                key={project.title}
                                className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:border-violet-light/50 hover:shadow-xl"
                            >
                                <div>
                                    <div className="flex items-center justify-between">
                    <span
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                            isViolet ? "bg-violet-soft text-violet-light" : "bg-emerald-soft text-emerald"
                        }`}
                    >
                      {project.category}
                    </span>
                                    </div>

                                    <h3 className="mt-4 text-2xl font-bold transition-colors group-hover:text-violet-light">
                                        {project.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {project.tech.map((t) => (
                                            <span key={t} className="rounded-md border border-line bg-paper px-2 py-1 text-xs text-muted">
                        {t}
                      </span>
                                        ))}
                                    </div>

                                    <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ink group-hover:underline">
                    <span>View Project Details</span>
                    <span>→</span>
                  </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}