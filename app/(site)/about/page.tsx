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
        { title: "The Byte Breakdown", desc: "Translating complex security and architectural terms into accessible insights for everyone[cite: 8]." },
        { title: "Security in Real-Time", desc: "Analyzing global tech events, data privacy laws (GDPR, NDPR), and emerging threat vectors[cite: 9]." },
        { title: "The Full-Stack Secure", desc: "Examining how security lives across modern web, mobile, cloud, and IoT architectures[cite: 10]." },
        { title: "The Career Compass", desc: "Monthly roadmaps published on the 15th to empower the next generation of security professionals[cite: 11]." },
        { title: "Global Security Calendar", desc: "Event-driven campaigns anchored to international data privacy and cybersecurity milestones[cite: 12]." },
    ];

    return (
        <div className="bg-[#090A0F] text-slate-100 py-12 sm:py-20">
            <Container>
                {/* Header Breadcrumb */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                        <span>← Back to Home</span>
                    </Link>
                </div>

                {/* Main Bio Grid */}
                <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#11131A] px-3.5 py-1.5 text-xs font-medium text-[#34D399]">
                            <span className="h-2 w-2 rounded-full bg-[#34D399] animate-pulse" />
                            <span>About the Founder &amp; Engineer</span>
                        </div>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Decoding the invisible. Securing the digital future.
                        </h1>

                        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                            <p>
                                I am <strong className="text-white">{profile.name}</strong>, a Software Architect and Cybersecurity Governance, Risk, and Compliance (GRC) specialist. I hold a First-Class B.Sc. in Computer Science from Afe Babalola University and carry certifications including ISC2 Certified in Cybersecurity (CC) and the Google Cybersecurity Professional certificate.
                            </p>
                            <p>
                                My engineering philosophy bridges the gap between technical complexity and strict global standards—ensuring that every digital product I build is not only functional, but resilient and defensible by design.
                            </p>
                        </div>
                    </div>

                    {/* Portrait Showcase */}
                    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#10B981]/30 via-transparent to-[#8B5CF6]/30 opacity-75 blur-2xl" />
                        <div className="relative overflow-hidden rounded-2xl border border-[#1E2230] bg-[#11131A] p-2.5 shadow-2xl">
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#090A0F]">
                                <Image
                                    src="/induction.jpg"
                                    alt={profile.name}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 90vw, 450px"
                                    className="scale-[1.12] object-cover object-[50%_28%] transition-transform duration-700 hover:scale-[1.16]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#090A0F]/85 px-4 py-3 backdrop-blur-md">
                                    <div>
                                        <p className="font-display text-sm font-bold text-white">{profile.name}</p>
                                        <p className="text-xs text-[#34D399]">Lead Technical Officer @ Byte &amp; Security</p>
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
                        <div className="rounded-2xl border border-[#10B981]/30 bg-gradient-to-br from-[#0F1D1B] via-[#11131A] to-[#0B0D14] p-6 sm:p-10">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-lg bg-[#10B981]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#34D399] ring-1 ring-[#10B981]/30">
                                        Official Brand Framework
                                    </div>
                                    <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Bridging GRC and Engineering</h3>
                                </div>
                                <p className="max-w-md text-sm text-slate-300">
                                    <strong className="text-white">Mission:</strong> Decoding technical complexity and global GRC standards for a safer digital future[cite: 6].
                                </p>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {pillars.map((pillar, idx) => (
                                    <div key={pillar.title} className="rounded-xl border border-white/10 bg-[#090A0F]/60 p-5">
                                        <span className="text-xs font-semibold text-[#34D399]">Pillar {idx + 1}</span>
                                        <h4 className="mt-1 font-display text-base font-bold text-white">{pillar.title}</h4>
                                        <p className="mt-2 text-sm text-slate-400">{pillar.desc}</p>
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
                                className="group rounded-2xl border border-[#1E2230] bg-[#11131A] p-6 transition-all hover:border-[#8B5CF6]/60 hover:bg-[#141223]"
                            >
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA]">Code Repository</p>
                                <h4 className="mt-2 text-lg font-bold text-white group-hover:text-[#A78BFA]">GitHub</h4>
                                <p className="mt-1 text-sm text-slate-400">Explore open-source builds and production code.</p>
                            </a>

                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-2xl border border-[#1E2230] bg-[#11131A] p-6 transition-all hover:border-[#34D399]/60 hover:bg-[#0F1D1B]"
                            >
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#34D399]">Professional Network</p>
                                <h4 className="mt-2 text-lg font-bold text-white group-hover:text-[#34D399]">LinkedIn</h4>
                                <p className="mt-1 text-sm text-slate-400">View career history, endorsements, and GRC credentials.</p>
                            </a>

                            <a
                                href={`mailto:${profile.email}`}
                                className="group rounded-2xl border border-[#1E2230] bg-[#11131A] p-6 transition-all hover:border-white/40 hover:bg-white/5"
                            >
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Direct Contact</p>
                                <h4 className="mt-2 text-lg font-bold text-white">Email</h4>
                                <p className="mt-1 truncate text-sm text-slate-400">{profile.email}</p>
                            </a>

                            <a
                                href={brandHref}
                                target={isBrandLive ? "_blank" : undefined}
                                rel={isBrandLive ? "noopener noreferrer" : undefined}
                                className="group rounded-2xl border border-[#1E2230] bg-[#11131A] p-6 transition-all hover:border-[#34D399]/60 hover:bg-[#0F1D1B]"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#34D399]">Brand Asset</p>
                                    {!isBrandLive && (
                                        <span className="rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-[#34D399]">
                      Soon
                    </span>
                                    )}
                                </div>
                                <h4 className="mt-2 text-lg font-bold text-white group-hover:text-[#34D399]">Byte &amp; Security</h4>
                                <p className="mt-1 text-sm text-slate-400">Secure governance &amp; technical telemetry.</p>
                            </a>
                        </div>
                    </Section>
                </div>
            </Container>
        </div>
    );
}