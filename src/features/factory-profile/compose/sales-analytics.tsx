import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/kit/table';
import { useSupplierProfileStore } from '../model/supplier-profile.store';
import { SalesDynamicsChart } from './sales-dynamics-chart';
import { Separator } from '@/shared/ui/kit/separator';

export function SalesAnalytics() {
  const { reports } = useSupplierProfileStore();

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency === '₽' ? 'RUB' : 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="flex-1 rounded-none border-0">
      <CardHeader>
        <CardTitle className="text-xl">Аналитика продаж</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-8">
        <SalesDynamicsChart />

        <div>
          <h2 className="font-medium text-2xl">Отчёт по продажам товаров</h2>
          <div className="mt-4 space-y-8">
            {reports.map((report) => (
              <div key={report.date}>
                <p className="font-medium">{report.date}</p>
                <p className="text-muted-foreground text-sm">
                  Прибыль за день: {formatCurrency(report.totalProfit, report.currency)}
                </p>

                {/* 1. Заменяем Card на обычный div с нужными стилями рамки */}
                <div className="mt-4 overflow-hidden rounded-lg border">
                  <Table className="p-5">
                    <TableHeader>
                      {/* Убираем верхнюю границу у ряда, т.к. она теперь на div'е */}
                      <TableRow className="border-t-0">
                        <TableHead className="w-[40%]">Название товара</TableHead>
                        <TableHead>Цвет</TableHead>
                        <TableHead>Размер</TableHead>
                        <TableHead className="text-right">Количество</TableHead>
                        <TableHead className="text-right">Прибыль</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report.items.map((item) => (
                        // 2. Убираем границы между строками для чистого вида
                        <TableRow key={item.id} className="border-b-0">
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.color}</TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatCurrency(item.profit, report.currency)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
