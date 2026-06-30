// Sends email notifications via Resend (https://resend.com) when a new
// order or wholesale inquiry comes in. Requires RESEND_API_KEY and
// ADMIN_NOTIFICATION_EMAIL in your environment variables.
//
// If these aren't set, notifications are silently skipped (logged to the
// server console) rather than crashing the order/inquiry flow — a missing
// email shouldn't block a customer's order from being saved.

import { Order, WholesaleInquiry } from "@/lib/store";

const RESEND_API_URL = "https://api.resend.com/emails";

async function sendEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Bio-Green Store <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.log(
      "[email] Skipped — RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL not set.",
      { subject }
    );
    return;
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[email] Resend API error:", res.status, errBody);
    }
  } catch (err) {
    console.error("[email] Failed to send notification:", err);
  }
}

export async function notifyNewOrder(order: Order) {
  const itemsHtml = order.lines
    .map(
      (l) =>
        `<tr><td style="padding:4px 8px;">${l.productName} — ${l.variantLabel} × ${l.quantity}</td><td style="padding:4px 8px;text-align:right;">₹${l.lineTotal.toLocaleString("en-IN")}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family: sans-serif; max-width: 480px;">
      <h2 style="color:#1F4D3A;">New order received</h2>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Customer:</strong> ${order.customer.name} (${order.customer.phone}, ${order.customer.email})</p>
      <p><strong>Deliver to:</strong> ${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.pincode}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;">
        ${itemsHtml}
        <tr><td style="padding:8px;font-weight:bold;border-top:1px solid #ddd;">Total</td><td style="padding:8px;text-align:right;font-weight:bold;border-top:1px solid #ddd;">₹${order.subtotal.toLocaleString("en-IN")}</td></tr>
      </table>
      ${order.notes ? `<p style="margin-top:12px;"><strong>Notes:</strong> ${order.notes}</p>` : ""}
      <p style="margin-top:20px;font-size:13px;color:#666;">Open the admin dashboard to confirm and respond.</p>
    </div>
  `;

  await sendEmail(`New order ${order.id} — ₹${order.subtotal.toLocaleString("en-IN")}`, html);
}

export async function notifyNewWholesaleInquiry(inquiry: WholesaleInquiry) {
  const html = `
    <div style="font-family: sans-serif; max-width: 480px;">
      <h2 style="color:#3D2817;">New wholesale inquiry</h2>
      <p><strong>Reference:</strong> ${inquiry.id}</p>
      <p><strong>Business:</strong> ${inquiry.businessName}</p>
      <p><strong>Contact:</strong> ${inquiry.contactName} (${inquiry.phone}, ${inquiry.email})</p>
      <p><strong>City:</strong> ${inquiry.city || "—"}</p>
      <p><strong>Interested in:</strong> ${inquiry.productsInterested}</p>
      <p><strong>Estimated quantity:</strong> ${inquiry.estimatedQuantity || "—"}</p>
      ${inquiry.message ? `<p><strong>Message:</strong> ${inquiry.message}</p>` : ""}
      <p style="margin-top:20px;font-size:13px;color:#666;">Open the admin dashboard to respond.</p>
    </div>
  `;

  await sendEmail(`New wholesale inquiry — ${inquiry.businessName}`, html);
}
