import { Link } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'
import { useCurrentUrl } from '@/hooks/use-current-url'
import { settingsNavItems } from '@/lib/navigation'
import { toUrl } from '@/lib/utils'
import { cn } from 'cn'

export default function SettingsLayout({ children }: PropsWithChildren) {
  const { isCurrentOrParentUrl } = useCurrentUrl()

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b">
        <div className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6 lg:px-10">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Manage your profile and account settings
          </p>

          <nav aria-label="Settings" className="mt-6 -mb-px flex gap-6 overflow-x-auto">
            {settingsNavItems.map((item) => {
              const isActive = isCurrentOrParentUrl(item.href)

              return (
                <Link
                  key={toUrl(item.href)}
                  href={item.href}
                  prefetch
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'border-b-2 py-3 text-sm whitespace-nowrap transition-colors',
                    isActive
                      ? 'border-foreground text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground border-transparent',
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-10">{children}</div>
    </div>
  )
}
