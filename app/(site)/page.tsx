import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout";
import { getCredentials, getProfile, getRecognition } from "@/lib/content";
import type { Panel } from "@/content/types";

function SoftwareIcon() {
  return (
      <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-emerald-deep dark:text-emerald-light animate-float-slow"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" className="opacity-70" />
      </svg>
  );
}

function SecurityIcon() {
  return (
      <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-violet-deep dark:text-violet-light animate-float-slow"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
  );
}

function ArrowRightIcon() {
  return (
      <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
  );
}

function PathPanel({
                     href,
                     panel,
                     variant,
                   }: {
  href: string;
  panel: Panel;
  variant: "software" | "security";
}) {
  const isSoftware = variant === "software";

  const themeClasses = isSoftware
      ? "border-emerald/30 hover:border-emerald bg-gradient-to-br from-emerald-soft via-surface to-paper shadow-[0_0_40px_-15px_rgba(16,185,129,0.2)]"
      : "border-violet/30 hover:border-violet bg-gradient-to-br from-violet-soft via-surface to-paper shadow-[0_0_40px_-15px_rgba(139,92,246,0.2)]";

  const badgeClasses = isSoftware
      ? "bg-emerald-soft text-emerald-deep dark:text-emerald-light ring-1 ring-emerald/30"
      : "bg-violet-soft text-violet-deep dark:text-violet-light ring-1 ring-violet/30";

  const accentText = isSoftware
      ? "text-emerald-deep dark:text-emerald-light"
      : "text-violet-deep dark:text-violet-light";
  const dotColor = isSoftware ? "bg-emerald dark:bg-emerald-light" : "bg-violet dark:bg-violet-light";

  return (
      <Link
          href={href}
          className={`group relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl border p-6 transition-all duration-500 sm:p-10 md:min-h-120 md:flex-1 md:hover:grow-[1.35] ${themeClasses}`}
      >
        <div
            className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-90 ${
                isSoftware ? "bg-emerald/15 opacity-50" : "bg-violet/15 opacity-50"
            }`}
        />

        <div className="relative z-10">
          <div className="mb-6 flex items-center justify-between">
            <div className={`inline-flex items-center gap-2.5 rounded-xl px-3.5 py-2 ${badgeClasses}`}>
              {isSoftware ? <SoftwareIcon /> : <SecurityIcon />}
              <span className="text-xs font-semibold uppercase tracking-wider">
              {isSoftware ? "Engineering Track" : "Security & GRC Track"}
            </span>
            </div>
            <span className="relative flex h-2.5 w-2.5">
            <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dotColor}`}
            />
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dotColor}`} />
          </span>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            {panel.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">{panel.lead}</p>
        </div>

        <div className="relative z-10">
          <ul className="max-w-md divide-y divide-line border-y border-line">
            {panel.proof.map((line) => (
                <li
                    key={line}
                    className="flex items-start gap-2.5 py-3 text-sm leading-snug text-ink/90 sm:text-[0.98rem]"
                >
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />
                  <span>{line}</span>
                </li>
            ))}
          </ul>
          <div
              className={`mt-6 inline-flex items-center gap-2 font-display text-base font-semibold sm:text-lg ${accentText}`}
          >
            <span className="underline decoration-2 underline-offset-[6px]">{panel.cta}</span>
            <ArrowRightIcon />
          </div>
        </div>
      </Link>
  );
}

export default async function HomePage() {
  const [profile, credentials, recognition] = await Promise.all([
    getProfile(),
    getCredentials("home"),
    getRecognition(),
  ]);

  return (
      <div className="bg-paper text-ink transition-colors duration-300">
        {/* Hero Section */}
        <Container className="pb-10 pt-10 sm:pb-16 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.95fr] lg:gap-14">
            <div>
              <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted sm:text-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald" />
                <span>Full-Stack Engineering</span>
                <span className="text-line">•</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet" />
                <span>Cybersecurity &amp; GRC</span>
              </div>

              <h1 className="max-w-5xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.75rem]">
                {profile.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-xl">
                {profile.intro}
              </p>

              {/* Quick Recruiter Action Bar */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                    href="/works"
                    className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-display text-sm font-bold text-paper transition-transform hover:scale-[1.02] sm:text-base"
                >
                  <span>Explore Selected Works</span>
                  <ArrowRightIcon />
                </Link>
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 font-display text-sm font-semibold text-ink transition-colors hover:border-violet/50 sm:text-base"
                >
                  <span>About &amp; Socials</span>
                </Link>
              </div>
            </div>

            {/* Framed & Waist-Up Cropped Portrait Card */}
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald/30 via-transparent to-violet/30 opacity-80 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-2.5 shadow-2xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-paper">
                  <Image
                      src="/induction.jpg"
                      alt={profile.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 440px"
                      className="scale-[1.12] object-cover object-[50%_28%] contrast-[1.06] saturate-[1.04] transition-transform duration-700 hover:scale-[1.16]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between rounded-xl border border-white/15 bg-black/75 px-4 py-3 backdrop-blur-md">
                    <div>
                      <p className="font-display text-sm font-bold text-white">{profile.name}</p>
                      <p className="text-xs text-slate-300">Software Engineering &amp; GRC</p>
                    </div>
                    <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-light opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-light" />
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Two-Track Selection Cards */}
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:gap-6">
            <PathPanel href="/software" panel={profile.panels.software} variant="software" />
            <PathPanel href="/cybersecurity" panel={profile.panels.security} variant="security" />
          </div>
        </Container>

        {/* Credentials & Recognition (High-Signal Recruiter Proof) */}
        <div className="mt-14 space-y-6 sm:mt-20">
          <Section title="Credentials and recognition">
            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-ink sm:text-xl">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald" />
                  Certifications and memberships
                </h3>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  {credentials.map((c) => (
                      <div key={c.id} className="group py-4 transition-colors">
                        <dt className="font-display text-base font-semibold text-ink transition-colors group-hover:text-emerald-deep dark:group-hover:text-emerald-light sm:text-lg">
                          {c.name}
                        </dt>
                        <dd className="mt-1 text-sm text-muted sm:text-[0.98rem]">
                          {c.issuer}. {c.detail}
                        </dd>
                      </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-ink sm:text-xl">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm bg-violet" />
                  Honours
                </h3>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  {recognition.map((r) => (
                      <div key={r.id} className="group py-4 transition-colors">
                        <dt className="font-display text-base font-semibold text-ink transition-colors group-hover:text-violet-deep dark:group-hover:text-violet-light sm:text-lg">
                          {r.title}
                        </dt>
                        <dd className="mt-1 text-sm text-muted sm:text-[0.98rem]">{r.detail}</dd>
                      </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Bridge Banner to Dedicated /about & Socials Page */}
            <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
              <div className="max-w-2xl">
                <p className="font-display text-lg font-bold text-ink sm:text-xl">
                  Want the fuller story behind my engineering &amp; governance work?
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                  Read about my background, core focus areas, Byte &amp; Security, and connect across all platforms.
                </p>
              </div>
              <Link
                  href="/about"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-violet/40 bg-violet-soft px-5 py-3 font-display text-sm font-semibold text-violet-deep transition-all hover:border-violet hover:bg-violet hover:text-white dark:text-violet-light sm:text-base"
              >
                <span>Go to About &amp; Socials</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </Section>
        </div>
      </div>
  );
}