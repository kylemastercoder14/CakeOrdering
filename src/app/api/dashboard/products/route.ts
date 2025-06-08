import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  try {
    // Get product statistics
    const products = await db.products.findMany({
      include: {
        OrderItems: {
          where: {
            createdAt: {
              gte: from ? new Date(from) : undefined,
              lte: to ? new Date(to) : undefined,
            },
          },
          include: {
            order: true,
          },
        },
      },
    });

    // Transform the data for the dashboard
    const productStats = products.map((product) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const salesToday = product.OrderItems.filter(
        (item) => new Date(item.createdAt) >= today
      ).reduce((sum, item) => sum + item.subTotal, 0);

      const totalOrders = new Set(
        product.OrderItems.map((item) => item.orderId)
      ).size;

      const soldItems = product.OrderItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      const totalSales = product.OrderItems.reduce(
        (sum, item) => sum + item.subTotal,
        0
      );

      // Note: You'll need to implement refund logic based on your schema
      const totalRefunds = 0; // Placeholder - implement based on your Refund model

      return {
        id: product.id,
        name: product.name,
        salesToday,
        totalOrders,
        soldItems,
        totalRefunds,
        totalSales,
      };
    });

    return NextResponse.json(productStats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch product statistics" },
      { status: 500 }
    );
  }
}
