// src/features/orders/ui/order-list-item.tsx

import { Order, OrderStatus } from '@/features/orders/model/types';
import { cn } from '@/shared/lib/css';
import { Badge } from '@/shared/ui/kit/badge';
import { PackageCheck, PackageX, ShoppingCart, Truck } from 'lucide-react';

interface OrderListItemProps {
  order: Order;
  isSelected: boolean;
  onSelect: (orderId: string) => void;
}

const statusConfig: Record<OrderStatus, { label: string; icon: React.ElementType; className: string }> = {
  delivered: {
    label: 'Доставлен',
    icon: PackageCheck,
    className: 'bg-green-100 text-black border-green-300',
  },
  'in-transit': {
    label: 'В пути',
    icon: Truck,
    className: 'bg-blue-100 text-black border-blue-300',
  },
  processing: {
    label: 'Собирается',
    icon: ShoppingCart,
    className: 'bg-yellow-100 text-black  border-yellow-300',
  },
  cancelled: {
    label: 'Отменен',
    icon: PackageX,
    className: 'bg-red-100 text-black  border-red-300',
  },
};

export function OrderListItem({ order, isSelected, onSelect }: OrderListItemProps) {
  const config = statusConfig[order.status];
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(order.totalPrice);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={cn(
        'flex cursor-pointer flex-col gap-1.5 rounded-lg border p-2.5 shadow-sm transition-all duration-150 ease-in-out',
        isSelected
          ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md',
      )}
      onClick={() => onSelect(order.id)}
    >
      <div className="flex items-start justify-between">
        <p className={cn('font-medium text-sm', isSelected ? 'text-gray-800' : 'text-gray-500')}>
          От {order.date} <span className="mx-0.5 text-gray-400">•</span> №{order.id}
        </p>
        <Badge
          variant="outline"
          className={cn('h-[30px] px-2 py-0.5 font-semibold text-sm', config.className)}
        >
          <config.icon className="size-5!" />
          {config.label}
        </Badge>
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-0.5 text-sm">
          <div className="text-neutral-400">
            Вес: <span className="font-medium text-neutral-900">{order.totalWeight} кг</span>
          </div>
          <div className="text-neutral-400">
            Цена: <span className="font-medium text-neutral-900">{formattedPrice} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}
