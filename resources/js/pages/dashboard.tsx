import { Head } from '@inertiajs/react'
import { dashboard } from '@/routes'

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-lg border shadow" />
          <div className="bg-muted/50 aspect-video rounded-lg border shadow" />
          <div className="bg-muted/50 aspect-video rounded-lg border shadow" />
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-lg border shadow lg:min-h-min" />
      </div>
    </>
  )
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
    },
  ],
})
