import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select"; // Предполагается наличие компонентов Select
import { ProductSortOption } from "../model/types";

interface ProductSortSelectProps {
  value: ProductSortOption;
  onValueChange: (value: ProductSortOption) => void;
}

export function ProductSortSelect({
  value,
  onValueChange,
}: ProductSortSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id="sort-products" className="w-[180px]">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bestMatch">Лучшее совпадение</SelectItem>
        <SelectItem value="priceAsc">Цена: по возрастанию</SelectItem>
        <SelectItem value="priceDesc">Цена: по убыванию</SelectItem>
        <SelectItem value="name">По имени (А-Я)</SelectItem>
      </SelectContent>
    </Select>
  );
}
