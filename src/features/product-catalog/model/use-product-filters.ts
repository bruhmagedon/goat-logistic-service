import { useState, useMemo } from "react"; // Добавьте useMemo

export interface ProductFilters {
  categories: string[];
  priceFrom: string;
  priceTo: string;
  brands: string[];
}

export function useProductFilters() {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState("0");
  const [priceTo, setPriceTo] = useState("10000");
  const [brands, setBrands] = useState<string[]>([]);

  // TODO: Добавить функции для обновления каждого фильтра

  const filters = useMemo(
    () => ({
      categories,
      priceFrom,
      priceTo,
      brands,
    }),
    [categories, priceFrom, priceTo, brands]
  );

  return {
    filters, // Теперь это мемоизированный объект
    setCategories,
    setPriceFrom,
    setPriceTo,
    setBrands,
    // ... другие сеттеры
  };
}
