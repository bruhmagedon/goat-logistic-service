import { useState } from 'react';
import { FactoryProductCard } from './compose/factory-product-card';
import { FactoryProduct } from './model/types';

// Временные моковые данные, соответствующие скриншоту
const INITIAL_MOCK_FACTORY_PRODUCTS: FactoryProduct[] = [
  {
    id: 'nike-pegasus-37',
    name: 'Кроссовки Nike Air Zoom Pegasus 37',
    status: 'На складе',
    price: 8990,
    currency: 'Р',
    materials: 'Нейлон, Кожа, Синтетическая ткань, Резина',
    variants: [
      { id: 'v1', color: 'Серый', size: 42, quantity: 15 },
      { id: 'v2', color: 'Серый', size: 43, quantity: 10 },
      { id: 'v3', color: 'Зеленый', size: 41, quantity: 20 },
    ],
    category: 'Мужская обувь',
  },
  {
    id: 'adidas-ultraboost-21',
    name: 'Кроссовки Adidas Ultraboost 21',
    status: 'На модерации',
    price: 11990,
    currency: 'Р',
    materials: 'Текстиль Primeknit, Резина Continental',
    variants: [
      { id: 'v4', color: 'Белый/Красный', size: 42.5, quantity: 0 },
      { id: 'v5', color: 'Черный/Зеленый', size: 44, quantity: 0 },
    ],
    category: 'Мужская обувь',
  },
  {
    id: 'puma-rs-x3',
    name: 'Кроссовки Puma RS-X3',
    status: 'Нужна поставка',
    price: 7490,
    currency: 'Р',
    materials: 'Текстиль, Резина',
    variants: [
      { id: 'v6', color: 'Зеленый', size: 43, quantity: 6 },
      { id: 'v7', color: 'Красный', size: 42, quantity: 2 },
      { id: 'v8', color: 'Красный', size: 43, quantity: 10 },
      { id: 'v9', color: 'Черный', size: 41, quantity: 0 },
    ],
    category: 'Мужская обувь',
  },
  {
    id: 'asics-gel-kayano-27',
    name: 'Кроссовки Asics Gel-Kayano 27',
    status: 'На складе',
    price: 13990,
    currency: 'Р',
    materials: 'Сетчатый верх, Гелевые вставки, Резина AHAR+',
    variants: [
      { id: 'v10', color: 'Серебристый/Синий', size: 41, quantity: 7 },
      { id: 'v11', color: 'Черный/Лайм', size: 43.5, quantity: 8 },
      { id: 'v12', color: 'Синий', size: 41, quantity: 1 },
    ],
    category: 'Женская обувь', // Исправлено на "Женская обувь" согласно скриншоту
  },
];

function FactoryProductListPage() {
  const [products, setProducts] = useState<FactoryProduct[]>(INITIAL_MOCK_FACTORY_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false); // Новое состояние для отслеживания загрузки
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null); // Новое состояние для id удаляемого продукта

  const handleEdit = (id: string) => {
    console.log('Edit product:', id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true); // Устанавливаем состояние загрузки в true
    setDeletingProductId(id); // Устанавливаем id удаляемого продукта

    // Имитация асинхронной операции (например, запроса к API)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Задержка в 1 секунду

    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    setIsLoading(false); // Сбрасываем состояние загрузки
    setDeletingProductId(null); // Сбрасываем id удаляемого продукта
  };

  return (
    <div className="min-h-screen w-full bg-background p-6">
      <h1 className="mb-8 font-bold text-3xl text-foreground">Мои товары</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {products.map((product) => (
          <FactoryProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
            // Передаем состояния загрузки в FactoryProductCard
            isDeleting={isLoading && deletingProductId === product.id}
            disabled={isLoading} // Отключаем все кнопки, пока идет удаление
          />
        ))}
      </div>
    </div>
  );
}

export const Component = FactoryProductListPage;
