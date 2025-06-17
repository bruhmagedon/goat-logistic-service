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
import { Input } from "@/shared/ui/kit/input"; // Пример поля ввода

import { ProductItem } from "@/features/product-catalog/compose/product-item";
import { useDebounce } from "@/shared/lib/react/use-debounce";

function ProductListPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [sortOption, setSortOption] = useState<ProductSortOption>("bestMatch");
  const [searchQuery, setSearchQuery] = useState("");

  const productFilters = useProductFilters();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedFilters = useDebounce(productFilters.filters, 500);

  const {
    flatData: products = [], // Используем flatData для удобства
    isPending,
    isPendingNext,
    error,
    fetchNextPage,
    hasNextPage,
    cursorRef,
  } = useProductList({
    limit: 10, // или другое значение
    filters: debouncedFilters, // Передаем отдебаунсенные фильтры
    sort: sortOption,
    searchQuery: debouncedSearchQuery, // Передаем отдебаунсенный поисковый запрос
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
  // В JSX, где у вас заголовок списка товаров, можно добавить поле ввода для поиска:
  // <ProductListLayoutHeader
  //   title="Все товары"
  //   actions={
  //     <div className="flex items-center gap-2">
  //       <Input
  //         placeholder="Поиск по названию..."
  //         value={searchQuery}
  //         onChange={(e) => setSearchQuery(e.target.value)}
  //         className="w-64"
  //       />
  //       <ProductSortSelect value={sortOption} onValueChange={setSortOption} />
  //       <ViewModeToggle value={viewMode} onChange={setViewMode} />
  //     </div>
  //   }
  // />
}

// Для подключения к роутеру, если используется file-based routing
export const Component = ProductListPage;
export default ProductListPage;
