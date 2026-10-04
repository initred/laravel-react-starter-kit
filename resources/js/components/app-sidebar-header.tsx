import { AppSearch } from '@/components/app-search'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SidebarTrigger } from '@/components/ui/sidebar'
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types'

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  return (
    <header className="bg-background sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b px-4">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <div className="hidden min-w-0 sm:block">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>
      <div className="ml-auto shrink-0">
        <AppSearch />
      </div>
    </header>
  )
}
