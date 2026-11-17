"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { FormState } from "@/app/admin/actions";
import type { Field, FormValues } from "@/lib/admin/fields";
import { buttonClass, inputClass, Notice, secondaryButtonClass } from "./ui";

interface Props {
  fields: Field[];
  initial: FormValues;
  /** Pass for list items; leave undefined for the profile, which has no draft state */
  initialPublished?: boolean;
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  cancelHref?: string;
  submitLabel: string;
}

function FieldInput({ field, value, error }: { field: Field; value: string | string[]; error?: string }) {
  const id = `f-${field.name}`;
  const describedBy = [field.help ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  const common = { id, name: field.name, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy } as const;
  const text = typeof value === "string" ? value : "";

  let control: React.ReactNode;
  switch (field.type) {
    case "textarea":
    case "lines":
    case "paragraphs":
      control = <textarea {...common} rows={field.rows ?? 4} defaultValue={text} className={inputClass} />;
      break;
    case "number":
      control = <input {...common} type="text" inputMode="numeric" defaultValue={text} className={`${inputClass} max-w-40`} />;
      break;
    case "select":
      control = (
        <select {...common} defaultValue={text} className={`${inputClass} max-w-md`}>
          {!field.required || text === "" ? <option value="">{field.required ? "Choose…" : "None"}</option> : null}
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
      break;
    case "checkboxes":
      control = (
        <div className="flex flex-wrap gap-x-6 gap-y-2" aria-describedby={describedBy}>
          {field.options.map((o) => (
            <label key={o} className="flex items-center gap-2">
              <input type="checkbox" name={field.name} value={o} defaultChecked={Array.isArray(value) && value.includes(o)} className="size-4" />
              {o}
            </label>
          ))}
        </div>
      );
      break;
    default:
      control = <input {...common} type={field.type === "url" ? "url" : "text"} defaultValue={text} className={inputClass} />;
  }

  const labelEl =
    field.type === "checkboxes" ? (
      <span className="block font-display text-base font-semibold">{field.label}</span>
    ) : (
      <label htmlFor={id} className="block font-display text-base font-semibold">
        {field.label}
        {field.required ? <span className="text-muted"> (required)</span> : null}
      </label>
    );

  return (
    <div>
      {labelEl}
      {field.help ? (
        <p id={`${id}-help`} className="mb-1.5 text-[0.9rem] text-muted">
          {field.help}
        </p>
      ) : null}
      <div className="mt-1.5">{control}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 font-display text-[0.92rem] font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EntryForm({ fields, initial, initialPublished, action, cancelHref, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  const values = state.values ?? initial;
  const published = state.published ?? initialPublished;

  return (
    <form action={formAction} noValidate>
      {/* Re-keyed on every submit so the fields show exactly what was typed */}
      <div key={state.nonce ?? 0} className="space-y-6">
        {state.message ? <Notice tone={state.errors ? "error" : "ok"}>{state.message}</Notice> : null}
        {fields.map((f) => (
          <FieldInput key={f.name} field={f} value={values[f.name] ?? (f.type === "checkboxes" ? [] : "")} error={state.errors?.[f.name]} />
        ))}
        {published !== undefined ? (
          <label className="flex items-start gap-3 rounded-md border border-line bg-white px-4 py-3">
            <input type="checkbox" name="published" defaultChecked={published} className="mt-1.5 size-4" />
            <span>
              <span className="block font-display font-semibold">Published</span>
              <span className="block text-[0.9rem] text-muted">Untick to keep this as a draft that visitors cannot see.</span>
            </span>
          </label>
        ) : null}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={buttonClass}>
          {pending ? "Saving…" : submitLabel}
        </button>
        {cancelHref ? (
          <Link href={cancelHref} className={secondaryButtonClass}>
            Cancel
          </Link>
        ) : null}
      </div>
    </form>
  );
}
