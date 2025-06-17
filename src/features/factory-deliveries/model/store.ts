import { toast } from 'sonner';
import { create } from 'zustand';
import type { DeliveryItem } from './types';

interface DeliveryState {
  items: DeliveryItem[];
  updateDeliveryAmount: (variantId: string, amount: number) => void;
  formDelivery: (variantId: string) => void;
}

export const useDeliveryStore = create<DeliveryState>((set, get) => ({
  // --- ОБНОВЛЕННЫЕ МОКОВЫЕ ДАННЫЕ ---
  items: [
    {
      productId: 'nike-pegasus-37',
      variantId: 'v1',
      productName: 'Кроссовки Nike Air Zoom Pegasus 37',
      color: 'Черный',
      size: 42,
      stockCount: 12,
      deliveryAmount: 1,
    },
    {
      productId: 'nike-pegasus-37',
      variantId: 'v2',
      productName: 'Кроссовки Nike Air Zoom Pegasus 37',
      color: 'Черный',
      size: 43,
      stockCount: 5,
      deliveryAmount: 1,
    },
    {
      productId: 'puma-rs-x3',
      variantId: 'v4',
      productName: 'Кроссовки Puma RS-X3',
      color: 'Бежевый',
      size: 43,
      stockCount: 8,
      deliveryAmount: 1,
    },
    {
      productId: 'puma-rs-x3',
      variantId: 'v5',
      productName: 'Кроссовки Puma RS-X3',
      color: 'Серый',
      size: 42,
      stockCount: 2,
      deliveryAmount: 1,
    },
    {
      productId: 'nike-pegasus-37',
      variantId: 'v3',
      productName: 'Кроссовки Nike Air Zoom Pegasus 37',
      color: 'Синий',
      size: 41,
      stockCount: 0,
      deliveryAmount: 1,
    },
    {
      productId: 'nike-air-max-270',
      variantId: 'v6',
      productName: 'Кроссовки Nike Air Max 270',
      color: 'Красный/Черный',
      size: 40,
      stockCount: 1,
      deliveryAmount: 1,
    },
    {
      productId: 'nike-air-max-270',
      variantId: 'v7',
      productName: 'Кроссовки Nike Air Max 270',
      color: 'Белый/Голубой',
      size: 42,
      stockCount: 0,
      deliveryAmount: 1,
    },
  ],

  // ... (остальная логика стора без изменений)
  updateDeliveryAmount: (variantId, amount) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.variantId === variantId ? { ...item, deliveryAmount: Math.max(0, amount) } : item,
      ),
    }));
  },
  formDelivery: (variantId) => {
    const item = get().items.find((i) => i.variantId === variantId);
    if (!item || item.deliveryAmount <= 0) {
      return;
    }
    console.log(
      `Формирование поставки для ${item.productName} (${item.color}, ${item.size}) в количестве ${item.deliveryAmount} шт.`,
    );
    toast.success('Поставка успешно сформирована!', {
      description: `${item.productName} (${item.deliveryAmount} шт.) отправлен на склад.`,
    });
    get().updateDeliveryAmount(variantId, 1);
  },
}));
