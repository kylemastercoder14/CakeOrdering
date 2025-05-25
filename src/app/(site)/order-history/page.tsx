import React from "react";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import OrderHistoryPage from "./client";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  // Get current user session
  const { userId } = await auth();

  // Redirect if not logged in
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.users.findFirst({
    where: {
      clerkId: userId,
    },
  });

  // Fetch all orders for the current user with related data
  const orders = await db.orders.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Convert Date fields to ISO strings for serialization
  const serializedOrders = orders.map((order) => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    cancelledAt: order.cancelledAt
      ? order.cancelledAt.toISOString()
      : undefined,
    message: order.message === null ? undefined : order.message,
    proofOfPayment:
      order.proofOfPayment === null ? undefined : order.proofOfPayment,
    cancellationReason:
      order.cancellationReason === null ? undefined : order.cancellationReason,
    orderItems: order.orderItems.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })),
  }));

  return <OrderHistoryPage orders={serializedOrders} />;
};

export default Page;
