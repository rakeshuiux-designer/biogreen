import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/session";
import { getOrders, Order } from "@/lib/store";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending_confirmation: { label: "Pending", color: "bg-amber-100 text-amber-800" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

export default async function AdminOrdersPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  let orders: Order[] = [];
  let dbError = false;
  try {
    orders = await getOrders();
  } catch {
    dbError = true;
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-forest text-cream px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-body text-sm text-cream/70 hover:text-cream">← Dashboard</Link>
          <h1 className="font-display text-xl">Orders</h1>
        </div>
        <span className="font-body text-sm text-cream/70">{session.name}</span>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {dbError ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4">
            <p className="font-body text-sm text-amber-800">Database not connected — set <code>POSTGRES_URL</code> in Vercel environment variables.</p>
          </div>
        ) : orders.length === 0 ? (
          <p className="font-body text-ink/60">No orders yet. They'll appear here when customers place orders.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const s = STATUS_LABELS[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-700" };
              return (
                <div key={order.id} className="bg-white border border-ink/10 rounded-lg p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm font-semibold text-ink">{order.id}</span>
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
                      </div>
                      <p className="font-body text-sm text-ink/70">
                        {order.customer.name} · {order.customer.phone} · {order.customer.email}
                      </p>
                      <p className="font-body text-xs text-ink/50 mt-0.5">
                        {order.customer.city}, {order.customer.state} {order.customer.pincode}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl text-forest">₹{order.subtotal.toLocaleString("en-IN")}</p>
                      <p className="font-mono text-xs text-ink/50">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-ink/10">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {order.lines.map((line: any) => (
                        <span key={line.variantId} className="font-body text-xs bg-cream-dark px-3 py-1 rounded-full text-ink/70">
                          {line.productName} {line.variantLabel} × {line.quantity}
                        </span>
                      ))}
                    </div>
                    {order.notes && (
                      <p className="font-body text-xs text-ink/60 mb-3">Note: {order.notes}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {(["confirmed", "shipped", "delivered", "cancelled"] as const).map((status) => (
                        <form key={status} action={`/api/admin/orders/${order.id}`} method="POST">
                          <input type="hidden" name="status" value={status} />
                          <button
                            type="submit"
                            disabled={order.status === status}
                            className="font-body text-xs px-3 py-1.5 rounded border border-forest/30 text-forest hover:bg-forest/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Mark {STATUS_LABELS[status]?.label}
                          </button>
                        </form>
                      ))}
                    </div>
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
