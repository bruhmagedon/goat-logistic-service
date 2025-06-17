// file: src/features/orders/ui/checkout-dialog.tsx

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shared/ui/kit/dialog";
import { ScrollArea } from "@/shared/ui/kit/scroll-area";
import { CartItem } from "@/features/orders/model/types";
import { CheckoutItemCard } from "./CheckoutItemCard"; // Используем интерактивную карточку

interface CheckoutDialogProps {
  items: CartItem[];
  children: React.ReactNode;
}

export function CheckoutDialog({ items, children }: CheckoutDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Внутреннее состояние, чтобы изменения в форме не затрагивали корзину до подтверждения
  const [internalItems, setInternalItems] = useState<CartItem[]>([]);

  // При открытии диалога копируем товары из пропсов в локальное состояние
  useEffect(() => {
    if (isOpen) {
      setInternalItems(items);
    }
  }, [isOpen, items]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setInternalItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleItemRemove = (itemId: string) => {
    setInternalItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const { totalQuantity, totalWeight, totalPrice } = useMemo(() => {
    if (!internalItems || internalItems.length === 0) {
      return { totalQuantity: 0, totalWeight: "0.0", totalPrice: 0 };
    }
    const totalQuantity = internalItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalWeight = internalItems
      .reduce((sum, item) => sum + item.quantity * 0.5, 0)
      .toFixed(1);
    const totalPrice = internalItems.reduce(
      (sum, item) => sum + item.pricePerItem * item.quantity,
      0
    );
    return { totalQuantity, totalWeight, totalPrice };
  }, [internalItems]);

  const formattedTotalPrice = new Intl.NumberFormat("ru-RU").format(totalPrice);

  const handleSubmit = () => {
    // Здесь будет логика отправки заказа на бэкенд с измененными данными
    console.log("Submitting final order with items:", internalItems);
    alert(`Заказ на сумму ${formattedTotalPrice} ₽ оформлен!`);
    setIsOpen(false); // Закрываем диалог после отправки
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[1000px] sm:max-w-4xl p-0 flex flex-col h-auto max-h-[90vh] rounded-2xl">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-semibold text-neutral-900">
            Оформление заказа
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-8 px-6 pb-6 flex-1 overflow-hidden">
          {/* Левая колонка: Список товаров */}
          <div className="col-span-1 flex flex-col min-h-0">
            <p className="text-base font-medium text-gray-800 mb-4">
              <span className="font-bold">{totalQuantity}</span> товаров в
              заказе
            </p>
            <ScrollArea className="flex-1 -mx-2">
              <div className="px-2 space-y-3">
                {internalItems.map((item) => (
                  <CheckoutItemCard
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onItemRemove={handleItemRemove}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Правая колонка: Информация о заказе */}
          <div className="col-span-1 flex flex-col">
            <div className="flex-1">
              <h3 className="text-base font-medium text-neutral-900 mb-4">
                Данные заказа:
              </h3>
              <div className="text-sm space-y-2 text-gray-600">
                <p>
                  Имя заказчика:{" "}
                  <span className="font-medium text-gray-900">
                    CitySole Retail
                  </span>
                </p>
                <p>
                  ИНН заказчика:{" "}
                  <span className="font-medium text-gray-900">7701234567</span>
                </p>
                <p>
                  Адрес доставки:{" "}
                  <span className="font-medium text-gray-900">
                    г. Москва, ул. Примерная, д. 10, кв. 5
                  </span>
                </p>
                <p>
                  Общий вес заказа:{" "}
                  <span className="font-medium text-gray-900">
                    {totalWeight} кг
                  </span>
                </p>
              </div>
              <Button variant="outline" className="mt-6">
                Перейти в профиль пользователя
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-semibold text-neutral-900">
                  Итоговая цена:
                </span>
                <span className="text-3xl font-bold text-neutral-900">
                  {formattedTotalPrice} ₽
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="bg-neutral-50 p-4 border-t border-stone-200 flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" size="large">
              Отмена
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-violet-600 hover:bg-violet-700"
            size="large"
            onClick={handleSubmit}
            disabled={internalItems.length === 0}
          >
            Заказать товары
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
