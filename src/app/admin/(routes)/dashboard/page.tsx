"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/components/global/heading";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { PieChartComponent } from "@/components/charts/pie-chart";
import { LineChartComponent } from "@/components/charts/line-chart";
import { Orders } from "@prisma/client";
import { getAllOrders } from "@/actions/order";

const Page = () => {
  const [dateRange, setDateRange] = useState<string>("Last 7 days");
  const [orders, setOrders] = useState<Orders[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Orders[]>([]);

  const fetchOrders = async () => {
    const res = await getAllOrders();
    if (res.error) {
      console.error(res.error);
    } else {
      setOrders(res.data ?? []);
      filterOrdersByDateRange(res.data ?? [], dateRange);
    }
  };

  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterOrdersByDateRange(orders, dateRange);
  }, [dateRange, orders]);

  const filterOrdersByDateRange = (orders: Orders[], range: string) => {
    const now = new Date();
    const startDate = new Date();

    switch (range) {
      case "Last 7 days":
        startDate.setDate(now.getDate() - 7);
        break;
      case "Last 15 days":
        startDate.setDate(now.getDate() - 15);
        break;
      case "Last 30 days":
        startDate.setDate(now.getDate() - 30);
        break;
      case "Last 60 days":
        startDate.setDate(now.getDate() - 60);
        break;
      case "Last 90 days":
        startDate.setDate(now.getDate() - 90);
        break;
      case "Last 180 days":
        startDate.setDate(now.getDate() - 180);
        break;
      case "Last 365 days":
        startDate.setDate(now.getDate() - 365);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= now;
    });

    setFilteredOrders(filtered);
  };

  const processChartData = () => {
    const groupedData = filteredOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0];

      if (!acc[date]) {
        acc[date] = { date, profit: 0, refund: 0 };
      }

      if (order.orderStatus === "Refunded") {
        acc[date].refund += order.totalAmount;
      } else if (order.orderStatus === "Completed") {
        acc[date].profit += order.totalAmount;
      }

      return acc;
    }, {} as Record<string, { date: string; profit: number; refund: number }>);

    return Object.values(groupedData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const chartData = processChartData();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex w-full justify-between items-center">
        <Heading
          title="Analytics Report"
          description={`Last Updated: ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}`}
        />
        <div className="flex items-center gap-3">
          <div className="gap-y-2 flex flex-col">
            <Label>Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                <SelectItem value="Last 15 days">Last 15 days</SelectItem>
                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                <SelectItem value="Last 60 days">Last 60 days</SelectItem>
                <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                <SelectItem value="Last 180 days">Last 180 days</SelectItem>
                <SelectItem value="Last 365 days">Last 365 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="default"
            onClick={() => {
              setDateRange("Last 30 days");
              filterOrdersByDateRange(orders, "Last 30 days");
            }}
            className="mt-4"
          >
            Reset Filter
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <BarChartComponent data={chartData} />
      </div>
      <div className="mt-5 grid lg:grid-cols-10 grid-cols-1 gap-4">
        <div className="lg:col-span-4">
          <PieChartComponent filteredOrders={filteredOrders} />
        </div>
        <div className="lg:col-span-6">
          <LineChartComponent filteredOrders={filteredOrders} />
        </div>
      </div>
    </div>
  );
};

export default Page;
