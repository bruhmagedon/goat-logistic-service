import { Card, CardContent, CardHeader } from '@/shared/ui/kit/card';
import { Skeleton } from '@/shared/ui/kit/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        {/* Имитируем заголовок и статус */}
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Имитируем несколько строк с информацией */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-10 w-full" /> {/* Имитируем кнопку */}
      </CardContent>
    </Card>
  );
}
