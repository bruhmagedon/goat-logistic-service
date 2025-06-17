// file: features/product-catalog/ui/product-filters-ui.tsx

import React from "react";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Label } from "@/shared/ui/kit/label";
import type { ProductFilters } from "../model/use-product-filters";

// Данные для фильтров
const shoeCategories = [
  { id: "men", label: "Мужская обувь" },
  { id: "women", label: "Женская обувь" },
  { id: "unisex", label: "Унисекс" }, // Добавил для соответствия мокам
];

// ВАЖНО: id брендов должны совпадать с данными в моках
const brandOptions = [
  { id: "Adidas", label: "Adidas" },
  { id: "Nike", label: "Nike" },
  { id: "Puma", label: "Puma" },
  { id: "Reebok", label: "Reebok" },
  { id: "GUCCI", label: "GUCCI" },
];

interface ProductFiltersUIProps {
  filters: ProductFilters;
  onCategoryChange: (categoryId: string, checked: boolean) => void;
  onBrandChange: (brandId: string, checked: boolean) => void;
  onPriceFromChange: (value: string) => void;
  onPriceToChange: (value: string) => void;
}

export function ProductFiltersUI({
  filters,
  onCategoryChange,
  onBrandChange,
  onPriceFromChange,
  onPriceToChange,
}: ProductFiltersUIProps) {
  return (
    // Вся структура и классы возвращены к исходному состоянию
    <div className="w-[16rem]">
      <div>
        <h3 className="text-lg font-semibold mb-2 mt-6">Обувь</h3>
        <div className="space-y-2">
          {shoeCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) =>
                  onCategoryChange(category.id, !!checked)
                }
              />
              <Label htmlFor={`cat-${category.id}`}>{category.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-b my-6 pt-6 pb-11">
        <h3 className="text-lg font-semibold mb-3 ">Цена от и до:</h3>
        <div className="flex items-center">
          <Input
            type="number"
            placeholder="0"
            value={filters.priceFrom}
            onChange={(e) => onPriceFromChange(e.target.value)}
            className="w-full"
            min="0"
          />
          <span className="text-gray-500 mx-2">-</span>
          <Input
            type="number"
            placeholder="70000"
            value={filters.priceTo}
            onChange={(e) => onPriceToChange(e.target.value)}
            className="w-full"
            min="0"
          />
        </div>
      </div>

      <div className="">
        <h3 className="text-lg font-semibold mb-3">Бренды</h3>
        <div className="space-y-2">
          {brandOptions.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={filters.brands.includes(brand.id)}
                onCheckedChange={(checked) =>
                  onBrandChange(brand.id, !!checked)
                }
              />
              <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
            </div>
          ))}
          <Button variant="link" className="p-0 h-auto text-sm">
            + Показать все
          </Button>
        </div>
      </div>
    </div>
  );
}
