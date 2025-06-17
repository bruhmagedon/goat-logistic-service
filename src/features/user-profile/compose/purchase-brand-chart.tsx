// file: src/widgets/analytics/PurchaseBrandChart.tsx

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import { ChartContainer, ChartTooltipContent } from "@/shared/ui/kit/chart";
import { useUserProfileStore } from "@/features/user-profile/model/user-profile.store";

const chartConfig = { volume: { label: "Объем", color: "#8b5cf6" } };

export function PurchaseBrandChart() {
  const { purchaseBrands } = useUserProfileStore();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Закупки по брендам</CardTitle>
        <CardDescription>Распределение по основным брендам</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={purchaseBrands}
              layout="vertical"
              margin={{ left: 10 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis type="number" hide />
              <YAxis
                dataKey="brand"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                width={60}
              />
              <ChartTooltipContent
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    hideLabel
                    formatter={(value) =>
                      `${new Intl.NumberFormat("ru-RU").format(
                        value as number
                      )} ₽`
                    }
                  />
                }
              />
              <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
