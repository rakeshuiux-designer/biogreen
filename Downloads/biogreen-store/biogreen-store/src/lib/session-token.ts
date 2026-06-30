import { randomBytes, timingSafeEqual, createHmac, pbkdf2Sync } from "crypto";

// Pure crypto helpers — no database imports here. This file must stay
// Edge Runtime-compatible because it's imported by middleware.ts, which
// runs on the Edge Runtime where Node-only packages like `pg` don't work.

const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_KEYLEN = 64;
const PBKDF2_DIGEST = "sha512";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = pbkdf2(password, salt);
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, originalHash] = stored.split(":");
  if (!salt || !originalHash) return false;
  const derivedKey = pbkdf2(password, salt);
  const a = Buffer.from(derivedKey, "hex");
  const b = Buffer.from(originalHash, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function pbkdf2(password: string, salt: string): string {
  return pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST).toString("hex");
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

export type SessionPayload = {
  adminId: number;
  email: string;
  name: string;
  expiresAt: number;
};

export function createSessionToken(payload: Omit<SessionPayload, "expiresAt">): string {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Add a long random string to your environment variables."
    );
  }
  const full: SessionPayload = { ...payload, expiresAt: Date.now() + SESSION_TTL_MS };
  const body = Buffer.from(JSON.stringify(full)).toString("base64url");
  const signature = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  const secret = getSessionSecret();
  if (!secret || !token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  try {
    const expectedSignature = createHmac("sha256", secret).update(body).digest("base64url");
    const a = Buffer.from(signature);
    const b = Buffer.from(expectedSignature);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const payload: SessionPayload = JSON.parse(Buffer.from(body, "base64url").toString("utf-8"));
    if (payload.expiresAt < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export const ADMIN_SESSION_COOKIE = "biogreen_admin_session";
