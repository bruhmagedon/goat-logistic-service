import { Button } from "@/shared/ui/kit/button";
// import { ApiSchemas } from "@/shared/api/schema"; // Если Product определен там
import { Product } from "../model/types"; // или локальный тип

interface ProductCardProps {
  product: Product; // Используйте ApiSchemas["Product"] если доступно
}

export function ProductCard({ product }: ProductCardProps) {
  // Пример кнопки, состояние "В корзину" нужно будет реализовать
  const isInCart = false; // Это состояние должно управляться логикой корзины

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img
        src={product.imageUrl || "https://via.placeholder.com/300x200"} // Заглушка для изображения
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-xl font-bold mt-2">
          {product.price} {product.currency}
        </p>
        <Button
          className="w-full mt-4"
          variant={isInCart ? "outline" : "default"}
          // onClick={() => addToCart(product.id)} // TODO: Реализовать добавление в корзину
        >
          {isInCart ? "В корзину" : "Заказать"}
        </Button>
      </div>
    </div>
  );
}
