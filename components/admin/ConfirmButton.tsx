"use client";

import type { ReactNode } from "react";

/** A submit button that asks "are you sure?" first. */
export function ConfirmButton({ message, children }: { message: string; children: ReactNode }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className="inline-flex items-center rounded-md border border-danger px-5 py-2.5 font-display text-base font-semibold text-danger hover:bg-danger-soft"
    >
      {children}
    </button>
  );
}
