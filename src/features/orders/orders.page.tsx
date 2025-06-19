import { CheckoutDialog } from '@/features/orders/ui/CheckoutDialog';
import { OrderListItem } from '@/features/orders/ui/order-list-item';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import { ScrollArea } from '@/shared/ui/kit/scroll-area';
import { ArrowUpDown, Search } from 'lucide-react';
import { useMemo } from 'react';
import { useOrderStore } from './model/order.store';
import { CartItemCard } from './ui/cart-item-card';
import { OrderDetailView } from './ui/order-detail-view';

function OrdersPage() {
  // 2. Получаем всё необходимое из стора с помощью селекторов
  const {
    cartItems,
    orders,
    selectedOrderId,
    searchTerm,
    updateCartItemQuantity,
    removeCartItem,
    toggleCartItemSelect,
    clearCart,
    setSearchTerm,
    setSelectedOrder,
    checkout,
  } = useOrderStore();

  // 3. Все хуки `useMemo` продолжают работать как раньше, но теперь они зависят от данных из стора!
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
    <div className="flex h-[93vh] w-full flex-col">
      <div className="flex h-full">
        {/* Левая колонка: Корзина (JSX без изменений, пропсы теперь из стора) */}
        <aside className="flex w-100 shrink-0 flex-col border-stone-300 border-r p-4">
          <h2 className="mb-4 shrink-0 font-semibold text-neutral-900 text-xl">Корзина</h2>
          <ScrollArea className="-mx-2 h-[70%] flex-1">
            <div className="space-y-3 px-2">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onQuantityChange={updateCartItemQuantity}
                    onRemove={removeCartItem}
                    onToggleSelect={toggleCartItemSelect}
                  />
                ))
              ) : (
                <p className="pt-10 text-center text-gray-500 text-sm">Корзина пуста</p>
              )}
            </div>
          </ScrollArea>
          {cartItems.length > 0 && (
            <div className="mt-auto shrink-0 space-y-3 border-gray-200 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700 text-md">Итого:</span>
                <span className="font-bold text-lg text-purple-600">{formattedTotalCartPrice} ₽</span>
              </div>
              {/* 4. Передаем в диалог функцию `checkout` из стора */}
              <CheckoutDialog items={selectedCartItems}>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="large"
                  disabled={selectedCartItems.length === 0}
                >
                  Оформить заказ
                </Button>
              </CheckoutDialog>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Очистить корзину
              </Button>
            </div>
          )}
        </aside>

        {/* Правая часть: Заказы (JSX без изменений, пропсы теперь из стора) */}
        <main className="flex flex-1 overflow-hidden bg-white">
          <div className="flex w-110 shrink-0 flex-col p-4">
            <div className="shrink-0">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-neutral-900 text-xl">Заказы</h2>
              </div>
              <div className="flex gap-2">
                <div className="relative mb-4 flex-1">
                  <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Поиск заказа"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon" className="text-gray-500 hover:bg-gray-100">
                  <ArrowUpDown className="size-5" />
                </Button>
              </div>
            </div>
            <ScrollArea className="-mx-1 flex-1">
              <div className="space-y-3 px-1 pt-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderListItem
                      key={order.id}
                      order={order}
                      isSelected={order.id === selectedOrderId}
                      onSelect={setSelectedOrder}
                    />
                  ))
                ) : (
                  <p className="pt-10 text-center text-gray-500 text-sm">Заказы не найдены</p>
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="mt-10 flex-1 overflow-y-auto p-4">
            <OrderDetailView order={selectedOrder} />
          </div>
        </main>
      </div>
    </div>
  );
}

export const Component = OrdersPage;
