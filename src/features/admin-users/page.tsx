import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/kit/alert-dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { SystemProductCard } from './compose/product-card';
import { ProductRequestCard } from './compose/product-request-card';
import { useProductManagementStore } from './model/store';
import { PendingProductRequest, SystemProduct } from './model/types';

function ProductManagementPage() {
  const { products, pendingRequests, approveProductRequest, rejectProductRequest, deleteProduct } =
    useProductManagementStore();
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const [productToDelete, setProductToDelete] = useState<SystemProduct | null>(null);

  const handleApprove = async (request: PendingProductRequest) => {
    setProcessingIds((ids) => [...ids, request.id]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    approveProductRequest(request);
    toast.success('Товар одобрен', {
      description: `Товар "${request.name}" добавлен в систему.`,
    });
    setProcessingIds((ids) => ids.filter((id) => id !== request.id));
  };

  const handleReject = async (requestId: string) => {
    const request = pendingRequests.find((r) => r.id === requestId);
    setProcessingIds((ids) => [...ids, requestId]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    rejectProductRequest(requestId);
    toast.error('Заявка на товар отклонена', {
      description: `Заявка на "${request?.name}" была отклонена.`,
    });
    setProcessingIds((ids) => ids.filter((id) => id !== requestId));
  };

  const handleDelete = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setProcessingIds((ids) => [...ids, productId]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    deleteProduct(productId);
    toast.info('Товар удален', {
      description: `Товар "${product?.name}" был удален из системы.`,
    });
    setProcessingIds((ids) => ids.filter((id) => id !== productId));
  };

  const lowStockCount = products.filter((p) => p.status === 'Нужна поставка').length;

  return (
    <>
      <div className="border-b pb-3">
        <h1 className="font-bold text-2xl text-foreground">Управление товарами</h1>
      </div>
      <div className="flex flex-1 gap-8">
        <div className="w-[60%] pt-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="font-semibold text-lg">Список товаров в системе</h2>
              <p className="text-muted-foreground text-sm">Список товаров: {products.length}</p>
            </div>
            <p className="font-medium text-sm">Товаров с низким остатком: {lowStockCount}</p>
          </div>
          <div className="mt-4 space-y-4">
            {products.map((product) => (
              <SystemProductCard
                key={product.id}
                product={product}
                isDeleting={processingIds.includes(product.id)}
                onDeleteRequest={() => setProductToDelete(product)}
              />
            ))}
          </div>
        </div>
        <div className="min-h-full w-[40%] border-l px-5 py-3">
          <div className="space-y-1">
            <h2 className="font-semibold text-lg">Модерация заявок на товары</h2>
            <p className="text-muted-foreground text-sm">Ожидают модерации: {pendingRequests.length}</p>
          </div>
          <div className="mt-4 space-y-4">
            {pendingRequests.map((request) => (
              <ProductRequestCard
                key={request.id}
                request={request}
                onApprove={handleApprove}
                onReject={handleReject}
                isProcessing={processingIds.length > 0}
              />
            ))}
          </div>
        </div>
      </div>
      <AlertDialog open={!!productToDelete} onOpenChange={(isOpen) => !isOpen && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены, что хотите удалить товар?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя будет отменить. Товар{' '}
              <span className="font-semibold text-foreground">"{productToDelete?.name}"</span> будет навсегда
              удален из системы.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              className=" text-white"
              onClick={() => {
                if (productToDelete) handleDelete(productToDelete.id);
              }}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export const Component = ProductManagementPage;
