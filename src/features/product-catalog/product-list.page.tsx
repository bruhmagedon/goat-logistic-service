// file: pages/products/product-list-page.tsx

import { useCallback, useState } from 'react';
import { ProductCard } from './compose/product-card';
import {
  ProductListLayout,
  ProductListLayoutContent,
  ProductListLayoutHeader,
} from './ui/product-list-layout';
import { ProductSidebar } from './ui/product-sidebar';

import { Input } from '@/shared/ui/kit/input';
import { ProductSortOption, ViewMode } from './model/types';
import { useProductFilters } from './model/use-product-filters';
import { useProductList } from './model/use-product-list';
import { ViewModeToggle } from './model/view-mode-toggle';
import { ProductSortSelect } from './ui/product-sort-select';

import { ProductItem } from '@/features/product-catalog/compose/product-item';
import { useDebounce } from '@/shared/lib/react/use-debounce';

function ProductListPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [sortOption, setSortOption] = useState<ProductSortOption>('bestMatch');
  const [searchQuery, setSearchQuery] = useState('');

  // Получаем все необходимое из хука фильтров
  // Деструктурируем явно, чтобы избежать ошибок с именами
  const { filters, handleCategoryChange, handleBrandChange, setPriceFrom, setPriceTo } = useProductFilters();

  // Применяем debounce к объекту фильтров и к поисковому запросу
  const debouncedFilters = useDebounce(filters, 500);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSortChange = useCallback((value: string) => {
    setSortOption(value as ProductSortOption);
  }, []);

  const handleViewModeChange = useCallback((value: ViewMode) => {
    setViewMode(value);
  }, []);

  const {
    flatData: products = [],
    isPending,
    isPendingNext,
    error, // Можно использовать для отображения ошибки
    hasNextPage,
    cursorRef,
  } = useProductList({
    limit: 10,
    filters: debouncedFilters,
    sort: sortOption,
    searchQuery: debouncedSearchQuery,
  });

  return (
    <ProductListLayout
      // ИСПРАВЛЕНО: Явно передаем каждую функцию под правильным именем пропа
      sidebar={
        <ProductSidebar
          filters={filters}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onPriceFromChange={setPriceFrom}
          onPriceToChange={setPriceTo}
        />
      }
      header={
        <ProductListLayoutHeader
          title="Товары"
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <Input
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
              <ProductSortSelect value={sortOption} onValueChange={handleSortChange} />
              <ViewModeToggle value={viewMode} onChange={handleViewModeChange} />
            </div>
          }
        />
      }
    >
      <ProductListLayoutContent
        isEmpty={!isPending && products.length === 0}
        isPending={isPending}
        isPendingNext={isPendingNext}
        cursorRef={cursorRef}
        hasCursor={hasNextPage}
        mode={viewMode}
        renderGrid={() => products.map((product) => <ProductCard key={product.id} product={product} />)}
        renderList={() => products.map((product) => <ProductItem key={product.id} product={product} />)}
      />
    </ProductListLayout>
  );
}

export const Component = ProductListPage;
