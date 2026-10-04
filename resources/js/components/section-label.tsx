import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const sectionLabelVariants = cva(
  'flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.08em] uppercase',
  {
    variants: {
      variant: {
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        destructive: 'text-destructive',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

export function SectionLabel({
  variant = 'info',
  className,
  children,
  ...props
}: ComponentProps<'p'> & VariantProps<typeof sectionLabelVariants>) {
  return (
    <p className={cn(sectionLabelVariants({ variant }), className)} {...props}>
      {variant !== 'muted' && <span aria-hidden="true" className="size-1.5 shrink-0 bg-current" />}
      {children}
    </p>
  )
}
