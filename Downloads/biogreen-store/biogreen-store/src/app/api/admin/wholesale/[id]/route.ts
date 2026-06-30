import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { updateWholesaleStatus, WholesaleStatus } from "@/lib/store";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const status = formData.get("status") as WholesaleStatus;
    const validStatuses: WholesaleStatus[] = ["new", "contacted", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    await updateWholesaleStatus(params.id, status);
    return NextResponse.redirect(new URL("/admin/wholesale", req.url));
  } catch (err) {
    console.error("Failed to update wholesale status:", err);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}
