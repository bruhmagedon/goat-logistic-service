import * as React from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/shared/ui/kit/chart";
import { useUserProfileStore } from "../model/user-profile.store";

export function PurchaseCategoryChart() {
  const { purchaseCategories } = useUserProfileStore();

  const chartConfig = purchaseCategories.reduce((acc, category) => {
    acc[category.category] = { label: category.category, color: category.fill };
    return acc;
  }, {} as import("@/shared/ui/kit/chart").ChartConfig);

  const totalVolume = React.useMemo(() => {
    return purchaseCategories.reduce((acc, curr) => acc + curr.volume, 0);
  }, [purchaseCategories]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Структура закупок по категориям</CardTitle>
        <CardDescription>Доля категорий в общей сумме закупок</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    nameKey="category"
                    indicator="dashed"
                    formatter={(value, name, entry) =>
                      `${entry.payload.category}: ${new Intl.NumberFormat(
                        "ru-RU"
                      ).format(value as number)} ₽`
                    }
                  />
                }
              />
              <Pie
                data={purchaseCategories}
                dataKey="volume"
                nameKey="category"
                innerRadius={60} // Делаем "бублик"
                strokeWidth={5}
              >
                {purchaseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend content={<ChartLegendContent nameKey="category" />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
