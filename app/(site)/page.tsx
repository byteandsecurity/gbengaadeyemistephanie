import Link from "next/link";
import { Container, Section } from "@/components/layout";
import { getCredentials, getProfile, getRecognition } from "@/lib/content";
import type { Panel } from "@/content/types";

function PathPanel({
  href,
  panel,
  className,
}: {
  href: string;
  panel: Panel;
  className: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between gap-12 p-7 transition-[flex-grow] duration-500 sm:p-10 md:min-h-120 md:flex-1 md:hover:grow-[1.35] ${className}`}
    >
      <div>
        <h2 className="text-4xl font-bold sm:text-5xl">{panel.title}</h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed">{panel.lead}</p>
      </div>
      <div>
        <ul className="max-w-md divide-y divide-current/25 border-y border-current/25">
          {panel.proof.map((line) => (
            <li key={line} className="py-3 text-[0.98rem] leading-snug">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-display text-lg font-semibold underline decoration-2 underline-offset-[6px]">
          {panel.cta}
        </p>
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
    <>
      <Container className="pb-12 pt-14 sm:pb-16 sm:pt-20">
        <h1 className="max-w-5xl text-5xl font-bold sm:text-7xl lg:text-[5.5rem]">{profile.headline}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{profile.intro}</p>
      </Container>

      <Container>
        <div className="flex flex-col md:flex-row">
          <PathPanel
            href="/software"
            panel={profile.panels.software}
            className="on-cobalt bg-cobalt text-white"
          />
          <PathPanel href="/cybersecurity" panel={profile.panels.security} className="bg-amber text-ink" />
        </div>
      </Container>

      <div className="mt-16 sm:mt-20">
        <Section title="About">
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
            <div className="max-w-2xl space-y-5">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold">Where I work</h3>
              <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug text-muted">
                {profile.focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Credentials and recognition">
          <div className="grid gap-14 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold">Certifications and memberships</h3>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {credentials.map((c) => (
                  <div key={c.id} className="py-4">
                    <dt className="font-display text-lg font-semibold">{c.name}</dt>
                    <dd className="text-[0.98rem] text-muted">
                      {c.issuer}. {c.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-xl font-bold">Honours</h3>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {recognition.map((r) => (
                  <div key={r.id} className="py-4">
                    <dt className="font-display text-lg font-semibold">{r.title}</dt>
                    <dd className="text-[0.98rem] text-muted">{r.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
