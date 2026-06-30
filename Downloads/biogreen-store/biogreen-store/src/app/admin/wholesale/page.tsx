import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/session";
import { getWholesaleInquiries, WholesaleInquiry } from "@/lib/store";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-800" },
  contacted: { label: "Contacted", color: "bg-amber-100 text-amber-800" },
  closed: { label: "Closed", color: "bg-green-100 text-green-800" },
};

export default async function AdminWholesalePage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  let inquiries: WholesaleInquiry[] = [];
  let dbError = false;
  try {
    inquiries = await getWholesaleInquiries();
  } catch {
    dbError = true;
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-roast text-cream px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-body text-sm text-cream/70 hover:text-cream">← Dashboard</Link>
          <h1 className="font-display text-xl">Wholesale Inquiries</h1>
        </div>
        <span className="font-body text-sm text-cream/70">{session.name}</span>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {dbError ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4">
            <p className="font-body text-sm text-amber-800">Database not connected — set <code>POSTGRES_URL</code> in Vercel environment variables.</p>
          </div>
        ) : inquiries.length === 0 ? (
          <p className="font-body text-ink/60">No wholesale inquiries yet. They'll appear here when businesses submit the form.</p>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq) => {
              const s = STATUS_LABELS[inq.status] ?? { label: inq.status, color: "bg-gray-100 text-gray-700" };
              return (
                <div key={inq.id} className="bg-white border border-ink/10 rounded-lg p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-body font-semibold text-ink">{inq.businessName}</span>
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
                      </div>
                      <p className="font-body text-sm text-ink/70">
                        {inq.contactName} · {inq.phone} · {inq.email}
                      </p>
                      {inq.city && <p className="font-body text-xs text-ink/50 mt-0.5">{inq.city}</p>}
                    </div>
                    <p className="font-mono text-xs text-ink/50">
                      {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>

                  <div className="bg-cream-dark rounded p-3 mb-3 text-sm font-body text-ink/75 space-y-1">
                    <p><strong>Products:</strong> {inq.productsInterested || "—"}</p>
                    <p><strong>Estimated qty:</strong> {inq.estimatedQuantity || "—"}</p>
                    {inq.message && <p><strong>Message:</strong> {inq.message}</p>}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {(["contacted", "closed"] as const).map((status) => (
                      <form key={status} action={`/api/admin/wholesale/${inq.id}`} method="POST">
                        <input type="hidden" name="status" value={status} />
                        <button
                          type="submit"
                          disabled={inq.status === status}
                          className="font-body text-xs px-3 py-1.5 rounded border border-roast/30 text-roast hover:bg-roast/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Mark {STATUS_LABELS[status]?.label}
                        </button>
                      </form>
                    ))}
                    <a
                      href={`mailto:${inq.email}?subject=Re: Wholesale inquiry — ${inq.businessName}`}
                      className="font-body text-xs px-3 py-1.5 rounded bg-roast text-cream hover:bg-roast-dark transition-colors"
                    >
                      Reply by email →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
