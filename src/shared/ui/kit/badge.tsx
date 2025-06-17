import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/css';

const badgeVariants = cva(
  'inline-flex items-center justify-center h-[28px] rounded-md border px-[5px] py-[3px] text-sm font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        success: // Новый вариант
          'border-transparent border-[#14AE5C] bg-[#DCF3E6] dark:bg-green-800/80 dark:text-green-50 [a&]:hover:bg-green-100/80 dark:[a&]:hover:bg-green-800/60',
        warning: // Новый вариант
          'border-transparent border-[#FCD19C] bg-[#FFF8F0] dark:bg-yellow-800/80 dark:text-yellow-50 [a&]:hover:bg-yellow-100/80 dark:[a&]:hover:bg-yellow-800/60',
        moderation: // Новый вариант
          'border-transparent border-[#7F22FE] bg-[#F9F4FF] dark:bg-purple-800/80 dark:text-purple-50 [a&]:hover:bg-purple-100/80 dark:[a&]:hover:bg-purple-800/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
