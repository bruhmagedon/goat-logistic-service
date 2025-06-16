import React from "react";
import { Button } from "@/shared/ui/kit/button"; // Предполагается наличие компонента Button
import { Input } from "@/shared/ui/kit/input"; // Предполагается наличие компонента Input
import { Checkbox } from "@/shared/ui/kit/checkbox"; // Предполагается наличие компонента Checkbox
import { Label } from "@/shared/ui/kit/label"; // Предполагается наличие компонента Label

// Пример данных для фильтров (в реальном приложении они могут приходить с бэкенда)
const shoeCategories = [
  { id: "men", label: "Мужская обувь" },
  { id: "women", label: "Женская обувь" },
  { id: "kids", label: "Детская обувь" },
  { id: "accessories", label: "Аксессуары и уход" },
];

const brandOptions = [
  { id: "addidas", label: "addidas" },
  { id: "fila", label: "Fila" },
  { id: "nike", label: "Nike" },
  { id: "reebok", label: "Reebok" },
  { id: "puma", label: "Puma" },
];

interface ProductFiltersUIProps {
  // TODO: Пропсы для управления состоянием фильтров
  // Например, значения фильтров и функции для их изменения
}

export function ProductFiltersUI({}: ProductFiltersUIProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Обувь</h3>
        <div className="space-y-2">
          {shoeCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={`cat-${category.id}`} />
              <Label htmlFor={`cat-${category.id}`}>{category.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div>
        <h3 className="text-lg font-semibold mb-2">Цена от и до:</h3>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="0"
            defaultValue="0"
            className="w-full"
          />
          <span className="text-gray-500">-</span>
          <Input
            type="number"
            placeholder="1000"
            defaultValue="1000"
            className="w-full"
          />
        </div>
      </div>

      <hr />

      <div>
        <h3 className="text-lg font-semibold mb-2">Бренды</h3>
        <div className="space-y-2">
          {brandOptions.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox id={`brand-${brand.id}`} />
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
