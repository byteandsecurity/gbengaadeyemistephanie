import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata:Metadata = { title: "Sign in" };

export default async function LoginPage() {
  const session = await getSession();
  if (session?.mfaVerified) redirect("/admin");

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="mb-8 mt-2 text-muted">Only the site owner has an account. You will be asked for an authenticator code next.</p>
      <LoginForm />
    </div>
  );
}
