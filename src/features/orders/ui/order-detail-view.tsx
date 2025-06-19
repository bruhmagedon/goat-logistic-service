// src/features/orders/ui/order-detail-view.tsx

import { Order, OrderStatus } from '@/features/orders/model/types';
import { cn } from '@/shared/lib/css';
import { Badge } from '@/shared/ui/kit/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/kit/table';
import { CircleCheck, CircleX, Package, Truck } from 'lucide-react';

interface OrderDetailViewProps {
  order: Order | null;
}

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
const statusConfig: Record<OrderStatus, { label: string; icon: React.ElementType; className: string }> = {
  delivered: {
    label: 'Доставлен',
    icon: CircleCheck,
    className: 'bg-blue-100 text-black border-blue-300',
  },
  'in-transit': {
    label: 'В пути',
    icon: Truck,
    className: 'bg-yellow-100 text-black  border-yellow-300',
  },
  processing: {
    label: 'Собирается',
    icon: Package,
    className: 'bg-green-100 text-black border-green-300 ',
  },
  cancelled: {
    label: 'Отменен',
    icon: CircleX,
    className: 'bg-red-100 text-black border-red-300',
  },
};

export function OrderDetailView({ order }: OrderDetailViewProps) {
  if (!order) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-gray-500">Выберите заказ для просмотра деталей.</p>
      </div>
    );
  }

  const config = statusConfig[order.status];
  const formattedTotalPrice = new Intl.NumberFormat('ru-RU').format(order.totalPrice);

  return (
    <div className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-start justify-between border-gray-200 border-b pb-4">
        <div>
          <h2 className="font-semibold text-neutral-900 text-xl leading-tight">Заказ №{order.id}</h2>
          <div className="mt-2 space-y-1 text-gray-600 text-sm">
            <p>
              Дата: <span className="text-gray-800">{order.date}</span>
            </p>
            <p>
              Адрес доставки: <span className="text-gray-800">г. Москва, ул. Примерная, д. 10, кв. 5</span>
            </p>
          </div>
        </div>
        <Badge variant="outline" className={cn('px-2 py-1.5 font-semibold text-sm', config.className)}>
          <config.icon className="size-5!" />
          {config.label}
        </Badge>
      </div>

      {/* CONTENT */}
      <div className="flex flex-grow flex-col overflow-hidden">
        <h3 className="mb-3 font-semibold text-base text-gray-800">Содержимое заказа:</h3>
        <div className="-mx-6 flex-grow overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="h-[48px] text-muted-foreground">
                <TableHead className="w-[45%] pl-6">Товар</TableHead>
                <TableHead>Цвет</TableHead>
                <TableHead>Размер</TableHead>
                <TableHead className="text-center">Кол-во</TableHead>
                <TableHead className="pr-6 text-right">Цена</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <TableRow key={index} className="h-[73px] hover:bg-gray-50/50">
                  <TableCell className="pl-6 font-medium text-gray-800">{item.name}</TableCell>
                  <TableCell className="text-gray-600">{item.color}</TableCell>
                  <TableCell className="text-gray-600">{item.size}</TableCell>
                  <TableCell className="text-center text-gray-600">{item.quantity}</TableCell>
                  <TableCell className="pr-6 text-right font-medium text-gray-800">
                    {new Intl.NumberFormat('ru-RU').format(item.price)} ₽
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-auto border-gray-200 border-t pt-6">
        <div className="mb-1 flex items-center justify-end text-gray-600 text-sm">
          <span className="mr-2">Общий вес:</span>
          <span className="font-semibold text-gray-800">{order.totalWeight} кг</span>
        </div>
        <div className="flex items-center justify-end text-lg">
          <span className="mr-2 font-semibold text-gray-700">Итоговая стоимость:</span>
          <span className="font-bold text-purple-600">{formattedTotalPrice} ₽</span>
        </div>
      </div>
    </div>
  );
}
