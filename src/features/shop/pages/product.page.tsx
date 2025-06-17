import { useParams } from "react-router-dom";
import { ProductDetailCard } from "@/features/product-catalog/compose/product-detail-card";
import { Product } from "@/features/product-catalog/model/types";
import { allMockProducts } from "@/features/product-catalog/model/use-product-list"; // + Импортируем allMockProducts

// Пример расширенного типа Product, если необходимо (должен совпадать с тем, что в ProductDetailCard)
interface ProductDetail extends Product {
  description?: string;
  weight?: string;
  manufacturer?: string;
  variants?: Array<{
    id: string;
    color: string;
    size: string | number;
    stock: number;
  }>;
  characteristics?: Array<{
    name: string;
    value: string; // Это поле было value, в ProductDetailCard используется color
    size?: string | number;
    // color?: string; // Возможно, здесь должно быть color, если таблица характеристик его использует
  }>;
}

// - Удаляем локальные mockProducts
// const mockProducts: ProductDetail[] = [
// ...
// ];

function ProductPage() {
  const { productId } = useParams<{ productId: string }>();

  // Находим товар по productId из импортированных allMockProducts
  // Приводим тип к ProductDetail, т.к. ProductDetailCard его ожидает.
  // ProductDetailCard уже имеет запасные моки для variants и characteristics.
  const product = allMockProducts.find((p) => p.id === productId) as
    | ProductDetail
    | undefined;

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">Товар не найден.</div>
    );
  }

  return (
    <div className=" min-h-screen w-full">
      <ProductDetailCard product={product} />
    </div>
  );
}

export const Component = ProductPage;
