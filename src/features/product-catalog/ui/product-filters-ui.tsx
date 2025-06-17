// file: features/product-catalog/ui/product-filters-ui.tsx

import { Button } from '@/shared/ui/kit/button';
import { Checkbox } from '@/shared/ui/kit/checkbox';
import { Input } from '@/shared/ui/kit/input';
import { Label } from '@/shared/ui/kit/label';
import type { ProductFilters } from '../model/use-product-filters';

// Данные для фильтров
const shoeCategories = [
  { id: 'men', label: 'Мужская обувь' },
  { id: 'women', label: 'Женская обувь' },
  { id: 'unisex', label: 'Унисекс' }, // Добавил для соответствия мокам
];

// ВАЖНО: id брендов должны совпадать с данными в моках
const brandOptions = [
  { id: 'Adidas', label: 'Adidas' },
  { id: 'Nike', label: 'Nike' },
  { id: 'Puma', label: 'Puma' },
  { id: 'Reebok', label: 'Reebok' },
  { id: 'GUCCI', label: 'GUCCI' },
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
    <div>
      <div>
        <h3 className="mt-6 mb-2 font-semibold text-lg">Обувь</h3>
        <div className="space-y-2">
          {shoeCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) => onCategoryChange(category.id, !!checked)}
              />
              <Label htmlFor={`cat-${category.id}`}>{category.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="my-6 border-t border-b pt-6 pb-11">
        <h3 className="mb-3 font-semibold text-lg ">Цена от и до:</h3>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            placeholder="0"
            value={filters.priceFrom}
            onChange={(e) => onPriceFromChange(e.target.value)}
            className="w-[80px]"
            min="0"
          />
          <Input
            type="number"
            placeholder="70000"
            value={filters.priceTo}
            onChange={(e) => onPriceToChange(e.target.value)}
            className="w-[80px]"
            min="0"
          />
        </div>
      </div>

      <div className="">
        <h3 className="mb-3 font-semibold text-lg">Бренды</h3>
        <div className="space-y-2">
          {brandOptions.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={filters.brands.includes(brand.id)}
                onCheckedChange={(checked) => onBrandChange(brand.id, !!checked)}
              />
              <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
            </div>
          ))}
          <Button variant="link" className="h-auto p-0 text-sm">
            + Показать все
          </Button>
        </div>
      </div>
    </div>
  );
}
