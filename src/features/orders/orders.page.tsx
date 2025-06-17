// file: src/pages/orders/orders-page.tsx

import { CheckoutDialog } from '@/features/orders/ui/CheckoutDialog';
import { OrderListItem } from '@/features/orders/ui/order-list-item';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import { ScrollArea } from '@/shared/ui/kit/scroll-area';
import { ArrowUpDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { mockCartItems, mockOrders } from './model/order-mocks';
import { CartItem, Order } from './model/types';
import { CartItemCard } from './ui/cart-item-card';
import { OrderDetailView } from './ui/order-detail-view';

function OrdersPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(mockOrders[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
    );
  };
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };
  const handleToggleSelectItem = (itemId: string, selected: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isSelected: selected } : item)),
    );
  };
  const handleClearCart = () => {
    setCartItems((prev) => prev.map((item) => ({ ...item, isSelected: false })));
  };

  const selectedCartItems = useMemo(() => cartItems.filter((item) => item.isSelected), [cartItems]);
  const totalCartPrice = useMemo(() => {
    return selectedCartItems.reduce((sum, item) => sum + item.pricePerItem * item.quantity, 0);
  }, [selectedCartItems]);
  const formattedTotalCartPrice = new Intl.NumberFormat('ru-RU').format(totalCartPrice);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [orders, searchTerm]);

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order.id === selectedOrderId) || null;
  }, [orders, selectedOrderId]);

  return (
    // 1. Обертка страницы теперь flex-контейнер, занимающий всю высоту экрана
    <div className=" flex h-[93vh] w-full flex-col">
      {/* 2. Основной блок теперь растягивается на всю доступную высоту (flex-1) */}

      <div className="flex h-full">
        {/* Левая колонка: Корзина */}
        <aside className="flex w-100 shrink-0 flex-col border-stone-300 border-r p-4 ">
          <h2 className="mb-4 shrink-0 font-semibold text-neutral-900 text-xl">Корзина</h2>

          {/* 4. ScrollArea занимает всё оставшееся место */}
          <ScrollArea className="-mx-2 h-[70%] flex-1 pr-3">
            <div className="space-y-3 px-2">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    onToggleSelect={handleToggleSelectItem}
                  />
                ))
              ) : (
                <p className="pt-10 text-center text-gray-500 text-sm">Корзина пуста</p>
              )}
            </div>
          </ScrollArea>

          {/* Подвал корзины */}
          {cartItems.length > 0 && (
            <div className="mt-auto shrink-0 space-y-3 border-gray-200 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700 text-md">Итого:</span>
                <span className="font-bold text-lg text-purple-600">{formattedTotalCartPrice} ₽</span>
              </div>
              <CheckoutDialog items={selectedCartItems}>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="large"
                  disabled={selectedCartItems.length === 0}
                >
                  Оформить заказ
                </Button>
              </CheckoutDialog>
              <Button variant="outline" className="w-full" onClick={handleClearCart}>
                Очистить корзину
              </Button>
            </div>
          )}
        </aside>

        {/* Правая часть: Заказы */}
        <main className="flex flex-1 overflow-hidden bg-white">
          {/* Колонка списка заказов */}
          <div className="flex w-110 shrink-0 flex-col p-4">
            <div className="shrink-0">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-neutral-900 text-xl">Заказы</h2>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mb-4">
                <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Поиск заказа"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* 5. Эта ScrollArea также занимает все оставшееся место в своей колонке */}
            <ScrollArea className="-mx-1 flex-1">
              <div className="space-y-3 px-1 pt-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderListItem
                      key={order.id}
                      order={order}
                      isSelected={order.id === selectedOrderId}
                      onSelect={setSelectedOrderId}
                    />
                  ))
                ) : (
                  <p className="pt-10 text-center text-gray-500 text-sm">Заказы не найдены</p>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Детали заказа */}
          <div className="flex-1 overflow-y-auto p-4">
            <OrderDetailView order={selectedOrder} />
          </div>
        </main>
      </div>
    </div>
  );
}

export const Component = OrdersPage;
