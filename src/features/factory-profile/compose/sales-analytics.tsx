import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Separator } from '@/shared/ui/kit/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/kit/table';
import { useSupplierProfileStore } from '../model/supplier-profile.store';

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
        <h2 className="font-medium text-2xl">Отчёт по продажам товаров</h2>
        {reports.map((report) => (
          <div key={report.date}>
            <p className="font-medium">{report.date}</p>
            <p className="text-muted-foreground text-sm">
              Прибыль за день: {formatCurrency(report.totalProfit, report.currency)}
            </p>
            <Card className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Название товара</TableHead>
                    <TableHead>Цвет</TableHead>
                    <TableHead>Размер</TableHead>
                    <TableHead className="text-right">Количество</TableHead>
                    <TableHead className="text-right">Прибыль</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.items.map((item) => (
                    <TableRow key={item.id}>
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
            </Card>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
