import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/shared/ui/kit/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useUserProfileStore } from "../model/user-profile.store";

const chartConfig = {
  volume: {
    label: "Объем закупок",
    color: "hsl(var(--chart-1))",
  },
} satisfies import("@/shared/ui/kit/chart").ChartConfig;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-1 gap-1.5">
          <span className="text-muted-foreground text-sm">{label}</span>
          <div className="flex items-center">
            <span className="text-foreground">
              {"Объем закупок"}:{" "}
              <span className="font-medium">
                {new Intl.NumberFormat("ru-RU").format(payload[0].value)} ₽
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function PurchaseDynamicsChart() {
  const { purchaseDynamics } = useUserProfileStore();
  const strokeColor = "#8b5cf6"; // Фиолетовый цвет для линии
  const fillColor = "#ede9fe"; // Светло-фиолетовый для заливки

  return (
    <Card>
      <CardHeader>
        <CardTitle>Динамика объема закупок</CardTitle>
        <CardDescription>
          Сумма ваших закупок за выбранный период
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={purchaseDynamics}
              margin={{
                top: 5,
                right: 10,
                left: -20, // Сдвигаем немного влево, чтобы YAxis был виден
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value + "-01"); // Добавляем день для корректного парсинга
                  return date.toLocaleDateString("ru-RU", {
                    month: "short",
                    year: "2-digit",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="volume"
                type="monotone"
                strokeWidth={2}
                stroke={strokeColor}
                fill={fillColor}
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
