import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from 'cn'

const sectionLabelVariants = cva(
  'flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.08em] uppercase',
  {
    variants: {
      variant: {
        default: 'text-info',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export function SectionLabel({
  variant = 'default',
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
