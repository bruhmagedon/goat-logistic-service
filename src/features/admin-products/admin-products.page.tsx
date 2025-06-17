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
import { RequestCard } from './compose/request-card';
import { UserCard } from './compose/user-card';
import { PendingUserRequest, SystemUser } from './model/types';
import { useUserManagementStore } from './model/user-management.store';

function UserManagementPage() {
  const { users, pendingRequests, approveRequest, rejectRequest, deleteUser } = useUserManagementStore();
  const [processingIds, setProcessingIds] = useState<string[]>([]);

  // 1. НОВОЕ СОСТОЯНИЕ: Хранит пользователя для удаления или null
  const [userToDelete, setUserToDelete] = useState<SystemUser | null>(null);

  // ... (handleApprove и handleReject без изменений)

  // 2. handleDelete теперь просто выполняет логику удаления
  const handleDelete = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    setProcessingIds((ids) => [...ids, userId]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    deleteUser(userId);
    toast.info('Пользователь удален', {
      description: `Аккаунт ${user?.email} был удален из системы.`,
    });
    setProcessingIds((ids) => ids.filter((id) => id !== userId));
  };

  const handleApprove = async (request: PendingUserRequest) => {
    setProcessingIds((ids) => [...ids, request.id]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    approveRequest(request);
    toast.success('Пользователь одобрен', {
      description: `Аккаунт для ${request.email} был успешно создан.`,
    });
    setProcessingIds((ids) => ids.filter((id) => id !== request.id));
  };

  const handleReject = async (requestId: string) => {
    const request = pendingRequests.find((r) => r.id === requestId);
    setProcessingIds((ids) => [...ids, requestId]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    rejectRequest(requestId);
    toast.error('Заявка отклонена', {
      description: `Заявка от ${request?.email} была отклонена.`,
    });
    setProcessingIds((ids) => ids.filter((id) => id !== requestId));
  };

  return (
    <>
      <div className="border-b pb-3">
        <h1 className="font-bold text-2xl text-foreground">Управление пользователями</h1>
      </div>
      <div className="flex flex-1 gap-8">
        <div className="w-[60%] pt-3 lg:col-span-2">
          <div className="space-y-1">
            <h2 className="font-semibold text-lg">Список пользователей системы</h2>
            <p className="text-muted-foreground text-sm">Всего пользователей: {users.length}</p>
          </div>
          <div className="mt-4 space-y-4">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isDeleting={processingIds.includes(user.id)}
                onDeleteRequest={() => setUserToDelete(user)}
              />
            ))}
          </div>
        </div>
        <div className="min-h-full w-[40%] border-l px-5 py-3">
          <div className="space-y-1">
            <h2 className="font-semibold text-lg">Модерация заявок на регистрацию</h2>
            <p className="text-muted-foreground text-sm">Ожидают модерации: {pendingRequests.length}</p>
          </div>
          <div className="mt-4 space-y-4">
            {pendingRequests.map((request) => (
              <RequestCard
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
      <AlertDialog open={!!userToDelete} onOpenChange={(isOpen) => !isOpen && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены, что хотите удалить пользователя?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя будет отменить. Аккаунт пользователя
              <span className="font-semibold text-foreground"> {userToDelete?.email} </span>
              будет навсегда удален из системы.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              className=" text-white"
              onClick={() => {
                if (userToDelete) {
                  handleDelete(userToDelete.id);
                }
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

export const Component = UserManagementPage;
