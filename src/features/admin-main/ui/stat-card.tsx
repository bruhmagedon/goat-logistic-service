import { cn } from '@/shared/lib/css';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: ReactNode;
  color?: 'blue' | 'orange' | 'green' | 'purple' | 'red' | 'indigo';
}

const colorClasses = {
  blue: 'text-blue-600',
  orange: 'text-orange-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
  red: 'text-red-600',
  indigo: 'text-indigo-600',
};

export function StatCard({ title, value, description, icon, color = 'blue' }: StatCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-medium text-sm">{title}</CardTitle>
          <div className={cn('size-4 text-muted-foreground', colorClasses[color])}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className={cn('font-bold text-3xl', colorClasses[color])}>{value}</div>
          <p className="text-muted-foreground text-xs">{description}</p>
        </CardContent>
      </div>
    </Card>
  );
}
