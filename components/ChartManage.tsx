"use client";

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
import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { processOrdersByMonth } from "@/helper";

export const description = "An interactive bar chart";

const chartConfig = {
  count: {
    label: "Order Count",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartManage() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("count");
  const orders = useQuery(api.order.getOrdersInspiration) as any;
  const processedOrders = useMemo(() => processOrdersByMonth(orders), [orders]);

  const total = useMemo(
    () => ({
      count: processedOrders?.reduce((sum, item) => sum + item?.count, 0),
      revenue: processedOrders?.reduce((sum, item) => sum + item?.revenue, 0),
    }),
    [processedOrders]
  );
  console.log(orders);

  return (
    <Card className="bg-inherit border border-white/20">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-white/15 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-white">
            Orders Template Chart - Interactive
          </CardTitle>
          <CardDescription className="text-gray9">
            Showing total orders for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["count", "revenue"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-[#18181a] sm:border-l sm:border-l-white/15 sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-gray9">
                  {chartConfig[chart]?.label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl text-white">
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={processedOrders}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
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
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
