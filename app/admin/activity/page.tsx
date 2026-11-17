import { Metadata } from "next";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { auditLog } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { PageTitle } from "@/components/admin/ui";

export const metadata:Metadata = { title: "Activity" };

interface ActivityRow {
    id: number;
    at: Date;
    actor: string;
    action: string;
    target: string | null;
    detail: string | null;
    ip: string | null;
}

function ActivityList({ rows }: { rows: ActivityRow[] }) {
    if (rows.length === 0) {
        return <p className="rounded-md border border-line bg-white px-4 py-6 text-muted">No activity recorded yet.</p>;
    }

    return (
        <div className="overflow-x-auto rounded-md border border-line bg-white">
            <table className="w-full text-left font-display text-sm">
                <thead className="border-b border-line bg-paper text-muted">
                <tr>
                    <th className="px-4 py-3 font-semibold">Time (Lagos)</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                    <th className="px-4 py-3 font-semibold">Target</th>
                    <th className="px-4 py-3 font-semibold">Detail</th>
                    <th className="px-4 py-3 font-semibold">IP Address</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-line">
                {rows.map((r) => (
                    <tr key={r.id} className="hover:bg-cobalt-soft/30">
                        <td className="whitespace-nowrap px-4 py-3 text-muted">
                            {new Date(r.at).toLocaleString("en-GB", { timeZone: "Africa/Lagos" })}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-semibold">{r.action}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-muted">{r.target ?? "—"}</td>
                        <td className="px-4 py-3 text-muted">{r.detail ?? "—"}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted">{r.ip ?? "—"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

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