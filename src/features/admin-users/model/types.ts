export interface SystemProduct {
  id: string;
  name: string;
  supplier: string;
  category: 'Мужская обувь' | 'Женская обувь';
  price: number;
  currency: '₽';
  status: 'На складе' | 'Нужна поставка';
}

export interface PendingProductRequest {
  id: string;
  name: string;
  supplier: string;
  date: string;
  category: 'Мужская обувь' | 'Женская обувь';
  price: number;
  currency: '₽';
}
