// file: features/product-catalog/ui/product-sidebar.tsx

import { ProductFiltersUI } from "./product-filters-ui";
import { useProductFilters } from "../model/use-product-filters";

// Тип пропсов для сайдбара будет таким же, как и для UI фильтров
type ProductSidebarProps = React.ComponentProps<typeof ProductFiltersUI>;

export function ProductSidebar(props: ProductSidebarProps) {
  return (
    <aside className="p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Фильтры</h2>
      <ProductFiltersUI {...props} />
    </aside>
  );
}
