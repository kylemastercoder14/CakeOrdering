/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import db from "@/lib/db";
import { useUser } from "../hooks/use-user";

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

export const deleteOrder = async (orderId: string) => {
  try {
    // Delete order items first to prevent foreign key constraint errors
    await db.orderItems.deleteMany({
      where: {
        orderId,
      },
    });

    // Delete the order after removing related items
    await db.orders.delete({
      where: {
        id: orderId,
      },
    });

    return { success: "Order deleted successfully" };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { error: "Failed to delete order" };
  }
};

export const rejectOrder = async (orderId: string) => {
  try {
    await db.orders.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: "Rejected",
      },
    });

    return { success: "Order rejected successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to reject order" };
  }
};

export const approveOrder = async (orderId: string) => {
  try {
    await db.orders.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: "Approved",
      },
    });

    return { success: "Order approved successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to approve order" };
  }
};

export const pickUpOrder = async (orderId: string) => {
  try {
    await db.orders.update({
      where: {
        id: orderId,
      },
      data: {
        deliveryStatus: "For Pickup",
      },
    });

    return { success: "Order updated for pickup successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update for pickup" };
  }
};

export const deliverOrder = async (orderId: string) => {
  const { staff } = await useUser();
  try {
    const staffName = staff?.firstName + " " + staff?.lastName;
    await db.orders.update({
      where: {
        id: orderId,
      },
      data: {
        deliveryStatus: "Out for Delivery",
        riderName: staffName,
      },
    });

    return { success: "Order delivered successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to deliver order" };
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const order = await db.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return { success: "Order fetched successfully", data: order };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { error: "Failed to fetch order" };
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await db.orders.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: "Orders fetched successfully", data: orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { error: "Failed to fetch orders" };
  }
};

export const cancelOrder = async (orderId: string, reason: string) => {
  try {
    await db.orders.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: "Cancelled",
        deliveryStatus: "Cancelled",
        paymentStatus: "Cancelled",
        cancellationReason: reason,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to cancel order" };
  }
};
