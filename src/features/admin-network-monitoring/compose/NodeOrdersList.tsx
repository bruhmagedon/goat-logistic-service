import { mockOrders } from '@/features/orders/model/order-mocks'; // и моки
import { OrderListItem } from '@/features/orders/ui/order-list-item'; // Используем твой готовый компонент
import { Button } from '@/shared/ui/kit/button';
import { ScrollArea } from '@/shared/ui/kit/scroll-area';
import { ArrowLeft } from 'lucide-react';
import { useNetworkStore } from '../model/store';

export function NodeOrdersList() {
  const { selectedNode, setView } = useNetworkStore();

  if (!selectedNode) return null;

  return (
    <div className="h-full rounded-lg border bg-background p-4">
      <div className="mb-4 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => setView('graph')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="font-semibold text-lg">Заказы для: {selectedNode.data.label}</h3>
          <p className="text-muted-foreground text-sm">
            Отображается список последних транзакций для магазина.
          </p>
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-60px)]">
        <div className="space-y-3 pr-3">
          {mockOrders.map((order) => (
            <OrderListItem key={order.id} order={order} onSelect={() => {}} isSelected={false} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
