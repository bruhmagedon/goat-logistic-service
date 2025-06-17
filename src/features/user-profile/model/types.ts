export interface UserProfile {
  companyName: string;
  inn: string;
  address: string;
  email: string;
  // password: string; // Пароль обычно не хранится в таком виде в сторе
}

export interface PurchaseDynamicsDataPoint {
  month: string; // Формат 'YYYY-MM'
  volume: number;
}

export interface PurchaseCategoryDataPoint {
  category: string;
  volume: number;
  fill: string; // цвет для диаграммы
}

export interface PurchaseBrandDataPoint {
  brand: string;
  volume: number;
}
