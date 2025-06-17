import { Button } from "@/shared/ui/kit/button";
// import { ApiSchemas } from "@/shared/api/schema"; // Если Product определен там
import { Product } from "../model/types"; // или локальный тип
import { useNavigate } from "react-router-dom"; // + Импортируем useNavigate
import { ROUTES } from "@/shared/model/routes"; // + Импортируем ROUTES

interface ProductCardProps {
  product: Product; // Используйте ApiSchemas["Product"] если доступно
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate(); // + Получаем функцию navigate
  // Пример кнопки, состояние "В корзину" нужно будет реализовать
  const isInCart = false; // Это состояние должно управляться логикой корзины

  const handleCardClick = () => {
    navigate(ROUTES.PRODUCT_DETAIL.replace(":productId", product.id)); // + Обработчик клика для перехода
  };

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-lg p-3.5 w-72 
                    transition-all duration-300 ease-in-out 
                    hover:shadow-xl hover:scale-105 hover:cursor-pointer"
      onClick={handleCardClick} // + Добавляем обработчик onClick
    >
      <img
        src={product.imageUrl || "https://via.placeholder.com/300x200"} // Заглушка для изображения
        alt={product.name}
        className="w-full object-cover rounded-md"
      />
      <div className="pt-4">
        <h3
          className="text-lg font-semibold h-15 truncate text-wrap"
          title={product.name}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xl font-bold">
            {product.price} {product.currency}
          </p>
          <Button
            className="h-8 p-3 text-[16px] hover:cursor-pointer"
            variant={isInCart ? "outline" : "default"}
            // onClick={() => addToCart(product.id)} // TODO: Реализовать добавление в корзину
          >
            {isInCart ? "В корзину" : "Заказать"}
          </Button>
        </div>
      </div>
    </div>
  );
}
