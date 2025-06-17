// file: src/pages/orders/orders-page.tsx

import { useState, useMemo } from "react";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { mockCartItems, mockOrders } from "./model/order-mocks";
import { CartItemCard } from "./ui/cart-item-card";
import { OrderDetailView } from "./ui/order-detail-view";
import { CartItem, Order } from "./model/types";
import { ArrowUpDown, Search } from "lucide-react";
import { OrderListItem } from "@/features/orders/ui/order-list-item";
import { ScrollArea } from "@/shared/ui/kit/scroll-area";
import { CheckoutDialog } from "@/features/orders/ui/CheckoutDialog";

function OrdersPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    mockOrders[0]?.id || null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };
  const handleToggleSelectItem = (itemId: string, selected: boolean) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isSelected: selected } : item
      )
    );
  };
  const handleClearCart = () => {
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, isSelected: false }))
    );
  };

  const selectedCartItems = useMemo(
    () => cartItems.filter((item) => item.isSelected),
    [cartItems]
  );
  const totalCartPrice = useMemo(() => {
    return selectedCartItems.reduce(
      (sum, item) => sum + item.pricePerItem * item.quantity,
      0
    );
  }, [selectedCartItems]);
  const formattedTotalCartPrice = new Intl.NumberFormat("ru-RU").format(
    totalCartPrice
  );

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order.id === selectedOrderId) || null;
  }, [orders, selectedOrderId]);

  return (
    // 1. Обертка страницы теперь flex-контейнер, занимающий всю высоту экрана
    <div className=" h-[93vh] w-full p-4 sm:p-6 flex flex-col">
      {/* 2. Основной блок теперь растягивается на всю доступную высоту (flex-1) */}

      <div className="flex h-full">
        {/* Левая колонка: Корзина */}
        <aside className="w-70  shrink-0 p-4 border-r border-stone-300 flex flex-col ">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4 shrink-0">
            Корзина
          </h2>

          {/* 4. ScrollArea занимает всё оставшееся место */}
          <ScrollArea className="flex-1 h-[70%] -mx-2 pr-3">
            <div className="px-2 space-y-3">
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
                <p className="text-sm text-center text-gray-500 pt-10">
                  Корзина пуста
                </p>
              )}
            </div>
          </ScrollArea>

          {/* Подвал корзины */}
          {cartItems.length > 0 && (
            <div className="mt-auto pt-4 border-t border-gray-200 space-y-3 shrink-0">
              <div className="flex justify-between items-center">
                <span className="text-md font-semibold text-gray-700">
                  Итого:
                </span>
                <span className="text-lg font-bold text-purple-600">
                  {formattedTotalCartPrice} ₽
                </span>
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
              <Button
                variant="outline"
                className="w-full"
                onClick={handleClearCart}
              >
                Очистить корзину
              </Button>
            </div>
          )}
        </aside>

        {/* Правая часть: Заказы */}
        <main className="flex-1 flex bg-white overflow-hidden">
          {/* Колонка списка заказов */}
          <div className="w-[384px] shrink-0 p-4  flex flex-col">
            <div className="shrink-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Заказы
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:bg-gray-100"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Поиск заказа"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* 5. Эта ScrollArea также занимает все оставшееся место в своей колонке */}
            <ScrollArea className="flex-1 -mx-1">
              <div className="px-1 pt-4 space-y-3">
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
                  <p className="text-sm text-center text-gray-500 pt-10">
                    Заказы не найдены
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Детали заказа */}
          <div className="flex-1 p-4 overflow-y-auto">
            <OrderDetailView order={selectedOrder} />
          </div>
        </main>
      </div>
    </div>
  );
}

export const Component = OrdersPage;
