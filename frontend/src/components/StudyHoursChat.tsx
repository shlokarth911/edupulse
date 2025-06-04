"use client";

import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
} from "recharts";

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

const chartData = [
  { month: "Sun", hours: 1 },
  { month: "Mon", hours: 3.5 },
  { month: "Tue", hours: 4.2 },
  { month: "Thu", hours: 5 },
  { month: "Fri", hours: 6.5 },
  { month: "Sat", hours: 2.5 },
];

const chartConfig = {
  visitors: { label: "Study Hours", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function StudyHoursChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Study Hours</CardTitle>
        <CardDescription>This Week</CardDescription>
      </CardHeader>

      <CardContent className="h-52 ">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tickFormatter={(v) => v.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="hours"
                type="natural"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ fill: "#fff" }}
                activeDot={{ r: 8 }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          You were approximately 7% more productive than last week
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground">
          Showing your progress over the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
