import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout";
import { getProfile } from "@/lib/content";
import { BrandIcon } from "@/components/BrandIcon";

type ExtendedProfile = Awaited<ReturnType<typeof getProfile>> & {
    brandUrl?: string;
};

export default async function AboutPage() {
    const profile = (await getProfile()) as ExtendedProfile;
    const brandHref = profile.brandUrl && profile.brandUrl.trim() !== "" ? profile.brandUrl : "#";
    const isBrandLive = brandHref !== "#";

    const pillars = [
        {
            title: "The Byte Breakdown",
            desc: "Translating complex security and architectural terms into accessible insights for everyone.",
        },
        {
            title: "Security in Real-Time",
            desc: "Analyzing global tech events, data privacy laws (GDPR, NDPR), and emerging threat vectors.",
        },
        {
            title: "The Full-Stack Secure",
            desc: "Examining how security lives across modern web, mobile, cloud, and IoT architectures.",
        },
        {
            title: "The Career Compass",
            desc: "Monthly roadmaps published on the 15th to empower the next generation of security professionals.",
        },
        {
            title: "Global Security Calendar",
            desc: "Event-driven campaigns anchored to international data privacy and cybersecurity milestones.",
        },
    ];

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
                        <span>About</span>
                    </nav>
                </Container>
            </div>

            <div className="py-12 sm:py-20">
                <Container>
                    {/* Main Bio Grid */}
                    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-emerald-deep dark:text-emerald-light">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald" />
                                <span>About the Founder &amp; Engineer</span>
                            </div>

                            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                                Decoding the invisible. Securing the digital future.
                            </h1>

                            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/90 sm:text-lg">
                                <p>
                                    I am <strong className="text-ink">{profile.name}</strong>, a Software Architect and
                                    Cybersecurity Governance, Risk, and Compliance (GRC) specialist. I hold a
                                    First-Class B.Sc. in Computer Science from Afe Babalola University and carry
                                    certifications including ISC2 Certified in Cybersecurity (CC) and the Google
                                    Cybersecurity Professional certificate.
                                </p>
                                <p className="text-muted">
                                    My engineering philosophy bridges the gap between technical complexity and strict global
                                    standards—ensuring that every digital product I build is not only functional, but
                                    resilient and defensible by design.
                                </p>
                            </div>
                        </div>

                        {/* Portrait Showcase */}
                        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald/30 via-transparent to-violet/30 opacity-75 blur-2xl" />
                            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-2.5 shadow-2xl">
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-paper">
                                    <Image
                                        src="/induction.jpg"
                                        alt={profile.name}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 90vw, 450px"
                                        className="scale-[1.12] object-cover object-[50%_28%] transition-transform duration-700 hover:scale-[1.16]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/15 bg-black/75 px-4 py-3 backdrop-blur-md">
                                        <div>
                                            <p className="font-display text-sm font-bold text-white">{profile.name}</p>
                                            <p className="text-xs text-emerald-light">
                                                Lead Technical Officer @ Byte &amp; Security
                                            </p>
                                        </div>
                                        <BrandIcon className="h-6 w-6 shrink-0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Byte & Security Brand Section */}
                    <div className="mt-20">
                        <Section title="Byte &amp; Security Initiative">
                            <div className="rounded-2xl border border-emerald/30 bg-gradient-to-br from-emerald-soft via-surface to-paper p-6 sm:p-10">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-deep ring-1 ring-emerald/30 dark:text-emerald-light">
                                            Official Brand Framework
                                        </div>
                                        <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                                            Bridging GRC and Engineering
                                        </h3>
                                    </div>
                                    <p className="max-w-md text-sm text-muted">
                                        <strong className="text-ink">Mission:</strong> Decoding technical complexity and
                                        global GRC standards for a safer digital future.
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {pillars.map((pillar, idx) => (
                                        <div
                                            key={pillar.title}
                                            className="rounded-xl border border-line bg-paper/80 p-5 backdrop-blur-sm"
                                        >
                                            <span className="text-xs font-semibold text-emerald-deep dark:text-emerald-light">
                                                Pillar {idx + 1}
                                            </span>
                                            <h4 className="mt-1 font-display text-base font-bold text-ink">
                                                {pillar.title}
                                            </h4>
                                            <p className="mt-2 text-sm text-muted">{pillar.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Section>
                    </div>

                    {/* Socials & Digital Hub */}
                    <div className="mt-20">
                        <Section title="Connect &amp; Social Channels">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:border-violet/60 hover:bg-violet-soft"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-deep dark:text-violet-light">
                                        Code Repository
                                    </p>
                                    <h4 className="mt-2 font-display text-lg font-bold text-ink group-hover:text-violet-deep dark:group-hover:text-violet-light">
                                        GitHub
                                    </h4>
                                    <p className="mt-1 text-sm text-muted">
                                        Explore open-source builds and production code.
                                    </p>
                                </a>

                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:border-emerald/60 hover:bg-emerald-soft"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-deep dark:text-emerald-light">
                                        Professional Network
                                    </p>
                                    <h4 className="mt-2 font-display text-lg font-bold text-ink group-hover:text-emerald-deep dark:group-hover:text-emerald-light">
                                        LinkedIn
                                    </h4>
                                    <p className="mt-1 text-sm text-muted">
                                        View career history, endorsements, and GRC credentials.
                                    </p>
                                </a>

                                <a
                                    href={`mailto:${profile.email}`}
                                    className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:border-ink/40"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                                        Direct Contact
                                    </p>
                                    <h4 className="mt-2 font-display text-lg font-bold text-ink">Email</h4>
                                    <p className="mt-1 truncate text-sm text-muted">{profile.email}</p>
                                </a>

                                <a
                                    href={brandHref}
                                    target={isBrandLive ? "_blank" : undefined}
                                    rel={isBrandLive ? "noopener noreferrer" : undefined}
                                    className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:border-emerald/60 hover:bg-emerald-soft"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-deep dark:text-emerald-light">
                                            Brand Asset
                                        </p>
                                        {!isBrandLive && (
                                            <span className="rounded-full border border-emerald/30 bg-emerald-soft px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-deep dark:text-emerald-light">
                                                Soon
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="mt-2 font-display text-lg font-bold text-ink group-hover:text-emerald-deep dark:group-hover:text-emerald-light">
                                        Byte &amp; Security
                                    </h4>
                                    <p className="mt-1 text-sm text-muted">
                                        Secure governance &amp; technical telemetry.
                                    </p>
                                </a>
                            </div>
                        </Section>
                    </div>
                </Container>
            </div>
        </div>
    );
}