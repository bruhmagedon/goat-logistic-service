import { useState } from "react";

export interface ProductFilters {
  categories: string[];
  priceFrom: string;
  priceTo: string;
  brands: string[];
}

export function useProductFilters() {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState("0");
  const [priceTo, setPriceTo] = useState("1000");
  const [brands, setBrands] = useState<string[]>([]);

  // TODO: Добавить функции для обновления каждого фильтра

  return {
    filters: {
      categories,
      priceFrom,
      priceTo,
      brands,
    },
    setCategories,
    setPriceFrom,
    setPriceTo,
    setBrands,
    // ... другие сеттеры
  };
}
