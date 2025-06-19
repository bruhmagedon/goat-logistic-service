import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { TriangleAlert } from 'lucide-react';
import { DeliveryCard } from './compose/delivery-card';
import { useDeliveryStore } from './model/store';

// Пороговое значение для срочной поставки остается тем же
const URGENT_THRESHOLD = 2;

export function DeliveriesPage() {
  const { items, updateDeliveryAmount, formDelivery } = useDeliveryStore();

  // ИЗМЕНЕНИЕ ЗДЕСЬ:
  // urgentItems по-прежнему фильтруется, чтобы показать только проблемные товары.
  const urgentItems = items.filter((item) => item.stockCount <= URGENT_THRESHOLD);
  // regularItems больше не фильтруется! Теперь это просто `items`, чтобы отобразить ВСЕ товары.
  const allItemsToDisplay = items;

  return (
    <div className="w-full bg-background p-6">
      <h1 className="mb-8 font-bold text-3xl text-foreground">Управление поставками</h1>

      <div className="flex gap-8">
        {/* Левая колонка теперь отображает ВСЕ товары */}
        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
          {allItemsToDisplay.map((item) => (
            <DeliveryCard
              key={item.variantId}
              item={item}
              onAmountChange={(amount) => updateDeliveryAmount(item.variantId, amount)}
              onFormDelivery={() => formDelivery(item.variantId)}
            />
          ))}
        </div>

        {/* Правая колонка, как и раньше, показывает только срочные */}
        <div className="lg:sticky lg:top-24 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 text-xl">
                <TriangleAlert className="h-5 w-5" />
                Требуется срочная поставка
              </CardTitle>
              <p className="pt-1 text-muted-foreground text-sm">
                Товары, количество которых на общем складе достигло критически низкого уровня.
              </p>
            </CardHeader>
            <CardContent className="max-h-[66vh] space-y-4 overflow-y-auto pr-3">
              {urgentItems.length > 0 ? (
                urgentItems.map((item) => (
                  <DeliveryCard
                    key={item.variantId}
                    item={item}
                    variant="urgent"
                    onAmountChange={(amount) => updateDeliveryAmount(item.variantId, amount)}
                    onFormDelivery={() => formDelivery(item.variantId)}
                  />
                ))
              ) : (
                <p className="px-6 pb-4 text-muted-foreground text-sm">
                  Нет товаров, требующих срочной поставки.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Если у тебя настроен экспорт по умолчанию
export const Component = DeliveriesPage;
