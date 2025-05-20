/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";
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

interface PieChartProps {
  filteredOrders: any[];
}

const PRODUCT_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
];

export function PieChartComponent({ filteredOrders }: PieChartProps) {
  const productSalesData = React.useMemo(() => {
    const productCounts: Record<string, number> = {};

    // Process each order's orderItems
    filteredOrders.forEach((order) => {
      if (order.orderItems && Array.isArray(order.orderItems)) {
        order.orderItems.forEach((item: any) => {
          if (item.product) {
            const productName = item.product.name || "Unknown Product";
            productCounts[productName] =
              (productCounts[productName] || 0) + (item.quantity || 1);
          }
        });
      }
    });

    // Convert to array and sort by quantity descending
    const sortedProducts = Object.entries(productCounts)
      .map(([name, count]) => ({
        product: name,
        sales: count,
      }))
      .sort((a, b) => b.sales - a.sales);

    // Take top products (minimum 1, maximum 5)
    const topCount = Math.min(5, Math.max(1, sortedProducts.length));
    const topProducts = sortedProducts.slice(0, topCount);
    const othersSales = sortedProducts
      .slice(topCount)
      .reduce((sum, product) => sum + product.sales, 0);

    const chartData = topProducts.map((product, index) => ({
      product: product.product,
      sales: product.sales,
      fill: PRODUCT_COLORS[index % PRODUCT_COLORS.length],
    }));

    if (othersSales > 0) {
      chartData.push({
        product: "Others",
        sales: othersSales,
        fill: PRODUCT_COLORS[PRODUCT_COLORS.length - 1],
      });
    }

    return chartData;
  }, [filteredOrders]);

  const totalSales = React.useMemo(() => {
    return productSalesData.reduce((acc, curr) => acc + curr.sales, 0);
  }, [productSalesData]);

  const chartConfig = React.useMemo(() => {
    const config: any = {
      sales: {
        label: "Sales",
      },
    };

    productSalesData.forEach((item) => {
      config[item.product] = {
        label: item.product,
        color: item.fill,
      };
    });

    return config as ChartConfig;
  }, [productSalesData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Best Selling Products</CardTitle>
        <CardDescription>
          Showing product distribution by sales volume
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {productSalesData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[545px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={productSalesData}
                dataKey="sales"
                nameKey="product"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalSales.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Sales
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No product data available</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing top {productSalesData.length} products
        </div>
        <div className="leading-none text-muted-foreground">
          Based on orders from selected date range
        </div>
      </CardFooter>
    </Card>
  );
}
