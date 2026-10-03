import { Head, Link, usePage } from '@inertiajs/react'
import { IconArrowRight } from '@tabler/icons-react'
import { RailSection } from '@/components/rail-section'
import { SectionLabel } from '@/components/section-label'
import { dashboard } from '@/routes'
import { edit as editSecurity } from '@/routes/security'
import { edit as editTeam } from '@/routes/teams'

const placeholderPattern =
  'rounded-md border border-dashed bg-[repeating-linear-gradient(135deg,var(--border)_0_1px,transparent_1px_8px)]'

export default function Dashboard() {
  const { currentTeam } = usePage().props

  return (
    <>
      <Head title="Dashboard" />

      <div className="flex flex-1 flex-col">
        <RailSection className="px-6 pt-14 pb-10 lg:px-10">
          <SectionLabel>Overview</SectionLabel>
          <h1 className="mt-3.5 text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2 max-w-lg text-sm">
            {currentTeam ? `${currentTeam.name} at a glance.` : 'Your workspace at a glance.'} These
            panels are placeholders — swap them for your own widgets.
          </p>
        </RailSection>

        <RailSection>
          <div className="bg-border grid gap-px md:grid-cols-3">
            {['Metric 01', 'Metric 02', 'Metric 03'].map((label) => (
              <div key={label} className="bg-background flex flex-col gap-4 p-6">
                <SectionLabel tone="muted">{label}</SectionLabel>
                <div className={`h-24 ${placeholderPattern}`} />
              </div>
            ))}
          </div>
        </RailSection>

        <RailSection>
          <div className="bg-border grid gap-px lg:grid-cols-3">
            <div className="bg-background flex flex-col gap-4 p-6 lg:col-span-2">
              <SectionLabel tone="muted">Primary panel</SectionLabel>
              <div className={`h-72 ${placeholderPattern}`} />
            </div>
            <div className="bg-background flex flex-col gap-4 p-6">
              <SectionLabel tone="muted">Activity</SectionLabel>
              <ul className="divide-y">
                {[70, 55, 80, 60].map((width) => (
                  <li key={width} className="flex items-center gap-3 py-3">
                    <span className="bg-muted size-7 shrink-0 rounded-full" />
                    <span className="flex flex-1 flex-col gap-1.5">
                      <span className="bg-muted h-2 rounded" style={{ width: `${width}%` }} />
                      <span className="bg-muted h-2 w-1/3 rounded" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RailSection>

        <RailSection>
          <div className="px-6 pt-7 pb-3">
            <SectionLabel>Next steps</SectionLabel>
          </div>
          <div className="bg-border grid gap-px border-t md:auto-cols-fr md:grid-flow-col">
            <div className="bg-background flex flex-col gap-1.5 px-6 pt-5 pb-6">
              <span className="text-muted-foreground font-mono text-xs">01</span>
              <span className="text-sm font-semibold">Make this page yours</span>
              <span className="text-muted-foreground text-sm">
                Edit <code className="text-foreground font-mono text-xs">pages/dashboard.tsx</code>
              </span>
            </div>
            {currentTeam && (
              <Link
                href={editTeam(currentTeam.slug)}
                className="bg-background hover:bg-muted/50 group flex flex-col gap-1.5 px-6 pt-5 pb-6 transition-colors"
              >
                <span className="text-muted-foreground font-mono text-xs">02</span>
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  Invite your team
                  <IconArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-muted-foreground text-sm">Add members and assign roles.</span>
              </Link>
            )}
            <Link
              href={editSecurity()}
              className="bg-background hover:bg-muted/50 group flex flex-col gap-1.5 px-6 pt-5 pb-6 transition-colors"
            >
              <span className="text-muted-foreground font-mono text-xs">
                {currentTeam ? '03' : '02'}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                Secure your account
                <IconArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-muted-foreground text-sm">
                Turn on two-factor or add a passkey.
              </span>
            </Link>
          </div>
        </RailSection>

        <RailSection className="min-h-12" />
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
