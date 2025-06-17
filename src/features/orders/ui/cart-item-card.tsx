// src/features/orders/ui/cart-item-card.tsx

import { Button } from "@/shared/ui/kit/button";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Minus, Plus, X } from "lucide-react";
import { CartItem } from "@/features/orders/model/types";
import { cn } from "@/shared/lib/css";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
  onToggleSelect: (itemId: string, selected: boolean) => void;
}

export function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  onToggleSelect,
}: CartItemCardProps) {
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
    <div
      className={cn(
        "p-2.5 bg-white rounded-lg shadow-sm border flex flex-col gap-2 transition-all duration-150 ease-in-out",
        item.isSelected
          ? "border-violet-400 bg-violet-50/50"
          : "border-gray-200 hover:bg-gray-50/70"
      )}
    >
      <div className="flex justify-between items-start">
        <p className="text-xs font-medium text-neutral-900 leading-none pr-2">
          {item.name}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 shrink-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          onClick={() => onRemove(item.id)}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Checkbox
            id={`select-${item.id}`}
            checked={item.isSelected}
            onCheckedChange={(checked) => onToggleSelect(item.id, !!checked)}
            className="h-5 w-5"
          />
          {/* Кастомный счетчик */}
          <div className="flex items-center p-0.5 bg-white border border-gray-300 rounded-md shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-xs font-medium text-gray-800">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-neutral-900 leading-normal">
            {totalPrice} ₽
          </p>
          <p className="text-[10px] text-neutral-400">
            {new Intl.NumberFormat("ru-RU").format(item.pricePerItem)} ₽/шт.
          </p>
        </div>
      </div>

      <div className="text-[10px] space-y-0.5">
        <div className="text-neutral-400">
          Цвет:{" "}
          <span className="text-neutral-900 font-medium">
            {item.variant.color}
          </span>
        </div>
        <div className="text-neutral-400">
          Размер:{" "}
          <span className="text-neutral-900 font-medium">
            {item.variant.size}
          </span>
        </div>
      </div>
    </div>
  );
}
