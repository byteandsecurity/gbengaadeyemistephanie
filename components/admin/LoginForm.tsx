"use client";

import { useActionState } from "react";
import { login, type AuthState } from "@/app/admin/login/actions";
import { buttonClass, inputClass, Notice } from "./ui";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(login, {});
  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.error ? <Notice tone="error">{state.error}</Notice> : null}
      <div>
        <label htmlFor="email" className="block font-display font-semibold">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={`${inputClass} mt-1.5`} />
      </div>
      <div>
        <label htmlFor="password" className="block font-display font-semibold">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={`${inputClass} mt-1.5`} />
      </div>
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Signing in…" : "Continue"}
      </button>
    </form>
  );
}
