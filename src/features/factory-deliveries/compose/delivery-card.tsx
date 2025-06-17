import { cn } from '@/shared/lib/css';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Input } from '@/shared/ui/kit/input';
import { Label } from '@/shared/ui/kit/label';
import { Minus, Plus, Send, TriangleAlert } from 'lucide-react';
import { DeliveryItem } from '../model/types';

interface DeliveryCardProps {
  item: DeliveryItem;
  variant?: 'default' | 'urgent';
  onAmountChange: (newAmount: number) => void;
  onFormDelivery: () => void;
}

export function DeliveryCard({
  item,
  variant = 'default',
  onAmountChange,
  onFormDelivery,
}: DeliveryCardProps) {
  const stockColor =
    item.stockCount > 5 ? 'text-green-600' : item.stockCount > 0 ? 'text-yellow-600' : 'text-destructive';

  const isUrgent = variant === 'urgent';

  return (
    <Card className={cn(isUrgent && 'border border-destructive/20 bg-[#FEF2F2]')}>
      <CardHeader>
        <CardTitle className={cn('text-base', isUrgent && 'text-destructive/90')}>
          {isUrgent && <TriangleAlert className="mr-2 inline-block h-4 w-4" />}
          {item.productName}
        </CardTitle>
        <p className="text-muted-foreground text-xs">
          Цвет: {item.color}, Размер: {item.size}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between font-semibold text-sm">
          <p>Кол-во на общем складе:</p>
          <p className={cn(stockColor, 'font-bold')}>{item.stockCount} шт.</p>
        </div>

        {isUrgent && item.stockCount <= 2 && (
          <p className="text-destructive/80 text-xs">Требуется срочное пополнение!</p>
        )}

        <div className={cn('flex flex-col gap-5', isUrgent && 'flex-row items-end')}>
          <div>
            <Label className="font-semibold text-xs">Отправить на склад (шт.):</Label>
            <div className="mt-1 flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9"
                onClick={() => onAmountChange(item.deliveryAmount - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                className="h-9 w-16 text-center"
                value={item.deliveryAmount}
                onChange={(e) => onAmountChange(Number.parseInt(e.target.value, 10) || 0)}
              />
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9"
                onClick={() => onAmountChange(item.deliveryAmount + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button className="w-full" onClick={onFormDelivery} variant={isUrgent ? 'destructive' : 'default'}>
            <Send className="mr-2 h-4 w-4" />
            Сформировать поставку
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
