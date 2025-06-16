// Предполагается, что такой тип будет доступен через ApiSchemas["Product"]
// или определен глобально для вашего проекта.
export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  currency: string; // например, "P"
  brand?: string;
  category?: string;
}

// Тип для опций сортировки
export type ProductSortOption =
  | "bestMatch" // Лучшее совпадение
  | "priceAsc" // Цена по возрастанию
  | "priceDesc" // Цена по убыванию
  | "name"; // По имени

// Тип для режима отображения
export type ViewMode = "cards" | "list";