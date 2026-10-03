import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'
import type { HTMLAttributes } from 'react'
import type { Appearance } from '@/hooks/use-appearance'
import { useAppearance } from '@/hooks/use-appearance'
import { cn } from 'cn'

export const appearanceOptions: { value: Appearance; icon: Icon; label: string }[] = [
  { value: 'light', icon: IconSun, label: 'Light' },
  { value: 'dark', icon: IconMoon, label: 'Dark' },
  { value: 'system', icon: IconDeviceDesktop, label: 'System' },
]

export default function AppearanceToggleTab({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { appearance, updateAppearance } = useAppearance()

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn('inline-flex gap-0.5 rounded-lg border p-0.5', className)}
      {...props}
    >
      {appearanceOptions.map(({ value, icon: TabIcon, label }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={appearance === value}
          aria-label={label}
          title={label}
          onClick={() => updateAppearance(value)}
          className={cn(
            'flex size-6 items-center justify-center rounded-md transition-colors',
            appearance === value
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <TabIcon className="size-3.5" />
        </button>
      ))}
    </div>
  )
}
