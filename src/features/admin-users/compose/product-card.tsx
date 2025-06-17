import { cn } from '@/shared/lib/css';
import { Badge } from '@/shared/ui/kit/badge';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Building2, PackageCheck, Tag, Trash2, TriangleAlert, Warehouse } from 'lucide-react';
import { SystemProduct } from '../model/types';

interface SystemProductCardProps {
  product: SystemProduct;
  isDeleting: boolean;
  onDeleteRequest: (product: SystemProduct) => void;
}

const statusConfig = {
  'На складе': {
    color: 'bg-green-100 text-black border-green-200',
    icon: <PackageCheck className="size-5!" />,
  },
  'Нужна поставка': {
    color: 'bg-orange-100 text-black border-orange-200',
    icon: <TriangleAlert className="size-5!" />,
  },
};

export function SystemProductCard({ product, isDeleting, onDeleteRequest }: SystemProductCardProps) {
  const config = statusConfig[product.status];

  return (
    <Card className={cn('gap-2 py-3 transition-opacity', isDeleting && 'opacity-40')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4">
        <CardTitle className="font-semibold text-base">{product.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive/70 hover:text-destructive"
          onClick={() => onDeleteRequest(product)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 px-4 py-4 pt-0 text-sm">
        <div className="flex items-start gap-2 text-muted-foreground">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <span className="font-medium text-foreground">Поставщик:</span> {product.supplier}
          </span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <Warehouse className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <span className="font-medium text-foreground">Категория:</span> {product.category}
          </span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <Tag className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <span className="font-medium text-foreground">Цена:</span> {product.price} {product.currency}
          </span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="font-medium text-foreground">Статус:</span>
          <Badge className={cn('h-7 font-medium text-sm', config.color)}>
            {config.icon}
            <span className="ml-1.5">{product.status}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
