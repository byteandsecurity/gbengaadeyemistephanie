import type { ReactNode } from "react";

export const inputClass =
  "block w-full rounded-md border border-line bg-white px-3 py-2 font-body text-base text-ink placeholder:text-muted/70 aria-[invalid=true]:border-danger";

export const buttonClass =
  "inline-flex items-center justify-center rounded-md bg-ink px-5 py-2.5 font-display text-base font-semibold text-white transition-colors hover:bg-cobalt-deep disabled:opacity-60";

export const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-md border border-line bg-white px-5 py-2.5 font-display text-base font-semibold text-ink hover:border-ink";

export function Notice({ tone, children }: { tone: "ok" | "error"; children: ReactNode }) {
  const styles = tone === "ok" ? "bg-ok-soft text-ok" : "bg-danger-soft text-danger";
  return (
    <p role={tone === "error" ? "alert" : "status"} className={`rounded-md px-4 py-3 font-display text-[0.98rem] font-medium ${styles}`}>
      {children}
    </p>
  );
}

export function PageTitle({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      {children}
    </div>
  );
}
