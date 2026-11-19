import type { Metadata } from "next";
import Link from "next/link";
import { Bullets, Container, PageHero, Row, Section, StatusTag } from "@/components/layout";
import { getExperience, getProjects, getResearch } from "@/lib/content";

export const metadata: Metadata = {
    title: "Software engineering",
    description:
        "Front-end and mobile work in React, Next.js and React Native: Sidmach Technologies, a biometric voting system and mobile apps.",
};

const stack = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "Expo",
    "Tailwind CSS",
    "NativeWind",
    "Appwrite",
    "Zustand",
    "Redux",
    "Sentry",
    "Python",
    "Figma",
    "Git",
    "Jira",
];

function HeroSoftwareVisual() {
    return (
        <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
            <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
                {/* Subtle outer perimeter rings */}
                <div className="pointer-events-none absolute inset-0 rounded-full border border-white/15 bg-white/5" />
                <div className="pointer-events-none absolute inset-4 rounded-full border border-dashed border-white/25" />

                {/* Large Code Brackets Icon */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="relative h-24 w-24 text-white drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] animate-float-slow sm:h-28 sm:w-28"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                    <line x1="14" y1="4" x2="10" y2="20" className="opacity-75" />
                </svg>
            </div>

            <p className="mt-4 font-display text-xs font-semibold uppercase tracking-widest text-white/80">
                Software Engineering Track
            </p>
            <p className="mt-1 font-display text-lg font-bold text-white">
                Web, Mobile &amp; Systems
            </p>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-white/80">
                Production interfaces, resilient state, and security built in from screen one.
            </p>
        </div>
    );
}

export default async function SoftwarePage() {
    const [experience, projects, research] = await Promise.all([
        getExperience("software"),
        getProjects(),
        getResearch("software"),
    ]);

    return (
        <div className="bg-paper text-ink transition-colors duration-300">
            <div className="border-b border-line bg-surface">
                <Container className="py-3">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
                        <Link
                            href="/"
                            className="font-display font-medium text-ink transition-colors hover:text-emerald-deep dark:hover:text-emerald-light"
                        >
                            Home
                        </Link>
                        <span aria-hidden="true">/</span>
                        <span>Software Engineering</span>
                    </nav>
                </Container>
            </div>

            <PageHero
                tone="cobalt"
                title="Interfaces that hold up in real use."
                lead="Responsive web and cross-platform mobile work in React, Next.js and React Native, with security considered from the first screen."
                items={stack}
                itemsLabel="Tools I work with"
                visual={<HeroSoftwareVisual />}
            />

            <Section title="Experience">
                <div className="rounded-2xl border border-line bg-surface px-6 py-2 [&>article]:py-7 [&>article:first-child]:pt-7">
                    {experience.map((job) => (
                        <Row
                            key={job.id}
                            meta={
                                <>
                                    <p>{job.period}</p>
                                    {job.place ? <p className="mt-0.5 text-muted">{job.place}</p> : null}
                                    {job.status ? (
                                        <p className="mt-2">
                                            <StatusTag status={job.status} tone="cobalt" />
                                        </p>
                                    ) : null}
                                </>
                            }
                            title={job.role}
                            subtitle={job.org}
                        >
                            {job.summary ? <p className="mb-4 max-w-2xl text-muted">{job.summary}</p> : null}
                            <Bullets items={job.bullets} />
                        </Row>
                    ))}
                </div>
            </Section>

            <Section title="Projects">
                <div className="rounded-2xl border border-line bg-surface px-6 py-2 [&>article]:py-7 [&>article:first-child]:pt-7">
                    {projects.map((project) => (
                        <Row
                            key={project.id}
                            meta={
                                <>
                                    <p>
                                        <StatusTag status={project.status} tone="cobalt" />
                                    </p>
                                    {project.period ? <p className="mt-2 text-muted">{project.period}</p> : null}
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-md border border-line bg-paper px-2 py-0.5 text-xs text-ink/80"
                                            >
                        {tech}
                      </span>
                                        ))}
                                    </div>
                                </>
                            }
                            title={project.title}
                        >
                            <p className="max-w-2xl text-ink/90">{project.description}</p>
                            <div className="mt-4">
                                <Bullets items={project.highlights} />
                            </div>
                        </Row>
                    ))}
                </div>
            </Section>

            <Section
                id="research"
                title="Research"
                intro="Written during my internship at ChamsMobile. These are summaries only."
            >
                <div className="rounded-2xl border border-line bg-surface px-6 py-2 [&>article]:py-7 [&>article:first-child]:pt-7">
                    {research.map((paper) => (
                        <Row key={paper.id} meta={<p>{paper.context}</p>} title={paper.title}>
                            <p className="max-w-2xl text-ink/90">{paper.summary}</p>
                        </Row>
                    ))}
                </div>
            </Section>

            <Container className="pb-8">
                <p className="text-sm text-muted">
                    Want to browse live deployments, architecture briefs, and demo walkthroughs? Visit the{" "}
                    <Link href="/works" className="font-semibold text-emerald-deep dark:text-emerald-light">
                        Works gallery
                    </Link>
                    .
                </p>
            </Container>
        </div>
    );
}