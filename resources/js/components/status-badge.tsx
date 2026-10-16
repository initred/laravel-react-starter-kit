import type { PropsWithChildren } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from 'cn'

type StatusBadgeProps = PropsWithChildren<{
  variant?: 'default' | 'info' | 'success' | 'warning'
  className?: string
}>

export function StatusBadge({ variant = 'default', className, children }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        {
          'text-muted-foreground': variant === 'default',
          'text-info': variant === 'info',
          'text-success': variant === 'success',
          'text-warning': variant === 'warning',
        },
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {children}
    </Badge>
  )
}
