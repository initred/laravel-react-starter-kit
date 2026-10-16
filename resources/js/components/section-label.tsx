import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from 'cn'

export const sectionLabelVariants = cva(
  'text-2xs tracking-caps flex items-baseline gap-2 font-mono font-medium uppercase',
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
      {variant !== 'muted' && (
        // Sits on the text baseline, then rises half the font's cap height so it centres on the caps.
        <span
          aria-hidden="true"
          // oxlint-disable-next-line shadcn/no-arbitrary-values -- The cap unit has no theme equivalent.
          className="relative bottom-[0.5cap] size-1.5 shrink-0 translate-y-1/2 bg-current"
        />
      )}
      {children}
    </p>
  )
}
