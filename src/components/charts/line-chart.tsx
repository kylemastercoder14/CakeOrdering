/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from 'react';

interface LineChartProps {
  filteredOrders: any[];
}

export function LineChartComponent({ filteredOrders }: LineChartProps) {
  // Process orders to get daily order count and product quantity
  const chartData = React.useMemo(() => {
    const dailyData: Record<
      string,
      {
        date: string;
        orders: number;
        products: number;
        revenue: number;
      }
    > = {};

    filteredOrders.forEach((order) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          orders: 0,
          products: 0,
          revenue: 0,
        };
      }

      dailyData[date].orders += 1;
      dailyData[date].revenue += order.totalAmount;

      // Count products in order
      if (order.orderItems && Array.isArray(order.orderItems)) {
        order.orderItems.forEach((item: any) => {
          dailyData[date].products += item.quantity || 1;
        });
      }
    });

    return Object.values(dailyData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [filteredOrders]);

  const chartConfig = {
    orders: {
      label: "Orders",
      color: "hsl(var(--chart-1))",
    },
    products: {
      label: "Products Sold",
      color: "hsl(var(--chart-2))",
    },
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  // Calculate percentage change
  const calculateTrend = () => {
    if (chartData.length < 2) return 0;
    const last = chartData[chartData.length - 1].orders;
    const prev = chartData[chartData.length - 2].orders;
    return ((last - prev) / prev) * 100;
  };

  const trendPercentage = calculateTrend().toFixed(1);
  const isTrendingUp = parseFloat(trendPercentage) >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Trends</CardTitle>
        <CardDescription>
          Showing daily order and product trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis tickLine={false} axisLine={false} width={40} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  nameKey="date"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="orders"
              type="monotone"
              stroke="var(--color-orders)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="products"
              type="monotone"
              stroke="var(--color-products)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {isTrendingUp ? "Trending up" : "Trending down"} by{" "}
          {Math.abs(parseFloat(trendPercentage))}%{" "}
          {isTrendingUp ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingUp className="h-4 w-4 transform rotate-180 text-red-500" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing trends for selected date range
        </div>
      </CardFooter>
    </Card>
  );
}
