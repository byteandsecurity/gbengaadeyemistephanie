import type { Profile } from "@/content/types";
import { BrandIcon } from "./BrandIcon";
import { ContactComposer } from "./ContactComposer";

// Extend Profile locally until we add brandUrl & whatsapp to db/schema.ts & admin
type ExtendedProfile = Profile & {
  brandUrl?: string;
  whatsapp?: string;
  tagline?: string;
};

export function SiteFooter({ profile }: { profile: ExtendedProfile }) {
  const brandHref = profile.brandUrl && profile.brandUrl.trim() !== "" ? profile.brandUrl : "#";
  const isBrandLive = brandHref !== "#";
  const brandGithubHref =
      profile.brandGithub && profile.brandGithub.trim() !== "" ? profile.brandGithub.trim() : null;

  const oneLiner =
      profile.tagline ||
      "Engineering resilient software interfaces and governing the systems that protect them.";

  return (
      <footer
          id="contact"
          className="border-t border-line bg-surface text-ink transition-colors duration-300"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Left Column: Pitch + Links + Byte & Security */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                <span>Available for roles &amp; collaborations</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Let&apos;s talk about a role or build.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                Open to roles in software engineering, governance, risk and compliance (GRC), and
                secure digital product delivery. Pick your preferred channel to reach out directly.
              </p>
            </div>

            <div className="space-y-4">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 font-display text-base font-medium">
                <li>
                  <a
                      className="text-ink underline decoration-violet/60 underline-offset-4 transition-colors hover:text-violet-deep dark:hover:text-violet-light"
                      href={`mailto:${profile.email}`}
                  >
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a
                      className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-emerald-deep dark:hover:text-emerald-light"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                      className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-emerald-deep dark:hover:text-emerald-light"
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                {brandGithubHref ? (
                    <li>
                      <a
                          className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-emerald-deep dark:hover:text-emerald-light"
                          href={brandGithubHref}
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        B&amp;S GitHub
                      </a>
                    </li>
                ) : null}
                <li>
                  <a
                      href={brandHref}
                      target={isBrandLive ? "_blank" : undefined}
                      rel={isBrandLive ? "noopener noreferrer" : undefined}
                      aria-disabled={!isBrandLive}
                      className="inline-flex items-center gap-2 text-emerald-deep underline decoration-emerald/50 underline-offset-4 transition-colors hover:text-ink dark:text-emerald-light"
                  >
                    <span>Byte &amp; Security</span>
                    {!isBrandLive && (
                        <span className="rounded-full border border-emerald/30 bg-emerald-soft px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wider text-emerald-deep no-underline dark:text-emerald-light">
                      Soon
                    </span>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Email / WhatsApp Panel */}
          <ContactComposer email={profile.email} whatsappNumber={profile.whatsapp} />
        </div>

        {/* Bottom Bar: Name + One-Line Saying */}
        <div className="border-t border-line bg-paper">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 py-6 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-center gap-2.5">
              <BrandIcon className="h-6 w-6 shrink-0" />
              <span className="font-display text-sm font-semibold text-ink">{profile.name}</span>
            </div>
            <p className="text-sm italic text-muted">{oneLiner}</p>
          </div>
        </div>
      </footer>
  );
}