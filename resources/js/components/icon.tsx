import type { Icon as TablerIcon, IconProps as TablerIconProps } from '@tabler/icons-react'
import { cn } from 'cn'

interface IconProps extends TablerIconProps {
  iconNode: TablerIcon
}

export function Icon({ iconNode: IconComponent, className, ...props }: IconProps) {
  return <IconComponent className={cn('size-4', className)} {...props} />
}
