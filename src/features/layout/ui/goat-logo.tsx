import { cn } from '@/shared/lib/css';

interface GoatLogoProps {
  title?: string;
  className?: string;
}

export const GoatLogo = ({ title, className }: GoatLogoProps) => {
  return (
    <div className={cn('text-[26px]', className)}>
      <strong>goat</strong> <span className="font-light">{title}</span>
    </div>
  );
};
