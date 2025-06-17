import { cn } from '@/shared/lib/css';
import { Badge } from '@/shared/ui/kit/badge';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { Building2, FileText, MapPin, ShoppingBag, Trash2, Truck, User } from 'lucide-react';
import { SystemUser } from '../model/types';

interface UserCardProps {
  user: SystemUser;
  isDeleting: boolean;
  onDeleteRequest: (user: SystemUser) => void;
}

const roleConfig = {
  Поставщик: {
    color: 'bg-orange-100 text-black border-orange-200',
    icon: <Truck className="size-5!" />,
  },
  Потребитель: {
    color: 'bg-purple-100 text-black border-purple-200',
    icon: <ShoppingBag className="size-5!" />,
  },
};

export function UserCard({ user, isDeleting, onDeleteRequest }: UserCardProps) {
  const config = roleConfig[user.role];

  return (
    <Card className={cn('gap-2 py-3 transition-opacity', isDeleting && 'opacity-40')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="font-semibold text-base">{user.email}</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive/70 hover:text-destructive"
          onClick={() => onDeleteRequest(user)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 px-4 py-4 pt-0 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">Роль:</span>
          <Badge className={cn('h-7 font-medium text-sm', config.color)}>
            {config.icon}
            <span className="ml-1.5">{user.role}</span>
          </Badge>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <span className="font-medium text-foreground">Название организации:</span> {user.organizationName}
          </span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <span className="font-medium text-foreground">Адрес:</span> {user.address}
          </span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <FileText className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <span className="font-medium text-foreground">ИНН:</span> {user.inn}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
