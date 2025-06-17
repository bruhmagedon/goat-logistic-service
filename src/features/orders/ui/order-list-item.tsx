// src/features/orders/ui/order-list-item.tsx

import { Badge } from "@/shared/ui/kit/badge";
import { Order, OrderStatus } from "@/features/orders/model/types";
import { Truck, PackageCheck, PackageX, ShoppingCart } from "lucide-react";
import { cn } from "@/shared/lib/css";

interface OrderListItemProps {
  order: Order;
  isSelected: boolean;
  onSelect: (orderId: string) => void;
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

export function OrderListItem({
  order,
  isSelected,
  onSelect,
}: OrderListItemProps) {
  const config = statusConfig[order.status];
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(
    order.totalPrice
  );

  return (
    <div
      className={cn(
        "p-2.5 rounded-lg border shadow-sm cursor-pointer transition-all duration-150 ease-in-out flex flex-col gap-1.5",
        isSelected
          ? "bg-purple-50 border-purple-500 ring-1 ring-purple-500"
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
      )}
      onClick={() => onSelect(order.id)}
    >
      <div className="flex justify-between items-start">
        <p
          className={cn(
            "text-xs font-medium",
            isSelected ? "text-gray-800" : "text-gray-500"
          )}
        >
          От {order.date} <span className="text-gray-400 mx-0.5">•</span> №
          {order.id}
        </p>
        <Badge
          variant="outline"
          className={cn("text-xs px-2 py-0.5 font-semibold", config.className)}
        >
          <config.icon className="h-3.5 w-3.5 mr-1.5" />
          {config.label}
        </Badge>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-[10px] space-y-0.5">
          <div className="text-neutral-400">
            Вес:{" "}
            <span className="text-neutral-900 font-medium">
              {order.totalWeight} кг
            </span>
          </div>
          <div className="text-neutral-400">
            Цена:{" "}
            <span className="text-neutral-900 font-medium">
              {formattedPrice} ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
