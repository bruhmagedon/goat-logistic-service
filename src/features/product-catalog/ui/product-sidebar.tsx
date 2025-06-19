// file: features/product-catalog/ui/product-sidebar.tsx

import { ProductFiltersUI } from './product-filters-ui';

// Тип пропсов для сайдбара будет таким же, как и для UI фильтров
type ProductSidebarProps = React.ComponentProps<typeof ProductFiltersUI>;

export function ProductSidebar(props: ProductSidebarProps) {
  return (
    <aside className="min-h-full w-[var(--filters-width)] border-border border-r px-6 py-4">
      <h2 className="mb-4 font-bold text-xl">Фильтры</h2>
      <ProductFiltersUI {...props} />
    </aside>
  );
}
