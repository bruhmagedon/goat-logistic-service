import { useState } from "react";
import { ProductSidebar } from "./ui/product-sidebar";
import {
  ProductListLayout,
  ProductListLayoutHeader,
  ProductListLayoutContent,
} from "./ui/product-list-layout";
import { ProductCard } from "./compose/product-card";

import { useProductList } from "./model/use-product-list";
import { useProductFilters } from "./model/use-product-filters";
import { ProductSortSelect } from "./ui/product-sort-select";
import { ViewModeToggle } from "./model/view-mode-toggle";
import { ProductSortOption, ViewMode } from "./model/types";
import { useDebounce } from "@/shared/lib/react/use-debounce";
import { ProductItem } from "@/features/product-catalog/compose/product-item";
// Предполагается наличие useDebounce

function ProductListPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [sortOption, setSortOption] = useState<ProductSortOption>("bestMatch");

  const productFilters = useProductFilters();
  // Пример использования debounce для фильтров, если они будут влиять на запрос
  const debouncedFilters = useDebounce(productFilters.filters, 500);

  const { products, cursorRef, isPending, isFetchingNextPage, hasNextPage } =
    useProductList({
      sort: sortOption,
      filters: debouncedFilters, // Передаем фильтры в хук загрузки
      limit: 8, // Количество товаров на странице/загрузке
    });

  return (
    <ProductListLayout
      sidebar={<ProductSidebar /* TODO: передать пропсы для фильтров */ />}
      header={
        <ProductListLayoutHeader
          title="Товары"
          actions={
            <>
              <ProductSortSelect
                value={sortOption}
                onValueChange={(value) =>
                  setSortOption(value as ProductSortOption)
                }
              />
              <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </>
          }
        />
      }
    >
      <ProductListLayoutContent
        isEmpty={!isPending && products.length === 0}
        isPending={isPending}
        isPendingNext={isFetchingNextPage}
        cursorRef={cursorRef}
        hasCursor={hasNextPage}
        mode={viewMode}
        renderGrid={() =>
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
        renderList={() =>
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        }
      />
    </ProductListLayout>
  );
}

// Для подключения к роутеру, если используется file-based routing
export const Component = ProductListPage;
