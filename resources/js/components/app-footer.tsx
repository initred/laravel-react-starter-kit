import { Link } from '@inertiajs/react'
import { docsNavItems } from '@/lib/navigation'

export function AppFooter() {
  return (
    <footer className="border-t border-sidebar-border/80">
      <div className="mx-auto flex h-14 items-center justify-between px-4 md:max-w-7xl">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          {docsNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
