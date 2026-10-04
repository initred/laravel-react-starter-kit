import { Head, Link, usePage } from '@inertiajs/react'
import {
  IconArrowRight,
  IconBrandReact,
  IconComponents,
  IconFingerprint,
  IconLock,
  IconRoute,
  IconUsersGroup,
} from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'
import AppLogo from '@/components/app-logo'
import { RailSection } from '@/components/rail-section'
import { SectionLabel } from '@/components/section-label'
import { Button } from '@/components/ui/button'
import { docsNavItems } from '@/lib/navigation'
import { dashboard, home, login, register } from '@/routes'

const features: { icon: Icon; title: string; description: string }[] = [
  {
    icon: IconLock,
    title: 'Authentication',
    description: 'Login, registration, email verification and password reset with Laravel Fortify.',
  },
  {
    icon: IconFingerprint,
    title: 'Two-factor & passkeys',
    description: 'TOTP two-factor authentication and passwordless sign-in with passkeys.',
  },
  {
    icon: IconUsersGroup,
    title: 'Teams',
    description: 'Personal and shared teams with roles and email invitations.',
  },
  {
    icon: IconBrandReact,
    title: 'Inertia + React',
    description: 'Server-side routing with a React front end, without building an API.',
  },
  {
    icon: IconComponents,
    title: 'shadcn/ui on Base UI',
    description: 'Accessible components styled with Tailwind CSS, in light and dark.',
  },
  {
    icon: IconRoute,
    title: 'Typed routes & tests',
    description: 'Wayfinder route helpers and Pest feature and browser tests.',
  },
]

const steps: { title: string; command: string }[] = [
  { title: 'Start the containers', command: 'vendor/bin/sail up -d' },
  { title: 'Run the dev server', command: 'vendor/bin/sail composer run dev' },
  { title: 'Make it yours', command: 'resources/js/pages/home.tsx' },
]

export default function Home({ canRegister = true }: { canRegister?: boolean }) {
  const { auth, currentTeam } = usePage().props
  const dashboardUrl = currentTeam ? dashboard(currentTeam.slug) : home()

  return (
    <>
      <Head title="Home" />

      <div className="bg-background flex min-h-svh flex-col">
        <header className="border-b">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 border-x px-6 lg:px-10">
            <Link href={home()} className="flex items-center gap-1">
              <AppLogo />
            </Link>

            <nav className="ml-auto flex items-center gap-2">
              {auth.user ? (
                <Button nativeButton={false} render={<Link href={dashboardUrl} />}>
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="ghost" nativeButton={false} render={<Link href={login()} />}>
                    Log in
                  </Button>
                  {canRegister && (
                    <Button nativeButton={false} render={<Link href={register()} />}>
                      Register
                    </Button>
                  )}
                </>
              )}
            </nav>
          </div>
        </header>

        <RailSection className="px-6 pt-20 pb-16 lg:px-10 lg:pt-28">
          <SectionLabel>Laravel + React starter kit</SectionLabel>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Start with the boring parts already done.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-base text-pretty">
            Authentication, teams and account settings are wired up on Laravel, Inertia and React.
            Spend your first day on your product, not on login forms.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {auth.user ? (
              <Button size="lg" nativeButton={false} render={<Link href={dashboardUrl} />}>
                Go to dashboard
                <IconArrowRight />
              </Button>
            ) : (
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={canRegister ? register() : login()} />}
              >
                Get started
                <IconArrowRight />
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={
                <a href="https://laravel.com/docs" target="_blank" rel="noopener noreferrer" />
              }
            >
              Read the docs
            </Button>
          </div>
        </RailSection>

        <RailSection>
          <div className="px-6 pt-7 pb-3 lg:px-10">
            <SectionLabel>What's included</SectionLabel>
          </div>
          <div className="bg-border grid gap-px border-t sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: FeatureIcon, title, description }) => (
              <div key={title} className="bg-background flex flex-col gap-3 p-6 lg:p-8">
                <span className="text-muted-foreground flex size-9 items-center justify-center rounded-md border">
                  <FeatureIcon className="size-4.5" />
                </span>
                <h2 className="text-sm font-semibold">{title}</h2>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            ))}
          </div>
        </RailSection>

        <RailSection>
          <div className="px-6 pt-7 pb-3 lg:px-10">
            <SectionLabel>Quick start</SectionLabel>
          </div>
          <ol className="bg-border grid gap-px border-t md:grid-cols-3">
            {steps.map(({ title, command }, index) => (
              <li key={title} className="bg-background flex flex-col gap-2 p-6 lg:p-8">
                <span className="text-muted-foreground font-mono text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-semibold">{title}</span>
                <code className="bg-muted/50 mt-1 overflow-x-auto rounded-md border px-3 py-2 font-mono text-xs whitespace-nowrap">
                  {command}
                </code>
              </li>
            ))}
          </ol>
        </RailSection>

        <RailSection className="flex flex-col">
          <div className="flex-1" />
          <footer className="text-muted-foreground flex flex-wrap items-center justify-between gap-4 border-t px-6 py-5 text-sm lg:px-10">
            <p>&copy; {new Date().getFullYear()} Built with Laravel.</p>
            <nav className="flex items-center gap-5">
              {docsNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </footer>
        </RailSection>
      </div>
    </>
  )
}
