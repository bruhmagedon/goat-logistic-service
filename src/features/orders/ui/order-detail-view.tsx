// src/features/orders/ui/order-detail-view.tsx

import { Badge } from "@/shared/ui/kit/badge";
import { Order, OrderStatus } from "@/features/orders/model/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import { Truck, PackageCheck, PackageX, ShoppingCart } from "lucide-react";
import { cn } from "@/shared/lib/css";

interface OrderDetailViewProps {
  order: Order | null;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  delivered: {
    label: "Доставлен",
    icon: PackageCheck,
    className: "bg-green-100 text-green-800 border-green-300",
  },
  "in-transit": {
    label: "В пути",
    icon: Truck,
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  processing: {
    label: "Собирается",
    icon: ShoppingCart,
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  cancelled: {
    label: "Отменен",
    icon: PackageX,
    className: "bg-red-100 text-red-800 border-red-300",
  },
};

export function OrderDetailView({ order }: OrderDetailViewProps) {
  if (!order) {
    return (
      <div className="bg-white p-6 rounded-lg border border-zinc-200 h-full flex items-center justify-center">
        <p className="text-gray-500">Выберите заказ для просмотра деталей.</p>
      </div>
    );
  }

  const config = statusConfig[order.status];
  const formattedTotalPrice = new Intl.NumberFormat("ru-RU").format(
    order.totalPrice
  );

  return (
    <div className="bg-white p-6 rounded-lg border border-zinc-200 h-full flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 leading-tight">
            Заказ №{order.id}
          </h2>
          <div className="text-sm text-gray-600 mt-2 space-y-1">
            <p>
              Дата: <span className="text-gray-800">{order.date}</span>
            </p>
            <p>
              Адрес доставки:{" "}
              <span className="text-gray-800">
                г. Москва, ул. Примерная, д. 10, кв. 5
              </span>
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn("text-sm px-3 py-1.5 font-semibold", config.className)}
        >
          <config.icon className="h-4 w-4 mr-2" />
          {config.label}
        </Badge>
      </div>

      {/* CONTENT */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Содержимое заказа:
        </h3>
        <div className="flex-grow overflow-y-auto -mx-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[45%] pl-6">Товар</TableHead>
                <TableHead>Цвет</TableHead>
                <TableHead>Размер</TableHead>
                <TableHead className="text-center">Кол-во</TableHead>
                <TableHead className="text-right pr-6">Цена</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-800 pl-6">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-gray-600">{item.color}</TableCell>
                  <TableCell className="text-gray-600">{item.size}</TableCell>
                  <TableCell className="text-center text-gray-600">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right font-medium text-gray-800 pr-6">
                    {new Intl.NumberFormat("ru-RU").format(item.price)} ₽
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="flex justify-end items-center text-sm text-gray-600 mb-1">
          <span className="mr-2">Общий вес:</span>
          <span className="font-semibold text-gray-800">
            {order.totalWeight} кг
          </span>
        </div>
        <div className="flex justify-end items-center text-lg">
          <span className="mr-2 font-semibold text-gray-700">
            Итоговая стоимость:
          </span>
          <span className="font-bold text-purple-600">
            {formattedTotalPrice} ₽
          </span>
        </div>
      </div>
    </div>
  );
}
