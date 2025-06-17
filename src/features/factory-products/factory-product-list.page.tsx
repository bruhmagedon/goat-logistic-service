import { useState } from 'react';
import { FactoryProductCard } from './compose/factory-product-card';
import { useProductStore } from './model/product-store';

function FactoryProductListPage() {
  const { products, addProduct } = useProductStore();
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

    useProductStore.setState((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
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
