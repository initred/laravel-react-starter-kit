import { Link, usePage } from '@inertiajs/react'
import { NavFooter } from '@/components/nav-footer'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { docsNavItems, mainNavItems } from '@/lib/navigation'
import { dashboard } from '@/routes'
import AppLogo from './app-logo'

export function AppSidebar() {
  const { currentTeam } = usePage().props
  const currentTeamSlug = currentTeam?.slug ?? ''

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard(currentTeamSlug)} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems(currentTeamSlug)} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={docsNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
