import { Button } from '@/shared/ui/kit/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Separator } from '@/shared/ui/kit/separator';
import { Check, X } from 'lucide-react';
import { PendingUserRequest } from '../model/types';

interface RequestCardProps {
  request: PendingUserRequest;
  onApprove: (request: PendingUserRequest) => void;
  onReject: (id: string) => void;
  isProcessing: boolean;
}

export function RequestCard({ request, onApprove, onReject, isProcessing }: RequestCardProps) {
  return (
    <Card className="gap-2 border-primary border-l-4 py-3 shadow-sm">
      <CardHeader className="px-4 pb-2">
        <CardTitle className="font-semibold text-sm">Заявка от: {request.email}</CardTitle>
        <p className="text-muted-foreground text-xs">Дата: {request.date}</p>
      </CardHeader>
      <CardContent className="space-y-1 px-4 pb-4 text-xs ">
        <p>
          <span className="font-medium">Запрашиваемая роль:</span> {request.requestedRole}
        </p>
        <p>
          <span className="font-medium">Организация:</span> {request.organizationName}
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex gap-2 px-4 py-3">
        <Button
          size="small"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => onApprove(request)}
          disabled={isProcessing}
        >
          <Check className="mr-1.5 h-4 w-4" /> Одобрить
        </Button>
        <Button
          size="small"
          variant="destructive"
          onClick={() => onReject(request.id)}
          disabled={isProcessing}
        >
          <X className="mr-1.5 h-4 w-4" /> Отклонить
        </Button>
      </CardFooter>
    </Card>
  );
}
