import { Button } from "@/shared/ui/kit/button";
import { Product } from "../model/types";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  const isInCart = false; // Это состояние должно управляться логикой корзины

  return (
    <div className="flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200 ease-in-out hover:shadow-md cursor-pointer">
      <img
        src={product.imageUrl || "https://via.placeholder.com/100x100"} // Заглушка для изображения
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md mr-4"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.brand}</p>{" "}
        {/* Пример дополнительной информации */}
        <p className="text-lg font-bold mt-1">
          {product.price} {product.currency}
        </p>
      </div>
      <Button
        variant={isInCart ? "outline" : "default"}
        size="small"
        // onClick={() => addToCart(product.id)} // TODO: Реализовать добавление в корзину
      >
        {isInCart ? "В корзине" : "Заказать"}
      </Button>
    </div>
  );
}
