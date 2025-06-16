import React from "react";
import { ProductFiltersUI } from "./product-filters-ui";

export function ProductSidebar() {
  return (
    <aside className="w-64 p-4 border-r flex-shrink-0">
      <h2 className="text-xl font-bold mb-4">Фильтрация</h2>
      <ProductFiltersUI />
    </aside>
  );
}
