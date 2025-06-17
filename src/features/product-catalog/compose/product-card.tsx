import { ROUTES } from '@/shared/model/routes'; // + Импортируем ROUTES
import { Button } from '@/shared/ui/kit/button';
import { useNavigate } from 'react-router-dom'; // + Импортируем useNavigate
// import { ApiSchemas } from "@/shared/api/schema"; // Если Product определен там
import { Product } from '../model/types'; // или локальный тип

interface ProductCardProps {
  product: Product; // Используйте ApiSchemas["Product"] если доступно
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate(); // + Получаем функцию navigate
  // Пример кнопки, состояние "В корзину" нужно будет реализовать
  const isInCart = false; // Это состояние должно управляться логикой корзины

  const handleCardClick = () => {
    navigate(ROUTES.PRODUCT_DETAIL.replace(':productId', product.id)); // + Обработчик клика для перехода
  };

  return (
    <div
      className="w-60 overflow-hidden rounded-lg border p-3.5 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-xl"
      onClick={handleCardClick} // + Добавляем обработчик onClick
    >
      <img
        src={product.imageUrl || 'https://via.placeholder.com/300x200'} // Заглушка для изображения
        alt={product.name}
        className="w-full rounded-md object-cover"
      />
      <div className="pt-4">
        <h3 className="h-15 truncate text-wrap font-semibold text-lg" title={product.name}>
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-bold text-xl">
            {product.price} {product.currency}
          </p>
          <Button
            className="h-8 p-3 text-[16px] hover:cursor-pointer"
            variant={isInCart ? 'outline' : 'default'}
            // onClick={() => addToCart(product.id)} // TODO: Реализовать добавление в корзину
          >
            {isInCart ? 'В корзину' : 'Заказать'}
          </Button>
        </div>
      </div>
    </div>
  );
}
