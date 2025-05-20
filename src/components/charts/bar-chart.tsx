
"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartProps {
  data: {
    date: string;
    profit: number;
    refund: number;
  }[];
}

const chartConfig = {
  views: {
    label: "Sales",
  },
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-1))", // Green color for profit
  },
  refund: {
    label: "Refund",
    color: "hsl(var(--chart-2))", // Red color for refund
  },
} satisfies ChartConfig;

export function BarChartComponent({ data }: BarChartProps) {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("profit");

  const total = React.useMemo(
    () => ({
      profit: data.reduce((acc, curr) => acc + curr.profit, 0),
      refund: data.reduce((acc, curr) => acc + curr.refund, 0),
    }),
    [data]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>
            Showing profit and refunds over time
          </CardDescription>
        </div>
        <div className="flex">
          {(Object.keys(total) as Array<keyof typeof total>).map((chart) => (
            <button
              key={chart}
              data-active={activeChart === chart}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(chart)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[chart].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                ₱{total[chart].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
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
            <Bar
              dataKey={activeChart}
              fill={activeChart === "profit" ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
