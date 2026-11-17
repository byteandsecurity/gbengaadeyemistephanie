import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requirePending } from "@/lib/auth/session";
import { CodeForm } from "@/components/admin/CodeForm";
import { verifyCode } from "./actions";

export const metadata: Metadata = { title: "Authenticator code" };

export default async function VerifyPage() {
    const session = await requirePending();
    if (!session.user.totpEnabled) redirect("/admin/mfa-setup");

    return (
        <div className="mx-auto max-w-md">
            <h1 className="text-3xl font-bold">Enter your code</h1>
            <p className="mb-8 mt-2 text-muted">Open your authenticator app and type the current 6-digit code for this site.</p>
            <CodeForm action={verifyCode} submitLabel="Sign in" />
        </div>
    );
}