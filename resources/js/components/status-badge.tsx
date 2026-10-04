import type { PropsWithChildren } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from 'cn'

type StatusBadgeProps = PropsWithChildren<{
  tone?: 'success' | 'warning' | 'info' | 'neutral'
  className?: string
}>

const toneStyles: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
  neutral: 'text-muted-foreground',
}

export function StatusBadge({ tone = 'neutral', className, children }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn(toneStyles[tone], className)}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {children}
    </Badge>
  )
}
