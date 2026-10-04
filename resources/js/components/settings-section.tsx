import type { PropsWithChildren } from 'react'
import { SectionLabel } from '@/components/section-label'
import { cn } from 'cn'

type SettingsSectionProps = PropsWithChildren<{
  label: string
  title: string
  description?: string
  variant?: 'default' | 'destructive'
  className?: string
}>

export function SettingsSection({
  label,
  title,
  description,
  variant = 'default',
  className,
  children,
}: SettingsSectionProps) {
  return (
    <section
      className={cn(
        'flex flex-col gap-6 border-b py-10 last:border-b-0 lg:flex-row lg:gap-14',
        className,
      )}
    >
      <header className="lg:w-72 lg:shrink-0">
        <SectionLabel variant={variant}>{label}</SectionLabel>
        <h2 className="mt-2.5 text-base font-semibold">{title}</h2>
        {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
      </header>
      <div className="min-w-0 flex-1">{children}</div>
    </section>
  )
}
