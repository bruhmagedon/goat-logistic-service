import { RefCallback, useCallback, useMemo, useEffect, useState } from "react";
import { Product, ProductSortOption } from "./types";
import { ProductFilters } from "./use-product-filters";

interface UseProductListParams {
  limit?: number;
  filters?: Partial<ProductFilters>;
  sort?: ProductSortOption;
  searchQuery?: string;
}

const imageUrls = [
  "https://i.imgur.com/gSmC47V.png",
  "https://i.imgur.com/2RtisSR.png",
  "https://i.imgur.com/7T0ok4Q.png",
  "https://i.imgur.com/AibLnbD.png",
  "https://i.imgur.com/TtizaYP.png",
  "https://i.imgur.com/vcbwD33.png",
  "https://i.imgur.com/aSuwtH5.png",
  "https://i.imgur.com/oa9Q3ak.png",
  "https://i.imgur.com/o56b9K1.png",
  "https://i.imgur.com/azy7jdR.png",
  "https://i.imgur.com/lvs5Plq.png",
  "https://i.imgur.com/5NEhxxk.png",
  "https://i.imgur.com/4AopSLq.png",
  "https://i.imgur.com/uquPx9w.png",
  "https://i.imgur.com/ILCDYM1.png",
  "https://i.imgur.com/7AnuW0C.png",
  "https://i.imgur.com/AfQO3U7.png",
  "https://i.imgur.com/EIsruG1.png",
  "https://i.imgur.com/Rltsa8x.png",
  "https://i.imgur.com/XrvaA9u.png",
  "https://i.imgur.com/bwQ9cCZ.png",
  "https://i.imgur.com/95K3VBc.png",
  "https://i.imgur.com/3JcHVOb.png",
  "https://i.imgur.com/yYZQoAo.png",
  "https://i.imgur.com/xxCrARN.png",
  "https://i.imgur.com/wISVdus.png",
  "https://i.imgur.com/JiSu0RF.png",
  "https://i.imgur.com/5caN6Ir.png",
  "https://i.imgur.com/xer3tUH.png",
  "https://i.imgur.com/kPZTQsJ.png",
  "https://i.imgur.com/86vhU4S.png",
  "https://i.imgur.com/8MAXv3V.png",
  "https://i.imgur.com/pQEAvqF.png",
  "https://i.imgur.com/rKoFlj4.png",
  "https://i.imgur.com/zIv4yYe.png",
  "https://i.imgur.com/45KginK.png",
  "https://i.imgur.com/qHp8fvQ.png",
  "https://i.imgur.com/tQgDqot.png",
  "https://i.imgur.com/zzuYI3R.png",
  "https://i.imgur.com/eo13YUT.png",
  "https://i.imgur.com/FjVOkQ0.png",
  "https://i.imgur.com/YrzUzZ3.png",
  "https://i.imgur.com/5AbcEuo.png",
  "https://i.imgur.com/AESFoUB.png",
];

const allMockProducts: Product[] = imageUrls.map((url, index) => {
  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "Asics",
    "New Balance",
    "Converse",
    "Vans",
    "Timberland",
    "GUCCI",
    "Birkenstock",
    "Dr. Martens",
    "Chanel",
  ];
  const categories = ["men", "women", "unisex"];
  const productNames = [
    "Кроссовки",
    "Ботинки",
    "Туфли",
    "Кеды",
    "Сандалии",
    "Сапоги",
    "Слипоны",
    "Балетки",
    "Спортивные тапки",
    "Шлепанцы",
    "Мокасины",
    "Эспадрильи",
    "Лоферы",
    "Оксфорды",
    "Дерби",
  ];

  return {
    id: (index + 1).toString(),
    name: `${productNames[index % productNames.length]} ${
      brands[index % brands.length]
    } Model ${index + 1}`,
    brand: brands[index % brands.length],
    price: Math.floor(Math.random() * (70000 - 3000 + 1)) + 3000, // Random price between 3000 and 70000
    currency: "₽",
    imageUrl: url,
    category: categories[index % categories.length],
  };
});

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
          console.log("Processed products in loadPage:", processedProducts); // <--- ДОБАВЬТЕ ЭТО
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
