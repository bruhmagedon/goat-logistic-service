'use client';

import * as React from 'react';
import { Cell, Pie, PieChart, Sector } from 'recharts';

import { cn } from '@/shared/lib/css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { ChartConfig, ChartContainer } from '@/shared/ui/kit/chart';
import { useUserProfileStore } from '../model/user-profile.store';

// Тип для активного сектора
interface ActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: {
    category: string;
    volume: number;
  };
}

export function PurchaseCategoryChart() {
  const { purchaseCategories } = useUserProfileStore();

  // Создаем конфиг для цветов, как и раньше
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    purchaseCategories.forEach((category) => {
      config[category.category] = { label: category.category, color: category.fill };
    });
    return config;
  }, [purchaseCategories]);

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const activeData = activeIndex !== null ? purchaseCategories[activeIndex] : null;

  // Компонент для рендеринга активного (наведенного) сектора
  const renderActiveShape = (props: ActiveShapeProps) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5} // Делаем активный сектор чуть больше
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Структура закупок по категориям</CardTitle>
        <CardDescription>Доля категорий в общей сумме закупок.</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {/* ИЗМЕНЕНИЕ 2: Обертка для позиционирования и обработчик выхода мыши */}
        <div
          className="relative mx-auto aspect-square max-h-[300px]"
          onMouseLeave={() => setActiveIndex(null)} // Сбрасываем активный индекс при уходе курсора
        >
          <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart>
              <Pie
                activeIndex={activeIndex ?? undefined}
                activeShape={renderActiveShape}
                data={purchaseCategories}
                dataKey="volume"
                nameKey="category"
                innerRadius={80}
                outerRadius={110}
                strokeWidth={5}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {/* Используем Cell для правильной отрисовки с отступами */}
                {purchaseCategories.map((entry) => (
                  <Cell
                    key={`cell-${entry.category}`}
                    fill={entry.fill}
                    stroke="hsl(var(--card))" // Белый отступ между сегментами
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* ИЗМЕНЕНИЕ 3: Тултип показывается только при активном секторе */}
          <div
            className={cn(
              '-translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 transform transition-opacity duration-200',
              activeData ? 'opacity-100' : 'opacity-0',
            )}
          >
            {activeData && (
              <div className="flex items-center gap-2 rounded-lg bg-background p-2 px-3 shadow-md">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: activeData.fill }} />
                <span className="font-medium text-sm">{activeData.category}</span>
                <span className="font-bold text-sm">
                  {new Intl.NumberFormat('ru-RU').format(activeData.volume)}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
