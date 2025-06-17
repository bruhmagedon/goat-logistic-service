// file: features/product-catalog/model/use-product-filters.ts

import { useState, useMemo, useCallback } from "react";

export interface ProductFilters {
  categories: string[];
  priceFrom: string;
  priceTo: string;
  brands: string[];
}

export function useProductFilters() {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState("0");
  const [priceTo, setPriceTo] = useState("70000"); // Увеличим дефолтное значение
  const [brands, setBrands] = useState<string[]>([]);

  const handleCategoryChange = useCallback(
    (categoryId: string, checked: boolean) => {
      setCategories((prev) =>
        checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)
      );
    },
    []
  );

  const handleBrandChange = useCallback((brandId: string, checked: boolean) => {
    setBrands((prev) =>
      checked ? [...prev, brandId] : prev.filter((id) => id !== brandId)
    );
  }, []);

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
    filters,
    handleCategoryChange,
    handleBrandChange,
    setPriceFrom,
    setPriceTo,
  };
}
