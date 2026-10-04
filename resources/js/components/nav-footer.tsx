import type { ComponentPropsWithoutRef } from 'react'
import { Icon } from '@/components/icon'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { toUrl } from '@/lib/utils'
import type { NavItem } from '@/types'

export function NavFooter({
  items,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
  items: NavItem[]
}) {
  return (
    <SidebarGroup {...props} className={className}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="text-muted-foreground hover:text-foreground"
                render={<a href={toUrl(item.href)} target="_blank" rel="noopener noreferrer" />}
              >
                {item.icon && <Icon iconNode={item.icon} className="size-4" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
