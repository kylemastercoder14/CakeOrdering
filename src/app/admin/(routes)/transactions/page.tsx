import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import { OrderColumn, RefundColumn } from "./_components/column";
import OrderClient from "./_components/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RefundClient from './_components/client2';

const Page = async () => {
  const orders = await db.orders.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: true,
    },
  });

  const refunds = await db.refund.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      order: true,
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

  const formattedDataRefund: RefundColumn[] =
    refunds.map((item) => ({
      id: item.id,
      name: item.order.name,
      refundStatus: item.status,
      orderNumber: item.order.orderNumber,
      totalAmount: `₱${item.order.totalAmount.toFixed(2)}`,
      reason: item.reason,
    })) || [];
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
        <Heading
          title="Manage Transactions"
          description="This page show all the transactions in your store. You can view all transactions."
        />
      </div>
      <div className="mt-5">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="refund">Refund</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <OrderClient data={formattedDataOrder} />
          </TabsContent>
          <TabsContent value="refund">
            <RefundClient data={formattedDataRefund} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
