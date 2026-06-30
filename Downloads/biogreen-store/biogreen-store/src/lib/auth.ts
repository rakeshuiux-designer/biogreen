import { getPool, ensureSchema } from "@/lib/db";
import { hashPassword } from "@/lib/session-token";

// Re-export so existing imports of `@/lib/auth` keep working.
export {
  hashPassword,
  verifyPassword,
  createSessionToken,
  verifySessionToken,
  ADMIN_SESSION_COOKIE,
} from "@/lib/session-token";
export type { SessionPayload } from "@/lib/session-token";

// --- Admin account lookup (database — Node runtime only, never imported
//     by middleware.ts) ---

export type AdminAccount = {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
};

export async function findAdminByEmail(email: string): Promise<AdminAccount | null> {
  await ensureSchema();
  const db = getPool();
  const { rows } = await db.query(
    `SELECT id, email, name, password_hash FROM admins WHERE email = $1`,
    [email.toLowerCase().trim()]
  );
  if (!rows[0]) return null;
  return {
    id: rows[0].id,
    email: rows[0].email,
    name: rows[0].name,
    passwordHash: rows[0].password_hash,
  };
}

export async function createAdmin(email: string, password: string, name: string) {
  await ensureSchema();
  const db = getPool();
  const passwordHash = hashPassword(password);
  await db.query(
    `INSERT INTO admins (email, password_hash, name) VALUES ($1, $2, $3)`,
    [email.toLowerCase().trim(), passwordHash, name]
  );
}

export async function countAdmins(): Promise<number> {
  await ensureSchema();
  const db = getPool();
  const { rows } = await db.query(`SELECT COUNT(*)::int AS count FROM admins`);
  return rows[0].count;
}
