import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
]

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-lg border bg-muted/50 shadow" />
          <div className="aspect-video rounded-lg border bg-muted/50 shadow" />
          <div className="aspect-video rounded-lg border bg-muted/50 shadow" />
        </div>
        <div className="min-h-screen flex-1 rounded-lg border bg-muted/50 shadow lg:min-h-min" />
      </div>
    </AppLayout>
  )
}
