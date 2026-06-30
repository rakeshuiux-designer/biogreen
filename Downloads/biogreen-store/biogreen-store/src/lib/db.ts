import { Pool } from "pg";

// Lazy pool — only created when first used, not at module load time.
// This means the homepage, product pages and cart all work fine at
// build/runtime even before POSTGRES_URL is configured. Only API routes
// that touch the database will fail if POSTGRES_URL is missing.
let pool: Pool | undefined;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error(
        "POSTGRES_URL is not set. Add it to your Vercel project Environment Variables. See README.md for setup instructions."
      );
    }
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
    });
  }
  return pool;
}

// Idempotent schema setup — safe to call on every cold start.
let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = getPool();
      await db.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          name TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          customer_name TEXT NOT NULL,
          customer_email TEXT NOT NULL,
          customer_phone TEXT NOT NULL,
          address TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          pincode TEXT NOT NULL,
          lines JSONB NOT NULL,
          subtotal INTEGER NOT NULL,
          notes TEXT,
          status TEXT NOT NULL DEFAULT 'pending_confirmation'
        );
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS wholesale_inquiries (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          contact_name TEXT NOT NULL,
          business_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          city TEXT,
          products_interested TEXT,
          estimated_quantity TEXT,
          message TEXT,
          status TEXT NOT NULL DEFAULT 'new'
        );
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS admin_notes (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          record_type TEXT NOT NULL CHECK (record_type IN ('order', 'wholesale_inquiry')),
          record_id TEXT NOT NULL,
          admin_email TEXT NOT NULL,
          note TEXT NOT NULL
        );
      `);
    })();
  }
  return schemaReady;
}
