import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/shared/ui/kit/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

// 1. Моковые данные, повторяющие кривую на макете
const chartData = [
  { month: '2024-01', sales: 150000 },
  { month: '2024-02', sales: 250000 },
  { month: '2024-03', sales: 195000 },
  { month: '2024-04', sales: 65000 },
  { month: '2024-05', sales: 180000 },
  { month: '2024-06', sales: 190000 },
];

// 2. Конфигурация для нашей диаграммы
const chartConfig = {
  sales: {
    label: 'Объем продаж',
    color: 'hsl(var(--chart-2))', // Используем нашу CSS-переменную
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-1 gap-1.5">
          <span className="text-muted-foreground text-sm">{label}</span>
          <div className="flex items-center">
            <span className="text-foreground">
              {'Объем продаж'}:{' '}
              <span className="font-medium">{new Intl.NumberFormat('ru-RU').format(payload[0].value)}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function SalesDynamicsChart() {
  const strokeColor = '#8b5cf6';
  const fillColor = '#e7e1ff';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Динамика продаж</CardTitle>
        <CardDescription>Сумма ваших продаж за выбранный период</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => (typeof value === 'number' && value > 0 ? `${value / 1000}k` : '0k')}
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fillColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={fillColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="sales"
              type="natural"
              fill={fillColor}
              fillOpacity={0.5}
              stroke={strokeColor}
              strokeWidth={2}
              stackId="a"
              activeDot={{
                r: 6,
                fill: strokeColor,
                stroke: 'var(--background)',
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
