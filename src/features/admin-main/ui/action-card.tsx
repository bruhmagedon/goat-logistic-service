import { cn } from '@/shared/lib/css';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ActionCardProps {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
  color?: 'purple' | 'green' | 'blue' | 'gray';
}

const colorClasses = {
  bg: {
    purple: 'bg-purple-50 hover:bg-purple-100',
    green: 'bg-green-50 hover:bg-green-100',
    blue: 'bg-blue-50 hover:bg-blue-100',
    gray: 'bg-gray-50 hover:bg-gray-100',
  },
  border: {
    purple: 'border-purple-200',
    green: 'border-green-200',
    blue: 'border-blue-200',
    gray: 'border-gray-200',
  },
  text: {
    purple: 'text-purple-700',
    green: 'text-green-700',
    blue: 'text-blue-700',
    gray: 'text-gray-700',
  },
};

export function ActionCard({ to, title, description, icon, color = 'gray' }: ActionCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border-2 p-6 text-center transition-all',
        colorClasses.bg[color],
        colorClasses.border[color],
        colorClasses.text[color],
      )}
    >
      <div className="mb-4 h-8 w-8">{icon}</div>
      <h3 className="font-semibold text-base">{title}</h3>
      <p className="mt-1 text-sm opacity-80">{description}</p>
    </Link>
  );
}
