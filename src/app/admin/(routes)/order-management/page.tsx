import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import { OrderColumn } from "./_components/column";
import OrderClient from "./_components/client";

const Page = async () => {
  const orders = await db.orders.findMany({
    where: {
      deliveryStatus: "For Pickup",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: true,
    },
  });

  const formattedDataOrder: OrderColumn[] =
    orders.map((item) => ({
      id: item.id,
      name: item.name,
      orderStatus: item.orderStatus,
      orderNumber: item.orderNumber,
      deliveryStatus: item.deliveryStatus,
      totalAmount: `₱${item.totalAmount.toFixed(2)}`,
      address: item.address || "",
    })) || [];
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
        <Heading
          title="Manage Orders"
          description="This page show all the orders that are for pickup."
        />
      </div>
      <div className="mt-5">
        <OrderClient data={formattedDataOrder} />
      </div>
    </div>
  );
};

export default Page;
