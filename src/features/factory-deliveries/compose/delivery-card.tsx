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
  // Улучшенная логика цвета, как на макете
  const stockColor =
    item.stockCount > 5
      ? 'text-green-600'
      : item.stockCount > 2
        ? 'text-orange-500' // Оранжевый для среднего количества
        : 'text-red-600'; // Красный для низкого

  const isUrgent = variant === 'urgent';

  return (
    <Card
      className={cn(
        'flex flex-col justify-between', // flex-col для растягивания кнопки
        isUrgent && 'border-red-200 bg-red-50',
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle className={cn('font-semibold text-base', isUrgent && 'text-red-700')}>
          {isUrgent && <TriangleAlert className="mr-2 inline-block h-4 w-4" />}
          {item.productName}
        </CardTitle>
        <p className="pt-1 text-muted-foreground text-xs">
          Цвет: {item.color}, Размер: {item.size}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex items-center justify-between font-semibold text-sm">
          <p>Кол-во на общем складе:</p>
          <p className={cn(stockColor, 'font-bold')}>{item.stockCount} шт.</p>
        </div>
        {isUrgent && <p className="text-red-600/90 text-xs">Требуется срочное пополнение!</p>}
        <div className="flex-grow" /> {/* Заполнитель, чтобы кнопка была внизу */}
        <div className="space-y-1">
          <Label className="font-semibold text-muted-foreground text-xs">Отправить на склад (шт.):</Label>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 shrink-0"
              onClick={() => onAmountChange(item.deliveryAmount - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              className="h-9 w-full text-center" // Ширина на всю доступную
              value={item.deliveryAmount}
              onChange={(e) => onAmountChange(Number.parseInt(e.target.value, 10) || 0)}
            />
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 shrink-0"
              onClick={() => onAmountChange(item.deliveryAmount + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          className="mt-2 w-full"
          onClick={onFormDelivery}
          variant={isUrgent ? 'destructive' : 'default'}
        >
          <Send className="mr-2 h-4 w-4" />
          Сформировать поставку
        </Button>
      </CardContent>
    </Card>
  );
}
