import type { Profile } from "@/content/types";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer id="contact" className="border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Let&apos;s talk about a role.</h2>
          <p className="mt-4 max-w-xl text-white/80">
            I&apos;m open to entry-level roles in governance, risk and compliance, cyber governance
            and secure digital product delivery. Email is the quickest way to reach me.
          </p>
        </div>
        <ul className="space-y-2 font-display text-lg md:text-right">
          <li>
            <a className="underline underline-offset-4" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href={profile.linkedin} rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href={profile.github} rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-white/65 sm:px-8">
          {profile.name}
        </p>
      </div>
    </footer>
  );
}
