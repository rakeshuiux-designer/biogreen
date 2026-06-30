import { NextRequest, NextResponse } from "next/server";
import { saveWholesaleInquiry, generateId, WholesaleInquiry } from "@/lib/store";
import { notifyNewWholesaleInquiry } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      contactName,
      businessName,
      email,
      phone,
      city,
      productsInterested,
      estimatedQuantity,
      message,
    } = body as Omit<WholesaleInquiry, "id" | "createdAt" | "status">;

    if (!contactName || !email || !phone || !businessName) {
      return NextResponse.json(
        { error: "Please fill in your name, business name, email and phone." },
        { status: 400 }
      );
    }

    const inquiry: WholesaleInquiry = {
      id: generateId("BG-WHL"),
      createdAt: new Date().toISOString(),
      contactName,
      businessName,
      email,
      phone,
      city,
      productsInterested,
      estimatedQuantity,
      message,
      status: "new",
    };

    await saveWholesaleInquiry(inquiry);

    notifyNewWholesaleInquiry(inquiry).catch((err) =>
      console.error("Failed to send new-inquiry notification:", err)
    );

    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (err) {
    console.error("Wholesale inquiry failed:", err);
    return NextResponse.json(
      { error: "Something went wrong submitting your inquiry. Please try again." },
      { status: 500 }
    );
  }
}
