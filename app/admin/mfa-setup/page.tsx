import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requirePending } from "@/lib/auth/session";
import { ensureSecret } from "@/lib/auth/mfa";
import { qrDataUrl } from "@/lib/auth/totp";
import { CodeForm } from "@/components/admin/CodeForm";
import { confirmMfaSetup } from "../verify/actions";

export const metadata:Metadata = { title: "Set up authenticator" };

export default async function MfaSetupPage() {
  const session = await requirePending();
  if (session.user.totpEnabled) redirect("/admin/verify");

  const secret = await ensureSecret(session.user.id);
  const qr = await qrDataUrl(secret, session.user.email);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Set up your authenticator</h1>
      <p className="mt-2 text-muted">
        Admin sign-in needs a second step. Scan this code with Microsoft Authenticator, Google Authenticator or any
        similar app, then enter the 6-digit code it shows.
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qr} alt="QR code for your authenticator app" width={220} height={220} className="my-6 rounded-md border border-line bg-white" />
      <p className="mb-8 text-[0.95rem] text-muted">
        Cannot scan? Enter this key by hand: <code className="break-all font-mono text-ink">{secret}</code>
      </p>
      <CodeForm action={confirmMfaSetup} submitLabel="Turn on and sign in" />
    </div>
  );
}
