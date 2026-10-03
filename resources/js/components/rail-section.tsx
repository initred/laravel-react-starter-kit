import type { ComponentProps } from 'react'
import { cn } from 'cn'

/**
 * A full-width band with a hairline below it, whose content sits between two
 * vertical rails. Stacked bands form a ruled grid.
 */
export function RailSection({ className, children, ...props }: ComponentProps<'section'>) {
  return (
    <section className="border-b last:flex last:flex-1 last:border-b-0" {...props}>
      <div className={cn('mx-auto w-full max-w-6xl border-x', className)}>{children}</div>
    </section>
  )
}
