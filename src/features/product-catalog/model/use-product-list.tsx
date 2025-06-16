import { RefCallback, useCallback } from "react";
// import { ApiSchemas } from "@/shared/api/schema";
import { Product, ProductSortOption } from "./types";
import { ProductFilters } from "./use-product-filters";

interface UseProductListParams {
  limit?: number;
  filters?: Partial<ProductFilters>; // Фильтры с useProductFilters
  sort?: ProductSortOption;
}

// Пример данных (замените на реальный запрос)
const MOCK_PRODUCTS: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `Кроссовки Модель ${i + 1} Супер ${
    [
      "Nike Air Zoom Pegasus 37",
      "Adidas Ultraboost 21",
      "Puma RS-X3",
      "Reebok Nano X1",
      "Asics Gel-Kayano 27",
      "Nike Air Max 270",
      "Adidas Yeezy Boost 350 V2",
      "New Balance 990v5",
    ][i % 8]
  }`,
  imageUrl: `https://source.unsplash.com/random/300x200?shoes&sig=${i}`, // Случайные изображения для примера
  price: Math.floor(Math.random() * 15000) + 5000,
  currency: "P",
  brand: ["Nike", "Adidas", "Puma", "Reebok", "Asics"][i % 5],
}));

export function useProductList({}: UseProductListParams) {
  // ЗАГЛУШКА: Используем mock-данные. Замените на реальный запрос с rqClient.
  // const { fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage } =
  //   rqClient.useInfiniteQuery(
  //     "get",
  //     "/products", // Ваш эндпоинт для товаров
  //     {
  //       params: {
  //         query: {
  //           page: 1,
  //           limit,
  //           sort,
  //           ...filters, // Передаем фильтры
  //         },
  //       },
  //     },
  //     {
  //       initialPageParam: 1,
  //       pageParamName: "page",
  //       placeholderData: keepPreviousData,
  //       getNextPageParam: (lastPage, _, lastPageParams) =>
  //         Number(lastPageParams) < lastPage.totalPages
  //           ? Number(lastPageParams) + 1
  //           : null,
  //     },
  //   );

  // const products = data?.pages.flatMap((page) => page.list) ?? [];

  // Временная заглушка для данных и пагинации
  const products = MOCK_PRODUCTS;
  const isPending = false;
  const isFetchingNextPage = false;
  const hasNextPage = true; // Предположим, что есть еще страницы
  const fetchNextPage = () => console.log("Fetching next page...");

  const cursorRef: RefCallback<HTMLDivElement> = useCallback(
    (el) => {
      if (!el || !hasNextPage || isFetchingNextPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  return {
    products,
    cursorRef,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    // fetchNextPage // если нужно вызывать вручную
  };
}
