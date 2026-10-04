import { Link } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'
import AppLogo from '@/components/app-logo'
import { home } from '@/routes'

interface AuthLayoutProps {
  title?: string
  description?: string
}

export default function AuthGridLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="bg-background flex min-h-svh flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center border-x px-6 lg:px-10">
          <Link href={home()} className="flex items-center gap-1">
            <AppLogo />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col border-x">
          <div className="min-h-10 flex-1" />

          <div className="border-y">
            <div className="mx-auto w-full max-w-md px-6 py-8 sm:border-x sm:px-10">
              <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-1.5 text-sm text-pretty">{description}</p>
              )}
            </div>
          </div>

          <div className="border-b">
            <div className="mx-auto w-full max-w-md px-6 py-8 sm:border-x sm:px-10">{children}</div>
          </div>

          <div className="min-h-10 flex-1" />
        </div>
      </main>
    </div>
  )
}
