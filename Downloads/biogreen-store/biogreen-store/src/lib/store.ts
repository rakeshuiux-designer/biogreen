import { getPool, ensureSchema } from "@/lib/db";

export type OrderLine = {
  productSlug: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderStatus =
  | "pending_confirmation"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  lines: OrderLine[];
  subtotal: number;
  notes?: string;
  status: OrderStatus;
};

export type WholesaleStatus = "new" | "contacted" | "closed";

export type WholesaleInquiry = {
  id: string;
  createdAt: string;
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  city: string;
  productsInterested: string;
  estimatedQuantity: string;
  message?: string;
  status: WholesaleStatus;
};

export type AdminNote = {
  id: number;
  createdAt: string;
  recordType: "order" | "wholesale_inquiry";
  recordId: string;
  adminEmail: string;
  note: string;
};

function rowToOrder(row: any): Order {
  return {
    id: row.id,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    customer: {
      name: row.customer_name,
      email: row.customer_email,
      phone: row.customer_phone,
      address: row.address,
      city: row.city,
      state: row.state,
      pincode: row.pincode,
    },
    lines: row.lines,
    subtotal: row.subtotal,
    notes: row.notes ?? undefined,
    status: row.status,
  };
}

function rowToInquiry(row: any): WholesaleInquiry {
  return {
    id: row.id,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    contactName: row.contact_name,
    businessName: row.business_name,
    email: row.email,
    phone: row.phone,
    city: row.city ?? "",
    productsInterested: row.products_interested ?? "",
    estimatedQuantity: row.estimated_quantity ?? "",
    message: row.message ?? undefined,
    status: row.status,
  };
}

export async function saveOrder(order: Order) {
  await ensureSchema();
  const db = getPool();
  await db.query(
    `INSERT INTO orders
      (id, created_at, customer_name, customer_email, customer_phone, address, city, state, pincode, lines, subtotal, notes, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
    [
      order.id,
      order.createdAt,
      order.customer.name,
      order.customer.email,
      order.customer.phone,
      order.customer.address,
      order.customer.city,
      order.customer.state,
      order.customer.pincode,
      JSON.stringify(order.lines),
      order.subtotal,
      order.notes ?? null,
      order.status,
    ]
  );
}

export async function getOrders(): Promise<Order[]> {
  await ensureSchema();
  const db = getPool();
  const { rows } = await db.query(`SELECT * FROM orders ORDER BY created_at DESC`);
  return rows.map(rowToOrder);
}

export async function getOrderById(id: string): Promise<Order | null> {
  await ensureSchema();
  const db = getPool();
  const { rows } = await db.query(`SELECT * FROM orders WHERE id = $1`, [id]);
  return rows[0] ? rowToOrder(rows[0]) : null;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  await ensureSchema();
  const db = getPool();
  await db.query(`UPDATE orders SET status = $2 WHERE id = $1`, [id, status]);
}

export async function saveWholesaleInquiry(inquiry: WholesaleInquiry) {
  await ensureSchema();
  const db = getPool();
  await db.query(
    `INSERT INTO wholesale_inquiries
      (id, created_at, contact_name, business_name, email, phone, city, products_interested, estimated_quantity, message, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
      inquiry.id,
      inquiry.createdAt,
      inquiry.contactName,
      inquiry.businessName,
      inquiry.email,
      inquiry.phone,
      inquiry.city,
      inquiry.productsInterested,
      inquiry.estimatedQuantity,
      inquiry.message ?? null,
      inquiry.status,
    ]
  );
}

export async function getWholesaleInquiries(): Promise<WholesaleInquiry[]> {
  await ensureSchema();
  const db = getPool();
  const { rows } = await db.query(
    `SELECT * FROM wholesale_inquiries ORDER BY created_at DESC`
  );
  return rows.map(rowToInquiry);
}

export async function getWholesaleInquiryById(id: string): Promise<WholesaleInquiry | null> {
  await ensureSchema();
  const db = getPool();
  const { rows } = await db.query(`SELECT * FROM wholesale_inquiries WHERE id = $1`, [id]);
  return rows[0] ? rowToInquiry(rows[0]) : null;
}

export async function updateWholesaleStatus(id: string, status: WholesaleStatus) {
  await ensureSchema();
  const db = getPool();
  await db.query(`UPDATE wholesale_inquiries SET status = $2 WHERE id = $1`, [id, status]);
}

export async function addAdminNote(note: Omit<AdminNote, "id" | "createdAt">) {
  await ensureSchema();
  const db = getPool();
  await db.query(
    `INSERT INTO admin_notes (record_type, record_id, admin_email, note) VALUES ($1, $2, $3, $4)`,
    [note.recordType, note.recordId, note.adminEmail, note.note]
  );
}

export async function getAdminNotes(
  recordType: "order" | "wholesale_inquiry",
  recordId: string
): Promise<AdminNote[]> {
  await ensureSchema();
  const db = getPool();
  const { rows } = await db.query(
    `SELECT * FROM admin_notes WHERE record_type = $1 AND record_id = $2 ORDER BY created_at ASC`,
    [recordType, recordId]
  );
  return rows.map((r: any) => ({
    id: r.id,
    createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
    recordType: r.record_type,
    recordId: r.record_id,
    adminEmail: r.admin_email,
    note: r.note,
  }));
}

export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
}
