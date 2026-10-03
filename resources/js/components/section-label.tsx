import type { ComponentProps } from 'react'
import { cn } from 'cn'

type SectionLabelProps = ComponentProps<'p'> & {
  tone?: 'accent' | 'muted' | 'destructive'
}

const toneStyles: Record<NonNullable<SectionLabelProps['tone']>, string> = {
  accent: 'text-blue-600 dark:text-blue-400',
  muted: 'text-muted-foreground',
  destructive: 'text-destructive',
}

export function SectionLabel({
  tone = 'accent',
  className,
  children,
  ...props
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.08em] uppercase',
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {tone !== 'muted' && <span aria-hidden="true" className="size-1.5 shrink-0 bg-current" />}
      {children}
    </p>
  )
}
