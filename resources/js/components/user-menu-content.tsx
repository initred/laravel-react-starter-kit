import { Link, router } from '@inertiajs/react'
import { IconLogout } from '@tabler/icons-react'
import AppearanceToggleTab from '@/components/appearance-tabs'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { UserInfo } from '@/components/user-info'
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import { settingsNavItems } from '@/lib/navigation'
import { toUrl } from '@/lib/utils'
import { logout } from '@/routes'
import type { User } from '@/types'

interface UserMenuContentProps {
  user: User
}

export function UserMenuContent({ user }: UserMenuContentProps) {
  const cleanup = useMobileNavigation()

  const handleLogout = () => {
    cleanup()
    router.flushAll()
  }

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserInfo user={user} showEmail={true} />
          </div>
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel className="font-mono text-[11px] tracking-[0.08em] uppercase">
          Settings
        </DropdownMenuLabel>
        {settingsNavItems.map((item) => (
          <DropdownMenuItem
            key={toUrl(item.href)}
            render={
              <Link className="w-full cursor-pointer" href={item.href} prefetch onClick={cleanup} />
            }
          >
            {item.icon && <item.icon className="text-muted-foreground" />}
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <div className="flex items-center justify-between gap-4 px-2 py-1">
        <span className="text-muted-foreground text-sm">Theme</span>
        <AppearanceToggleTab />
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          render={
            <Link
              className="block w-full cursor-pointer"
              href={logout()}
              as="button"
              onClick={handleLogout}
              data-test="logout-button"
            />
          }
        >
          <IconLogout className="text-muted-foreground" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )
}
