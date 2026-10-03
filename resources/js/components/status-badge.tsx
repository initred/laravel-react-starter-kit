import type { PropsWithChildren } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from 'cn'

type StatusBadgeProps = PropsWithChildren<{
  tone?: 'success' | 'warning' | 'info' | 'neutral'
  className?: string
}>

const toneStyles: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  success: 'text-emerald-700 dark:text-emerald-400',
  warning: 'text-amber-700 dark:text-amber-400',
  info: 'text-blue-600 dark:text-blue-400',
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
