import { ReactNode } from 'react';

export type ProductStatus = 'На складе' | 'На модерации' | 'Нужна поставка';

export interface ProductVariant {
  id: string;
  color: string;
  size: string | number;
  quantity: number;
}

export interface FactoryProduct {
  id: string;
  name: string;
  status: ProductStatus;
  statusIcon?: ReactNode; // Для иконки статуса, если нужно
  price: number;
  currency: string; // например, "Р"
  materials: string;
  variants: ProductVariant[];
  category: string;
  imageUrl?: string; // Опционально, на скриншоте нет изображений товара
}
