"use client";

import { useActionState } from "react";
import type { AuthState } from "@/app/admin/login/actions";
import { buttonClass, inputClass, Notice } from "./ui";

export function CodeForm({
  action,
  submitLabel,
}: {
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, {});
  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.error ? <Notice tone="error">{state.error}</Notice> : null}
      <div>
        <label htmlFor="code" className="block font-display font-semibold">
          6-digit code
        </label>
        <input
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]*"
          maxLength={7}
          required
          autoFocus
          className={`${inputClass} mt-1.5 max-w-48 text-center font-display text-2xl tracking-[0.3em]`}
        />
      </div>
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Checking…" : submitLabel}
      </button>
    </form>
  );
}
