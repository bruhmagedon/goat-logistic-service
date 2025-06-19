import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { mockCartItems, mockOrders } from '../model/order-mocks';
import type { CartItem, Order, OrderItem, UserProfile } from '../model/types';

// Описываем состояние и действия нашего стора
interface OrderState {
  cartItems: CartItem[];
  orders: Order[];
  selectedOrderId: string | null;
  searchTerm: string;
  // --- Действия с корзиной ---
  updateCartItemQuantity: (itemId: string, newQuantity: number) => void;
  removeCartItem: (itemId: string) => void;
  toggleCartItemSelect: (itemId: string, selected: boolean) => void;
  clearCart: () => void;
  // --- Действия с заказами ---
  setSearchTerm: (term: string) => void;
  setSelectedOrder: (orderId: string) => void;
  checkout: (itemsToCheckout: CartItem[]) => void;
  userProfile: UserProfile;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  userProfile: {
    name: 'CitySole Retail',
    inn: '7701234567',
    address: 'г. Москва, ул. Примерная, д. 10, кв. 5',
  },
  // --- Начальное состояние ---
  cartItems: mockCartItems,
  orders: mockOrders,
  selectedOrderId: mockOrders[0]?.id || null,
  searchTerm: '',

  // --- Реализация действий ---
  updateCartItemQuantity: (itemId, newQuantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, newQuantity) } : item,
      ),
    }));
  },

  removeCartItem: (itemId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    }));
  },

  toggleCartItemSelect: (itemId, selected) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === itemId ? { ...item, isSelected: selected } : item,
      ),
    }));
  },

  clearCart: () => {
    set((state) => ({
      cartItems: state.cartItems.map((item) => ({ ...item, isSelected: false })),
    }));
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },

  setSelectedOrder: (orderId) => {
    set({ selectedOrderId: orderId });
  },

  // Имитация оформления заказа
  checkout: (itemsToCheckout) => {
    if (itemsToCheckout.length === 0) return;

    const newOrderItems: OrderItem[] = itemsToCheckout.map((item) => ({
      name: item.name,
      color: item.variant.color,
      size: item.variant.size,
      quantity: item.quantity,
      price: item.pricePerItem * item.quantity,
    }));

    const newOrder: Order = {
      id: uuidv4().slice(0, 8), // Генерируем новый ID
      date: new Intl.DateTimeFormat('ru-RU').format(new Date()),
      totalPrice: itemsToCheckout.reduce((sum, item) => sum + item.pricePerItem * item.quantity, 0),
      totalWeight: itemsToCheckout.reduce((sum, item) => sum + 0.8 * item.quantity, 0), // Примерный вес
      status: 'processing',
      items: newOrderItems,
    };

    toast.success('Заказ успешно оформлен!', {
      description: `Заказу присвоен номер ${newOrder.id}.`,
    });

    set((state) => ({
      // Добавляем новый заказ в начало списка
      orders: [newOrder, ...state.orders],
      // Удаляем купленные товары из корзины
      cartItems: state.cartItems.filter(
        (item) => !itemsToCheckout.find((checkedItem) => checkedItem.id === item.id),
      ),
      // Выбираем новый заказ для отображения
      selectedOrderId: newOrder.id,
    }));
  },
}));
