// src/features/orders/ui/cart-item-card.tsx

import { CartItem } from '@/features/orders/model/types';
import { cn } from '@/shared/lib/css';
import { Button } from '@/shared/ui/kit/button';
import { Checkbox } from '@/shared/ui/kit/checkbox';
import { Minus, Plus, X } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
  onToggleSelect: (itemId: string, selected: boolean) => void;
}

export function CartItemCard({ item, onQuantityChange, onRemove, onToggleSelect }: CartItemCardProps) {
  const handleIncrease = () => onQuantityChange(item.id, item.quantity + 1);
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const totalPrice = new Intl.NumberFormat('ru-RU').format(item.pricePerItem * item.quantity);

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg border bg-white p-2.5 shadow-sm transition-all duration-150 ease-in-out',
        item.isSelected ? 'border-violet-400 bg-violet-50/50' : 'border-gray-200 hover:bg-gray-50/70',
      )}
    >
      <div className="flex items-start justify-between">
        <p className="pr-2 font-medium text-neutral-900 text-sm leading-none">{item.name}</p>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 shrink-0 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => onRemove(item.id)}
        >
          <X className="size-4.5" />
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Checkbox
            id={`select-${item.id}`}
            checked={item.isSelected}
            onCheckedChange={(checked) => onToggleSelect(item.id, !!checked)}
            className="size-6 cursor-pointer"
          />
          {/* Кастомный счетчик */}
          <div className="flex items-center rounded-md border border-gray-300 bg-white p-1 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              <Minus className="size-4" />
            </Button>
            <span className="w-7 text-center font-medium text-gray-800">{item.quantity}</span>
            <Button variant="ghost" size="icon" className="size-6" onClick={handleIncrease}>
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <p className="font-medium text-neutral-900 leading-normal">{totalPrice} ₽</p>
          <p className="text-neutral-400 text-xs">
            {new Intl.NumberFormat('ru-RU').format(item.pricePerItem)} ₽/шт.
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="text-neutral-400">
          Цвет: <span className="font-medium text-neutral-900">{item.variant.color}</span>
        </div>
        <div className="text-neutral-400">
          Размер: <span className="font-medium text-neutral-900">{item.variant.size}</span>
        </div>
      </div>
    </div>
  );
}
