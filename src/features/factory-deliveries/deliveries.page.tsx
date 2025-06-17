import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { TriangleAlert } from 'lucide-react';
import { DeliveryCard } from './compose/delivery-card';
import { useDeliveryStore } from './model/store';

// Пороговое значение для срочной поставки
const URGENT_THRESHOLD = 2;

function DeliveriesPage() {
  const { items, updateDeliveryAmount, formDelivery } = useDeliveryStore();

  const urgentItems = items.filter((item) => item.stockCount <= URGENT_THRESHOLD);
  const regularItems = items.filter((item) => item.stockCount > URGENT_THRESHOLD);

  return (
    <div className="w-full bg-background p-6">
      <h1 className="mb-8 font-bold text-3xl text-foreground">Управление поставками</h1>

      {/* --- ИЗМЕНЕНА СТРУКТURA СЕТКИ --- */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        {/* Левая колонка с обычными товарами */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
          {regularItems.map((item) => (
            <DeliveryCard
              key={item.variantId}
              item={item}
              onAmountChange={(amount) => updateDeliveryAmount(item.variantId, amount)}
              onFormDelivery={() => formDelivery(item.variantId)}
            />
          ))}
        </div>

        {/* Правая колонка со срочными поставками (сделана "липкой") */}
        <div className="lg:sticky lg:top-24 lg:col-span-1">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 text-xl">
                <TriangleAlert className="h-5 w-5" />
                Требуется срочная поставка
              </CardTitle>
              <p className="pt-1 text-muted-foreground text-sm">
                Товары, количество которых на общем складе достигло критически низкого уровня.
              </p>
            </CardHeader>
            {/* --- ИЗМЕНЕНИЕ: Добавлен скролл --- */}
            <CardContent className="max-h-[60vh] space-y-4 overflow-y-auto pr-3">
              {urgentItems.map((item) => (
                <DeliveryCard
                  key={item.variantId}
                  item={item}
                  variant="urgent"
                  onAmountChange={(amount) => updateDeliveryAmount(item.variantId, amount)}
                  onFormDelivery={() => formDelivery(item.variantId)}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const Component = DeliveriesPage;
