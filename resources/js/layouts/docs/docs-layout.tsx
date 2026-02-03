import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useActiveUrl } from '@/hooks/use-active-url'
import { cn, toUrl } from '@/lib/utils'
import { privacy, terms } from '@/routes/docs'
import { type NavItem } from '@/types'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@inertiajs/react'
import { type PropsWithChildren } from 'react'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Terms of Service',
    href: terms(),
    icon: null,
  },
  {
    title: 'Privacy Policy',
    href: privacy(),
    icon: null,
  },
]

export default function DocsLayout({
  children,
  title,
  description,
}: PropsWithChildren<{ title: string; description: string }>) {
  const { urlIsActive } = useActiveUrl()

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-6">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <aside className="w-full max-w-xl lg:w-48">
          <nav
            className="flex flex-col space-y-1 space-x-0"
            aria-label="Documents"
          >
            {sidebarNavItems.map((item, index) => (
              <Button
                key={`${toUrl(item.href)}-${index}`}
                size="sm"
                variant="ghost"
                asChild
                className={cn('w-full justify-start', {
                  'bg-muted': urlIsActive(item.href),
                })}
              >
                <Link href={item.href}>
                  {item.icon && <HugeiconsIcon icon={item.icon} strokeWidth={2} className="h-4 w-4" />}
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        <Separator className="my-6 lg:hidden" />

        <div className="flex-1">
          <article className="prose max-w-none prose-neutral dark:prose-invert">
            {children}
          </article>
        </div>
      </div>
    </div>
  )
}
