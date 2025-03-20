"use server";

import db from "@/lib/db";

export const createOrder = async ({
  userId,
  name,
  address,
  orderNumber,
  totalAmount,
  message,
  shippingOption,
  shippingFee,
  items,
}: {
  userId: string;
  name: string;
  address: string;
  orderNumber: string;
  totalAmount: number;
  message?: string;
  shippingOption: string;
  shippingFee: number;
  items: { id: string; quantity: number; price: number }[];
}) => {
  try {
    const order = await db.orders.create({
      data: {
        userId,
        name,
        address,
        orderNumber,
        totalAmount,
        message,
        shippingOption,
        shippingFee,
        orderItems: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            subTotal: item.quantity * item.price,
          })),
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Something went wrong. Please try again" };
  }
};
