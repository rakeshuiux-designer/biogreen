import { NextRequest, NextResponse } from "next/server";
import { saveOrder, generateId, Order, OrderLine } from "@/lib/store";
import { getProductBySlug } from "@/data/products";
import { notifyNewOrder } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, lines, notes } = body as {
      customer: Order["customer"];
      lines: { productSlug: string; variantId: string; quantity: number }[];
      notes?: string;
    };

    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { error: "Missing required customer details." },
        { status: 400 }
      );
    }

    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    // Re-derive prices server-side from the product catalog rather than
    // trusting client-submitted totals.
    const resolvedLines: OrderLine[] = [];
    for (const line of lines) {
      const product = getProductBySlug(line.productSlug);
      const variant = product?.variants.find((v) => v.id === line.variantId);
      if (!product || !variant) {
        return NextResponse.json(
          { error: `Invalid product or variant: ${line.productSlug}` },
          { status: 400 }
        );
      }
      resolvedLines.push({
        productSlug: product.slug,
        productName: product.name,
        variantId: variant.id,
        variantLabel: variant.label,
        quantity: line.quantity,
        unitPrice: variant.price,
        lineTotal: variant.price * line.quantity,
      });
    }

    const subtotal = resolvedLines.reduce((sum, l) => sum + l.lineTotal, 0);

    const order: Order = {
      id: generateId("BG-ORD"),
      createdAt: new Date().toISOString(),
      customer,
      lines: resolvedLines,
      subtotal,
      notes,
      status: "pending_confirmation",
    };

    await saveOrder(order);

    // Fire-and-forget: don't let a slow/failed email delay or break the
    // customer's order confirmation.
    notifyNewOrder(order).catch((err) =>
      console.error("Failed to send new-order notification:", err)
    );

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error("Order creation failed:", err);
    return NextResponse.json(
      { error: "Something went wrong placing your order. Please try again." },
      { status: 500 }
    );
  }
}
