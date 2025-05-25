"use server";

import db from "@/lib/db";
import { OrderReceiptEmailHTML } from "@/components/email-template/automated-receipt";
import nodemailer from "nodemailer";

export const createOrder = async ({
  userId,
  name,
  orderNumber,
  totalAmount,
  message,
  paymentOption,
  proofOfPayment,
  items,
}: {
  userId: string;
  name: string;
  orderNumber: string;
  totalAmount: number;
  message?: string;
  paymentOption: string;
  proofOfPayment: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
  }[];
}) => {
  try {
    const user = await db.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const order = await db.orders.create({
      data: {
        userId,
        name,
        orderNumber,
        totalAmount,
        message,
        paymentOption,
        proofOfPayment,
        orderItems: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            subTotal: item.quantity * item.price,
          })),
        },
      },
    });

    const email = user.email || "";

    await sendReceiptEmail(
      orderNumber,
      name,
      email,
      totalAmount,
      message,
      paymentOption,
      proofOfPayment,
      items.map((item) => ({
        ...item,
      }))
    );

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Something went wrong. Please try again" };
  }
};

export const sendReceiptEmail = async (
  orderNumber: string,
  name: string,
  email: string,
  totalAmount: number,
  message: string | undefined,
  paymentOption: string,
  proofOfPayment: string,
  items: {
    id: string;
    quantity: number;
    price: number;
    name?: string;
    image?: string;
  }[]
) => {
  const htmlContent = await OrderReceiptEmailHTML({
    orderNumber,
    name,
    totalAmount,
    message,
    paymentOption,
    proofOfPayment,
    items,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kylemastercoder14@gmail.com",
      pass: "dakolbdppgtdmikl",
    },
  });

  const messageData = {
    from: "marianshomemadebake@gmail.com",
    to: email,
    subject: `Marian's Homemade Bake - Order #${orderNumber} Confirmation`,
    text: `Dear ${name},\n\nThank you for your order (#${orderNumber}) at Marian's Homemade Bake! Your order is being processed and we'll notify you once it's ready.\n\nTotal Amount: ₱${totalAmount.toFixed(
      2
    )}\nPayment Method: ${paymentOption}\n\nWe appreciate your business!\n\n- Marian's Homemade Bake Team`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(messageData);
    return { success: "Email has been sent." };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
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
        cancellationReason: reason,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to cancel order" };
  }
};

export const completeOrder = async (orderId: string) => {
  try {
    await db.orders.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: "Completed",
      },
    });

    return { success: "Order marked as completed" };
  } catch (error) {
    console.error("Error completing order:", error);
    return { error: "Failed to complete order" };
  }
};
