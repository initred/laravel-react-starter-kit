import { cva, type VariantProps } from 'class-variance-authority'
import type { PropsWithChildren } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from 'cn'

const statusBadgeVariants = cva('', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type StatusBadgeProps = PropsWithChildren<
  VariantProps<typeof statusBadgeVariants> & {
    className?: string
  }
>

export function StatusBadge({ variant = 'default', className, children }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn(statusBadgeVariants({ variant }), className)}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {children}
    </Badge>
  )
}
