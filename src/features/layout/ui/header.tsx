import { cn } from '@/shared/lib/css';
import { ReactNode } from 'react';

interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

export const Header = ({ className, children }: HeaderProps) => {
  return (
    <header className={cn('h-[var(--header-height)]', className)}>
      <div className="container mx-auto flex h-full border border-border bg-background-secondary">
        {children}
      </div>
    </header>
  );
};
