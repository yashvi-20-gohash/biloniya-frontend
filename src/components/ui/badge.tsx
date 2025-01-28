import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/src/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        success:
          'border-transparent bg-success text-success-foreground shadow hover:bg-success/80',
        warning:
          'border-transparent bg-warning text-warning-foreground shadow hover:bg-warning/80',
        info: 'border-transparent bg-info text-info-foreground shadow hover:bg-info/80',
        flipkart:
          'border-transparent bg-flipkart text-flipkart-foreground shadow hover:bg-flipkart/80',
        myntra:
          'border-transparent bg-myntra text-myntra-foreground shadow hover:bg-myntra/80',
        amazon:
          'border-transparent bg-amazon text-amazon-foreground shadow hover:bg-amazon/80',
        woocommerce:
          'border-transparent bg-woocommerce text-woocommerce-foreground shadow hover:bg-woocommerce/80',
        outline: 'text-foreground',
        cancelled: 'bg-gray-400 text-white shadow hover:bg-gray-300 ',
        refunded: 'bg-blue-400 text-white shadow hover:bg-blue-300',
        fraud:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        resent: 'bg-purple-400 text-white shadow hover:bg-purple-300',
        replacement:
          'border-transparent bg-yellow-200 text-warning-foreground shadow hover:bg-warning/80',
        pending:
          'border-transparent bg-warning text-warning-foreground shadow hover:bg-warning/80',
        succeeded:
          'border-transparent bg-success text-success-foreground shadow hover:bg-success/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  disabled?: boolean // Add the disabled prop here
}

function Badge({ className, variant, disabled, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        disabled ? 'opacity-50 cursor-not-allowed' : '', // Adjust styling based on disabled state
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
