import { cn } from 'cn'
import { Link } from '@inertiajs/react'
import type { ComponentProps } from 'react'

type LinkProps = ComponentProps<typeof Link>

export default function TextLink({ className = '', children, ...props }: LinkProps) {
  return (
    <Link
      className={cn(
        'text-foreground decoration-muted-foreground/50 underline underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current!',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
