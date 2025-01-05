import { HTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg border transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-[#1A1A1A] border-[#2A2A2A]',
        interactive: 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#E2FF66] cursor-pointer',
        elevated: 'bg-[#1A1A1A] border-[#2A2A2A] shadow-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

interface CardProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string;
  subtitle?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className,
    variant,
    padding,
    title,
    subtitle,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      >
        {(title || subtitle) && (
          <div className={cn('mb-4', padding === 'none' && 'px-6 pt-6')}>
            {title && (
              <h3 className="text-lg font-medium text-white">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
        )}
        <div className={cn(padding === 'none' && title && 'px-6 pb-6')}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };