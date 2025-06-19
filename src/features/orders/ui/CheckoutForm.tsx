import { Button } from '@/shared/ui/kit/button';
import { ScrollArea } from '@/shared/ui/kit/scroll-area';
import { Minus, Plus, X } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useOrderStore } from '../model/order.store';
import type { CartItem } from '../model/types';

interface CheckoutFormProps {
  items: CartItem[];
  onClose: () => void;
}

function CheckoutItemCard({ item }: { item: CartItem }) {
  const { updateCartItemQuantity, removeCartItem } = useOrderStore();
  const totalItemPrice = new Intl.NumberFormat('ru-RU').format(item.pricePerItem * item.quantity);

  return (
    <div className="flex items-center gap-4 rounded-lg bg-background p-2.5 shadow-sm">
      <img src={item.image} alt={item.name} className="h-[55px] w-[55px] rounded-md object-cover" />
      <div className="flex-1 space-y-1">
        <p className="font-medium text-xs leading-none">{item.name}</p>
        <p className="text-[10px] text-muted-foreground">
          Цвет: <span className="text-foreground">{item.variant.color}</span> Размер:{' '}
          <span className="text-foreground">{item.variant.size}</span>
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex w-full justify-center rounded-md border border-primary bg-primary/5 px-4 py-1 font-medium text-black text-sm">
          {totalItemPrice} ₽
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-md bg-primary p-0.5 text-primary-foreground">
            <Button
              variant="ghost"
              size="icon"
              className="h-[22px] w-[22px] shrink-0 hover:bg-primary/80"
              onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-6 text-center font-medium text-xs">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-[22px] w-[22px] shrink-0 hover:bg-primary/80"
              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-[22px] w-[22px] shrink-0 text-muted-foreground"
            onClick={() => removeCartItem(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CheckoutForm({ items, onClose }: CheckoutFormProps) {
  const { userProfile, checkout } = useOrderStore();

  const totalItemsCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalWeight = useMemo(
    () => items.reduce((sum, item) => sum + 0.8 * item.quantity, 0).toFixed(1),
    [items],
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.pricePerItem * item.quantity, 0),
    [items],
  );
  const formattedTotalPrice = new Intl.NumberFormat('ru-RU').format(totalPrice);

  const handleCheckout = () => {
    checkout(items);
    onClose();
  };

  return (
    <div className="flex flex-col">
      {/* Основной контент */}
      <div className="p-6">
        <h2 className="font-semibold text-xl">Оформление заказа</h2>
        <div className="mt-6 grid grid-cols-[1fr_400px] gap-8">
          {/* Левая колонка - Список товаров */}
          <div className="space-y-2.5">
            <h3 className="font-medium text-base">{totalItemsCount} товаров в заказе</h3>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2.5">
                {items.map((item) => (
                  <CheckoutItemCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
          </div>
          {/* Правая колонка - Данные и итоги */}
          <div className="flex flex-col justify-between">
            <div className="space-y-2.5 text-sm">
              <h3 className="font-medium text-base">Данные заказа:</h3>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Имя заказчика:</span> {userProfile.name}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">ИНН заказчика:</span> {userProfile.inn}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Адрес доставки:</span> {userProfile.address}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Общий вес заказа:</span> {totalWeight} кг
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/shop/profile">
                <Button variant="outline" className="w-full">
                  Перейти в профиль пользователя
                </Button>
              </Link>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-xl">Итоговая цена:</span>
                <span className="font-semibold text-xl">{formattedTotalPrice} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Футер с кнопками */}
      <div className="flex items-center justify-between rounded-b-lg border-t bg-muted p-6">
        <Button type="button" variant="outline" onClick={onClose}>
          Отмена
        </Button>
        <Button type="button" onClick={handleCheckout}>
          Заказать товары
        </Button>
      </div>
    </div>
  );
}
