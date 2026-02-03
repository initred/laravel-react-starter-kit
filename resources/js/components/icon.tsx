import { cn } from '@/lib/utils'
import {
  type Icon as TablerIcon,
  type IconProps as TablerIconProps,
} from '@tabler/icons-react'

interface IconProps extends TablerIconProps {
  iconNode: TablerIcon
}

export function Icon({
  iconNode: IconComponent,
  className,
  ...props
}: IconProps) {
  return <IconComponent className={cn('size-4', className)} {...props} />
}
