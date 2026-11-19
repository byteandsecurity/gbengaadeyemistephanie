import type { Metadata } from "next";
import { Bullets, Container, PageHero, Row, Section, StatusTag } from "@/components/layout";
import { getCredentials, getExperience, getLabs, getResearch, getStages } from "@/lib/content";
import type { LabProject } from "@/content/types";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cybersecurity and GRC",
    description:
        "ISC2 Certified in Cybersecurity, Cyber Core Associate with the Ubuntu Bridge Initiative, and 22 hands-on projects from the Google Cybersecurity Professional Certificate.",
};

const groupOrder: LabProject["group"][] = [
    "Governance, risk and compliance",
    "Network and incident analysis",
    "Detection and response",
    "Tooling and professional practice",
];

function HeroSecurityVisual() {
    return (
        <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
            <div className="relative flex h-45 w-45 items-center justify-center sm:h-52 sm:w-52">
                {/* Subtle outer perimeter rings */}
                <div className="pointer-events-none absolute inset-0 rounded-full border border-white/15 bg-white/5" />
                <div className="pointer-events-none absolute inset-4 rounded-full border border-dashed border-white/25" />

                {/* Large Shield Icon */}
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            </div>

            <p className="mt-4 font-display text-xs font-semibold uppercase tracking-widest text-white/80">
                Cybersecurity &amp; GRC Track
            </p>
            <p className="mt-1 font-display text-lg font-bold text-white">
                Controls, Audits &amp; Defense
            </p>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-white/80">
                Risk posture, incident evidence, and practical compliance documentation.
            </p>
        </div>
    );
}

export default async function CybersecurityPage() {
    const [credentials, experience, stages, labs, research] = await Promise.all([
        getCredentials("security"),
        getExperience("security"),
        getStages(),
        getLabs(),
        getResearch("security"),
    ]);

    const ubi = experience.find((e) => e.id === "ubi");
    const others = experience.filter((e) => e.id !== "ubi");

    return (
        <div className="bg-paper text-ink transition-colors duration-300">
            <div className="border-b border-line bg-surface">
                <Container className="py-3">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
                        <Link
                            href="/"
                            className="font-display font-medium text-ink transition-colors hover:text-violet-deep dark:hover:text-violet-light"
                        >
                            Home
                        </Link>
                        <span aria-hidden="true">/</span>
                        <span>Cybersecurity &amp; GRC</span>
                    </nav>
                </Container>
            </div>

            <PageHero
                tone="amber"
                title="Risk, evidence and response, written so others can act on it."
                lead="Certified in Cybersecurity by ISC2, a Cyber Core Associate with the Ubuntu Bridge Initiative, and finished 22 hands-on projects on the Google Cybersecurity Professional Certificate."
                items={credentials.filter((c) => c.id === "isc2-cc" || c.id === "google-cyber").map((c) => c.name)}
                itemsLabel="Certifications"
                visual={<HeroSecurityVisual />}
            />

            <Section
                id="ubi"
                title="Ubuntu Bridge Initiative"
                intro={
                    ubi ? (
                        <>
                            <p className="font-display text-lg font-semibold text-ink">
                                {ubi.role}, {ubi.period}
                            </p>
                            <p className="mt-2 text-muted">{ubi.summary}</p>
                        </>
                    ): undefined
                }
            >
                <ol className="divide-y divide-line rounded-2xl border border-line bg-surface px-6">
                    {stages.map((s) => (
                        <li key={s.id} className="grid gap-x-10 gap-y-2 py-6 md:grid-cols-[14rem_1fr]">
                            <div className="flex items-baseline gap-4 md:block">
                                <p className="font-display text-3xl font-bold text-violet-deep dark:text-violet-light sm:text-4xl">
                                    Stage {s.stage}
                                </p>
                                {s.score ? <p className="mt-1 text-[0.95rem] text-muted">Score {s.score}</p> : null}
                            </div>
                            <div>
                                <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                                <p className="mt-2 max-w-2xl text-ink/90">{s.detail}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </Section>

            {others.length > 0 ? (
                <Section title="Experience">
                    <div className="rounded-2xl border border-line bg-surface px-6 py-2 [&>article]:py-7 [&>article:first-child]:pt-7">
                        {others.map((job) => (
                            <Row
                                key={job.id}
                                meta={
                                    <>
                                        <p>{job.period}</p>
                                        {job.status ? (
                                            <p className="mt-2">
                                                <StatusTag status={job.status} tone="amber" />
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
            ) : null}

            <Section
                id="labs"
                title="Lab projects"
                intro="Twenty-two simulated scenarios from the Google Cybersecurity Professional Certificate. Each one produced a written assessment, report or script."
            >
                <div className="space-y-12">
                    {groupOrder.map((group) => {
                        const items = labs.filter((l) => l.group === group);
                        return (
                            <div key={group} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="font-display text-2xl font-bold text-ink">{group}</h3>
                                    <span className="rounded-full bg-violet-soft px-3 py-1 font-display text-xs font-semibold text-violet-deep dark:text-violet-light">
                    {items.length} {items.length === 1 ? "project" : "projects"}
                  </span>
                                </div>
                                <ul className="mt-5 divide-y divide-line border-t border-line">
                                    {items.map((lab) => (
                                        <li key={lab.id} className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[6.5rem_1fr_16rem]">
                                            <p className="font-display text-[0.95rem] font-semibold text-violet-deep dark:text-violet-light">
                                                Project {lab.number}
                                            </p>
                                            <div>
                                                <h4 className="font-display text-lg font-semibold leading-snug text-ink">
                                                    {lab.title}
                                                </h4>
                                                <p className="mt-1 max-w-2xl text-[0.98rem] text-muted">{lab.summary}</p>
                                            </div>
                                            <ul className="flex flex-wrap content-start gap-1.5 text-[0.85rem] text-muted md:justify-end">
                                                {lab.tags.map((tag) => (
                                                    <li
                                                        key={tag}
                                                        className="rounded-md border border-line bg-paper px-2.5 py-0.5 text-ink/80"
                                                    >
                                                        {tag}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
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
                    Want to see hands-on builds and case studies across tracks? Check out the{" "}
                    <a href="/works" className="font-semibold text-violet-deep dark:text-violet-light">
                        Works gallery
                    </a>
                    .
                </p>
            </Container>
        </div>
    );
}