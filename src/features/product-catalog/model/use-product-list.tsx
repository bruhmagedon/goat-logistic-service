import { RefCallback, useCallback, useMemo, useEffect, useState } from "react";
import { Product, ProductSortOption } from "./types";
import { ProductFilters } from "./use-product-filters";

interface UseProductListParams {
  limit?: number;
  filters?: Partial<ProductFilters>;
  sort?: ProductSortOption;
  searchQuery?: string;
}

// Ваши моковые данные (оставил без изменений)
const allMockProducts: Product[] = [
  // ... (Ваши существующие моковые продукты)
  // Пример одного продукта:
  {
    id: "1",
    name: "Кроссовки Nike Air Max 270",
    brand: "Nike",
    price: 12500, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    // description: "Современные кроссовки для активного образа жизни.", // Убрал, т.к. нет в Product interface
    category: "men",
    // rating: 4.5, // Убрал
    // reviewsCount: 120, // Убрал
  },
  {
    id: "2",
    name: "Ботинки Timberland Premium",
    brand: "Timberland",
    price: 19900, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hvZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    category: "men",
  },
  {
    id: "3",
    name: "Туфли-лодочки GUCCI",
    brand: "GUCCI",
    price: 56000, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    category: "women",
  },
  {
    id: "4",
    name: "Кеды Converse Chuck Taylor All Star",
    brand: "Converse",
    price: 6500, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    category: "unisex",
  },
  {
    id: "5",
    name: "Сандалии Birkenstock Arizona",
    brand: "Birkenstock",
    price: 8900, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1603487742131-4160ec900405?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNob2VzfGVufDB8fDB8fHww&w=1000&q=80",
    category: "unisex",
  },
  {
    id: "6",
    name: "Беговые кроссовки ASICS GEL-Kayano",
    brand: "ASICS",
    price: 14000, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNob2VzfGVufDB8fDB8fHww&w=1000&q=80",
    category: "unisex",
  },
  {
    id: "7",
    name: "Сапоги Dr. Martens 1460",
    brand: "Dr. Martens",
    price: 17500, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1608256249259-ac9b66801590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNob2VzfGVufDB8fDB8fHww&w=1000&q=80",
    category: "unisex",
  },
  {
    id: "8",
    name: "Слипоны Vans Classic",
    brand: "Vans",
    price: 5300, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    category: "unisex",
  },
  {
    id: "9",
    name: "Кроссовки New Balance 574",
    brand: "New Balance",
    price: 9800, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1491553691912-b22aaa2ca8ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNob2VzfGVufDB8fDB8fHww&w=1000&q=80",
    category: "unisex",
  },
  {
    id: "10",
    name: "Балетки Chanel",
    brand: "Chanel",
    price: 65000, // Изменено на number
    currency: "₽",
    imageUrl:
      "https://images.unsplash.com/photo-1572053515279-7cabc15993d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHNob2VzfGVufDB8fDB8fHww&w=1000&q=80",
    category: "women",
  },
];

export function useProductList({
  limit = 10,
  filters,
  sort = "bestMatch",
  searchQuery,
}: UseProductListParams) {
  const [isPendingGlobal, setIsPendingGlobal] = useState(true);
  const [isPendingNextPage, setIsPendingNextPage] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pages, setPages] = useState<Product[][]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const flatData = useMemo(() => pages.flat(), [pages]);

  const applyFiltersAndSort = useCallback(() => {
    let result = [...allMockProducts];

    if (searchQuery && searchQuery.trim() !== "") {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters) {
      if (filters.categories && filters.categories.length > 0) {
        result = result.filter(
          (product) =>
            product.category && filters.categories?.includes(product.category)
        );
      }
      if (filters.brands && filters.brands.length > 0) {
        result = result.filter(
          (product) => product.brand && filters.brands?.includes(product.brand)
        );
      }
      if (filters.priceFrom) {
        const priceFromNum = parseFloat(filters.priceFrom);
        if (!isNaN(priceFromNum)) {
          result = result.filter((product) => product.price >= priceFromNum);
        }
      }
      if (filters.priceTo) {
        const priceToNum = parseFloat(filters.priceTo);
        if (!isNaN(priceToNum)) {
          result = result.filter((product) => product.price <= priceToNum);
        }
      }
    }

    if (sort === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [filters, searchQuery, sort]);

  const loadPage = useCallback(
    (pageToLoad: number, isInitialLoad: boolean) => {
      if (isInitialLoad) {
        setIsPendingGlobal(true);
      } else {
        setIsPendingNextPage(true);
      }
      setError(null);

      setTimeout(() => {
        try {
          const processedProducts = applyFiltersAndSort();
          const newItems = processedProducts.slice(
            pageToLoad * limit,
            (pageToLoad + 1) * limit
          );

          if (isInitialLoad) {
            // Эта строка правильно заменит старые данные на новую первую страницу
            setPages([newItems]);
          } else {
            setPages((prev) => [...prev, newItems]);
          }

          setHasNextPage(processedProducts.length > (pageToLoad + 1) * limit);
          // Важно: currentPage обновляется здесь, после успешной загрузки
          setCurrentPage(pageToLoad + 1);
        } catch (e) {
          setError(e as Error);
        } finally {
          if (isInitialLoad) {
            setIsPendingGlobal(false);
          } else {
            setIsPendingNextPage(false);
          }
        }
      }, 700); // Имитация задержки API
    },
    [applyFiltersAndSort, limit] // Зависимости корректны, т.к. state setters стабильны
  );

  // Эффект для первоначальной загрузки или при изменении ключевых параметров
  useEffect(() => {
    // ❌ УБИРАЕМ `setPages([])` ОТСЮДА.
    // Это позволит избежать "моргания" и исчезновения товаров.
    // Вместо этого UI должен реагировать на `isPendingGlobal = true` и показывать лоадер.

    // Сбрасываем состояние пагинации и запускаем загрузку с нуля
    setCurrentPage(0);
    setHasNextPage(true); // Предполагаем, что данные могут быть
    loadPage(0, true);
  }, [limit, sort, filters, searchQuery, loadPage]); // `loadPage` добавлен, чтобы избежать stale closure

  const fetchNextPage = useCallback(() => {
    if (isPendingGlobal || isPendingNextPage || !hasNextPage) return;
    loadPage(currentPage, false);
  }, [isPendingGlobal, isPendingNextPage, hasNextPage, loadPage, currentPage]);

  const cursorRef: RefCallback<Element> = useCallback(
    (node) => {
      if (isPendingGlobal || isPendingNextPage || !hasNextPage || !node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1.0 }
      );

      observer.observe(node);

      return () => observer.disconnect();
    },
    [fetchNextPage, hasNextPage, isPendingGlobal, isPendingNextPage]
  );

  return {
    data: pages,
    flatData,
    isPending: isPendingGlobal,
    isPendingNext: isPendingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
    cursorRef,
  };
}
