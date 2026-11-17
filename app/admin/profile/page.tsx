import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/session";
import { profileFields } from "@/lib/admin/collections";
import { loadProfileValues } from "@/lib/admin/load";
import { EntryForm } from "@/components/admin/EntryForm";
import { PageTitle } from "@/components/admin/ui";
import { saveProfile } from "../actions";

export const metadata:Metadata = { title: "Profile" };

export default async function ProfilePage() {
  await requireAdmin();
  const initial = await loadProfileValues();
  return (
    <div className="max-w-3xl space-y-8">
      <PageTitle title="Profile and landing page" />
      <EntryForm fields={profileFields} initial={initial} action={saveProfile} submitLabel="Save and update site" />
    </div>
  );
}
