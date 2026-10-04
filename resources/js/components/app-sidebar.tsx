import { Link, router, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
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
  useSidebar,
} from '@/components/ui/sidebar'
import { docsNavItems, mainNavItems } from '@/lib/navigation'
import { dashboard } from '@/routes'
import AppLogo from './app-logo'
import { TeamSwitcher } from './team-switcher'

export function AppSidebar() {
  const { currentTeam } = usePage().props
  const currentTeamSlug = currentTeam?.slug ?? ''
  const { setOpenMobile } = useSidebar()

  useEffect(() => router.on('navigate', () => setOpenMobile(false)), [setOpenMobile])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-0 p-0">
        <SidebarMenu className="h-14 justify-center border-b px-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-10"
              render={<Link href={dashboard(currentTeamSlug)} prefetch />}
            >
              <AppLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="border-b p-2">
          <SidebarMenuItem>
            <TeamSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pt-2">
        <NavMain items={mainNavItems(currentTeamSlug)} />
      </SidebarContent>

      <SidebarFooter className="gap-0 p-0">
        <NavFooter items={docsNavItems} className="mt-auto" />
        <div className="border-t p-2">
          <NavUser />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
