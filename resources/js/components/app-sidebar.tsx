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
import { dashboard } from '@/routes'
import { privacy, terms } from '@/routes/docs'
import { type NavItem } from '@/types'
import { Link } from '@inertiajs/react'
import {
  DashboardBrowsingIcon,
  File01Icon,
  SecurityCheckIcon,
} from '@hugeicons/core-free-icons'
import AppLogo from './app-logo'

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: DashboardBrowsingIcon,
  },
]

const footerNavItems: NavItem[] = [
  {
    title: 'Terms',
    href: terms(),
    icon: File01Icon,
  },
  {
    title: 'Privacy',
    href: privacy(),
    icon: SecurityCheckIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
