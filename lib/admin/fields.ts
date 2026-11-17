// Field definitions drive both the edit forms and the validation of what is saved.
// This file is plain data and logic, so it can be used from server and client code.

import { z } from "zod";

export type Field =
  | { name: string; label: string; type: "text"; required?: boolean; max?: number; help?: string }
  | { name: string; label: string; type: "url"; required?: boolean; help?: string }
  | { name: string; label: string; type: "textarea"; required?: boolean; max?: number; rows?: number; help?: string }
  /** One item per line */
  | { name: string; label: string; type: "lines"; required?: boolean; rows?: number; help?: string }
  /** One paragraph per blank-line-separated block */
  | { name: string; label: string; type: "paragraphs"; required?: boolean; rows?: number; help?: string }
  /** Short items separated by commas */
  | { name: string; label: string; type: "commas"; required?: boolean; help?: string }
  | { name: string; label: string; type: "number"; required?: boolean; help?: string }
  | { name: string; label: string; type: "select"; options: string[]; required?: boolean; help?: string }
  | { name: string; label: string; type: "checkboxes"; options: string[]; required?: boolean; help?: string };

/** Fields every list-based collection has. */
export const bookkeepingFields: Field[] = [
  {
    name: "position",
    label: "Order",
    type: "number",
    required: true,
    help: "Lowest number shows first on the page.",
  },
];

export type FormValues = Record<string, string | string[]>;
export type ParsedValues = Record<string, string | number | string[] | null>;

function splitList(raw: string, separator: RegExp): string[] {
  return raw
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Turns a stored value into the text shown in the form. */
export function toFormValue(field: Field, stored: unknown): string | string[] {
  if (stored === null || stored === undefined) return field.type === "checkboxes" ? [] : "";
  switch (field.type) {
    case "lines":
      return (stored as string[]).join("\n");
    case "paragraphs":
      return (stored as string[]).join("\n\n");
    case "commas":
      return (stored as string[]).join(", ");
    case "checkboxes":
      return stored as string[];
    default:
      return String(stored);
  }
}

/** Reads the raw form into strings, exactly as typed, so errors can re-fill the form. */
export function readForm(formData: FormData, fields: Field[]): FormValues {
  const out: FormValues = {};
  for (const f of fields) {
    out[f.name] = f.type === "checkboxes" ? formData.getAll(f.name).map(String) : String(formData.get(f.name) ?? "");
  }
  return out;
}

const SHORT = 300;
const LONG = 4000;

export function validate(
  fields: Field[],
  raw: FormValues,
): { ok: true; values: ParsedValues } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const values: ParsedValues = {};

  for (const f of fields) {
    const input = raw[f.name];
    const text = typeof input === "string" ? input.trim() : "";
    const fail = (msg: string) => {
      errors[f.name] = msg;
    };

    switch (f.type) {
      case "text":
      case "textarea": {
        const max = f.max ?? (f.type === "text" ? SHORT : LONG);
        if (!text) {
          if (f.required) fail("This is required.");
          values[f.name] = f.required ? "" : null;
        } else if (text.length > max) fail(`Keep this under ${max} characters.`);
        else values[f.name] = text;
        break;
      }
      case "url": {
        if (!text) {
          if (f.required) fail("This is required.");
          values[f.name] = f.required ? "" : null;
        } else if (!z.url({ protocol: /^https?$/ }).safeParse(text).success) fail("Enter a full link starting with https://");
        else values[f.name] = text;
        break;
      }
      case "number": {
        if (!/^-?\d+$/.test(text)) fail("Enter a whole number.");
        else values[f.name] = Number(text);
        break;
      }
      case "select": {
        if (!text) {
          if (f.required) fail("Choose one.");
          values[f.name] = f.required ? "" : null;
        } else if (!f.options.includes(text)) fail("Choose one of the listed options.");
        else values[f.name] = text;
        break;
      }
      case "checkboxes": {
        const picked = Array.isArray(input) ? input : [];
        if (picked.some((p) => !f.options.includes(p))) fail("Choose from the listed options.");
        else if (f.required && picked.length === 0) fail("Choose at least one.");
        else values[f.name] = picked;
        break;
      }
      case "lines":
      case "paragraphs":
      case "commas": {
        const normalised = text.replace(/\r\n/g, "\n");
        const items = splitList(normalised, f.type === "lines" ? /\n+/ : f.type === "paragraphs" ? /\n{2,}/ : /,/);
        if (items.length === 0 && f.required) fail("Add at least one.");
        else if (items.some((i) => i.length > LONG)) fail(`Each item must be under ${LONG} characters.`);
        else values[f.name] = items;
        break;
      }
    }
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, values };
}
