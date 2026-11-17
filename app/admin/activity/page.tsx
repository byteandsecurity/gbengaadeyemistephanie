import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { auditLog } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { PageTitle } from "@/components/admin/ui";
import { ActivityList } from "../page";

export const metadata = { title: "Activity" };

export default async function ActivityPage() {
  await requireAdmin();
  const rows = await getDb().select().from(auditLog).orderBy(desc(auditLog.at)).limit(200);
  return (
    <div className="space-y-6">
      <PageTitle title="Activity" />
      <p className="max-w-2xl text-muted">
        Every sign-in, failed attempt and content change, newest first (last 200). Times are in Lagos time. Content values are not logged, only which fields changed.
      </p>
      <ActivityList rows={rows} />
    </div>
  );
}
