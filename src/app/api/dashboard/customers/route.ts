import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  try {
    // Get customer statistics
    const customers = await db.users.findMany({
      include: {
        Orders: {
          where: {
            createdAt: {
              gte: from ? new Date(from) : undefined,
              lte: to ? new Date(to) : undefined,
            },
          },
        },
      },
    });

    // Transform the data for the dashboard
    const customerStats = customers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      orders: user.Orders.length,
      gender: user.gender,
      address: user.address,
    }));

    return NextResponse.json(customerStats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch customer statistics" },
      { status: 500 }
    );
  }
}
