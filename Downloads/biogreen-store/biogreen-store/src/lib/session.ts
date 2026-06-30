import { cookies } from "next/headers";
import { verifySessionToken, ADMIN_SESSION_COOKIE, SessionPayload } from "@/lib/session-token";

export function getAdminSession(): SessionPayload | null {
  try {
    const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}
