import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import { cn } from '@/lib/utils'

interface IconProps {
  iconNode: IconSvgElement
  className?: string
  strokeWidth?: number
}

export function Icon({
  iconNode,
  className,
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <HugeiconsIcon
      icon={iconNode}
      strokeWidth={strokeWidth}
      className={cn('size-4', className)}
      {...props}
    />
  )
}
