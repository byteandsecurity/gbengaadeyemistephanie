import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="border-t border-line py-14 sm:py-16">
      <Container>
        <h2 id={id ? `${id}-title` : undefined} className="text-3xl font-bold sm:text-4xl">
          {title}
        </h2>
        {intro ? <div className="mt-4 max-w-2xl text-muted">{intro}</div> : null}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

/** One entry: a narrow column of facts on the left, the story on the right. */
export function Row({
  meta,
  title,
  subtitle,
  children,
}: {
  meta: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <article className="grid gap-x-10 gap-y-3 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-[14rem_1fr]">
      <div className="text-[0.95rem] leading-snug text-muted">{meta}</div>
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        {subtitle ? <p className="mt-1 text-muted">{subtitle}</p> : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </article>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="max-w-2xl list-disc space-y-2 pl-5 marker:text-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function StatusTag({ status, tone }: { status: string; tone: "cobalt" | "amber" }) {
  const styles =
    tone === "cobalt" ? "bg-cobalt-soft text-cobalt-deep" : "bg-amber-soft text-amber-deep";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 font-display text-sm font-medium ${styles}`}>
      {status}
    </span>
  );
}

export function PageHero({
  tone,
  title,
  lead,
  items,
  itemsLabel,
    visual,
}: {
  tone: "cobalt" | "amber";
  title: string;
  lead: string;
  items?: string[];
  itemsLabel?: string;
  visual?: ReactNode;
}) {
  const palette = tone === "cobalt" ? "bg-cobalt text-white on-cobalt" : "bg-amber text-ink";
  return (
    <section className={palette}>
      <Container className="py-16 sm:py-24">
        <div className={visual ? "grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]" : ""}>
          <div>
            <h1 className="max-w-4xl font-display text-5xl font-bold sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/90">{lead}</p>
            {items ? (
                <div className="mt-10">
                  {itemsLabel ? <h2 className="font-display text-lg font-bold">{itemsLabel}</h2> : null}
                  <ul className="mt-3 flex max-w-3xl flex-wrap gap-x-6 gap-y-1 font-display text-lg">
                    {items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
            ) : null}
          </div>
          {visual ? <div className="flex justify-start lg:justify-end">{visual}</div> : null}
        </div>
      </Container>
    </section>
  );
}
