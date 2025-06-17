// file: src/features/orders/ui/CheckoutItemCard.tsx

import { Button } from "@/shared/ui/kit/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/features/orders/model/types";

interface CheckoutItemCardProps {
  item: CartItem;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onItemRemove: (itemId: string) => void;
}

export function CheckoutItemCard({
  item,
  onQuantityChange,
  onItemRemove,
}: CheckoutItemCardProps) {
  const handleIncrease = () => onQuantityChange(item.id, item.quantity + 1);
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const totalPrice = new Intl.NumberFormat("ru-RU").format(
    item.pricePerItem * item.quantity
  );

  return (
    <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
      {/* Изображение */}
      <img
        src={`https://placehold.co/56x56/E9D5FF/4C1D95?text=${item.name.charAt(
          0
        )}`}
        alt={item.name}
        width={56}
        height={56}
        className="rounded-md bg-gray-100"
      />

      {/* Информация о товаре */}
      <div className="flex-grow flex flex-col justify-center gap-1.5">
        <p className="text-xs font-medium text-neutral-900 leading-none">
          {item.name}
        </p>
        <div className="flex items-center gap-2 text-[10px]">
          <p>
            <span className="text-neutral-400">Цвет:</span>
            <span className="text-neutral-900 font-medium">
              {" "}
              {item.variant.color}
            </span>
          </p>
          <p>
            <span className="text-neutral-400">Размер:</span>
            <span className="text-neutral-900 font-medium">
              {" "}
              {item.variant.size}
            </span>
          </p>
        </div>
      </div>

      {/* Управление и цена */}
      <div className="flex flex-col items-end gap-2">
        <div className="px-2 py-1 bg-purple-50 rounded-md border border-violet-200">
          <p className="text-sm font-semibold text-neutral-900 leading-tight">
            {totalPrice} ₽
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Кастомный счетчик */}
          <div className="flex items-center p-0.5 bg-violet-600 rounded-md shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-white hover:bg-violet-700"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-xs font-medium text-white">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-white hover:bg-violet-700"
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-red-100"
            onClick={() => onItemRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
