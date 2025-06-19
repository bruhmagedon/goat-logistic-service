// file: src/features/product-catalog/model/types.ts

// ... (предыдущие типы Product, ProductVariant и т.д. остаются) ...

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variant: {
    color: string;
    size: number | string;
  };
  image: string;
  quantity: number;
  pricePerItem: number;
  isSelected?: boolean; // Для выбора товаров в корзине
}

export type OrderStatus = 'delivered' | 'in-transit' | 'processing' | 'cancelled';

export interface OrderItem {
  name: string;
  color: string;
  size: number | string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  totalWeight: number;
  totalPrice: number;
  status: OrderStatus;
  items: Array<{
    name: string;
    color: string;
    size: number | string;
    quantity: number;
    price: number;
  }>;
}

export interface UserProfile {
  name: string;
  inn: string;
  address: string;
}
