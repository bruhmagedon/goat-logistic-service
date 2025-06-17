import { cn } from '@/shared/lib/css';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/kit/alert-dialog';
import { Badge } from '@/shared/ui/kit/badge';
import { Button } from '@/shared/ui/kit/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown-menu';
import { Hourglass, Loader2, MoreVertical, PackageCheck, Pencil, Trash2, TriangleAlert } from 'lucide-react'; // Добавляем Loader2
import { FactoryProduct } from '../model/types';

interface FactoryProductCardProps {
  product: FactoryProduct;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean; // Добавляем новый пропс
  disabled?: boolean; // Добавляем новый пропс
}

const getStatusBadgeVariant = (status: FactoryProduct['status']) => {
  switch (status) {
    case 'На складе':
      return 'success'; // Изменено
    case 'На модерации':
      return 'moderation'; // Изменено
    case 'Нужна поставка':
      return 'warning'; // Изменено
    default:
      return 'default';
  }
};

const getStatusIcon = (status: FactoryProduct['status']) => {
  switch (status) {
    case 'На складе':
      return <PackageCheck className="size-5!" />;
    case 'На модерации':
      return <Hourglass className="size-5!" />;
    case 'Нужна поставка':
      return <TriangleAlert className="size-5!" />;
    default:
      return null;
  }
};

export function FactoryProductCard({
  product,
  onEdit,
  onDelete,
  isDeleting,
  disabled,
}: FactoryProductCardProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm',
        isDeleting && 'opacity-50 transition-opacity duration-300',
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-semibold text-card-foreground text-xl">{product.name}</h3>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={disabled}>
                {' '}
                {/* Отключаем кнопку, если disabled */}
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(product.id)} disabled={disabled}>
                {' '}
                {/* Отключаем кнопку, если disabled */}
                <Pencil className="mr-2 h-4 w-4" />
                Редактировать
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onSelect={(e) => e.preventDefault()}
                  disabled={disabled} // Отключаем кнопку, если disabled
                >
                  <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                  Удалить
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Вы уверены, что хотите удалить этот товар?</AlertDialogTitle>
              <AlertDialogDescription>
                Это действие нельзя отменить. Товар будет безвозвратно удален из вашего списка.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Отмена</AlertDialogCancel>{' '}
              {/* Отключаем кнопку, если идет удаление */}
              <AlertDialogAction onClick={() => onDelete(product.id)} disabled={isDeleting}>
                {' '}
                {/* Отключаем кнопку и показываем лоадер */}
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {/* Показываем лоадер */}
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Badge variant={getStatusBadgeVariant(product.status)} className="mb-3">
        {getStatusIcon(product.status)}
        {product.status}
      </Badge>

      <div className="mb-2">
        <span className="font-medium text-card-foreground">Цена: </span>
        <span>
          {product.price.toLocaleString('ru-RU')} {product.currency}
        </span>
      </div>

      <div className="mb-3">
        <span className="font-medium text-card-foreground">Материалы: </span>
        <span className="text-muted-foreground">{product.materials}</span>
      </div>

      <div className="h-full">
        <h4 className="mb-1.5 font-medium text-muted-foreground text-sm">ДОСТУПНЫЕ ВАРИАНТЫ:</h4>
        <div className=" space-y-1 rounded-md border border-border p-[5px] text-sm">
          {product.variants.map((variant, index) => (
            <div
              key={variant.id}
              className={cn(
                'grid grid-cols-[1fr_1fr_auto] items-center gap-x-4 p-[8px]',
                index % 2 === 1 && 'bg-[#fafafb]',
              )}
            >
              <span className="text-card-foreground">
                Цвет: <span className="font-medium">{variant.color}</span>
              </span>
              <span className="text-card-foreground">
                Размер: <span className="font-medium">{variant.size}</span>
              </span>
              <span className="text-right text-card-foreground">
                В наличии: <span className="font-medium">{variant.quantity} шт.</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-1">
        <span className="font-medium ">Категория: </span>
        <span className="text-muted-foreground">{product.category}</span>
      </div>
    </div>
  );
}
