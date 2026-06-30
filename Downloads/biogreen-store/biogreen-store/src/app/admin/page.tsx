import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/session";
import { getOrders, getWholesaleInquiries, Order, WholesaleInquiry } from "@/lib/store";

export default async function AdminDashboardPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  let orders: Order[] = [];
  let inquiries: WholesaleInquiry[] = [];
  let dbError = false;

  try {
    [orders, inquiries] = await Promise.all([getOrders(), getWholesaleInquiries()]);
  } catch {
    dbError = true;
  }

  const pendingOrders = orders.filter((o) => o.status === "pending_confirmation").length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.subtotal, 0);

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-forest text-cream px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl">Bio-Green Admin</h1>
        <div className="flex items-center gap-6">
          <span className="font-body text-sm text-cream/70">{session.name}</span>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="font-body text-sm text-gold hover:text-gold-light transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="font-display text-2xl text-ink mb-8">Overview</h2>

        {dbError && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 mb-8">
            <p className="font-body text-sm text-amber-800">
              <strong>Database not connected.</strong> Set <code>POSTGRES_URL</code> in Vercel environment variables to enable order management.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard label="Pending Orders" value={pendingOrders} color="text-forest" border="border-forest/20" />
          <StatCard label="New Inquiries" value={newInquiries} color="text-roast" border="border-roast/20" />
          <StatCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString("en-IN")}`} color="text-gold-dark" border="border-gold/30" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/admin/orders" className="bg-forest text-cream rounded-lg p-6 block hover:bg-forest-dark transition-colors">
            <h3 className="font-display text-xl mb-1">Orders</h3>
            <p className="font-body text-sm text-cream/70">{orders.length} total orders</p>
            <span className="font-body text-sm text-gold mt-3 inline-block">View all →</span>
          </Link>
          <Link href="/admin/wholesale" className="bg-roast text-cream rounded-lg p-6 block hover:bg-roast-dark transition-colors">
            <h3 className="font-display text-xl mb-1">Wholesale Inquiries</h3>
            <p className="font-body text-sm text-cream/70">{inquiries.length} total inquiries</p>
            <span className="font-body text-sm text-gold mt-3 inline-block">View all →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, border }: { label: string; value: string | number; color: string; border: string }) {
  return (
    <div className={`bg-white rounded-lg border ${border} p-6`}>
      <p className="font-body text-sm text-ink/60 mb-1">{label}</p>
      <p className={`font-display text-3xl ${color}`}>{value}</p>
    </div>
  );
}
