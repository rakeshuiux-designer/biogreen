import { NextRequest, NextResponse } from "next/server";
import { findAdminByEmail, verifyPassword, createSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const admin = await findAdminByEmail(email);

    // Constant-shape response whether the email exists or not, to avoid
    // leaking which admin emails are registered.
    if (!admin || !verifyPassword(password, admin.passwordHash)) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = createSessionToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
    });

    const res = NextResponse.json({ ok: true, admin: { email: admin.email, name: admin.name } });
    res.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days, matches session TTL in auth.ts
    });
    return res;
  } catch (err) {
    console.error("Admin login failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
