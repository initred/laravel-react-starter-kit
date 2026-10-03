import { appearanceOptions } from '@/components/appearance-tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { Appearance } from '@/hooks/use-appearance'
import { useAppearance } from '@/hooks/use-appearance'
import { cn } from 'cn'

function ThemePreview({ theme }: { theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark'

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-full flex-1 flex-col overflow-hidden',
        isDark ? 'bg-neutral-950' : 'bg-white',
      )}
    >
      <span className={cn('h-4 border-b', isDark ? 'border-neutral-800' : 'border-neutral-200')} />
      <span className="flex flex-1">
        <span
          className={cn(
            'flex w-1/3 flex-col gap-1.5 border-r p-2',
            isDark ? 'border-neutral-800' : 'border-neutral-200',
          )}
        >
          <span
            className={cn('h-1.5 w-3/4 rounded', isDark ? 'bg-neutral-700' : 'bg-neutral-300')}
          />
          <span className={cn('h-1.5 rounded', isDark ? 'bg-neutral-800' : 'bg-neutral-200')} />
          <span
            className={cn('h-1.5 w-2/3 rounded', isDark ? 'bg-neutral-800' : 'bg-neutral-200')}
          />
        </span>
        <span className="flex flex-1 flex-col gap-1.5 p-2">
          <span className={cn('h-2 w-1/2 rounded', isDark ? 'bg-neutral-200' : 'bg-neutral-900')} />
          <span
            className={cn('h-1.5 w-4/5 rounded', isDark ? 'bg-neutral-800' : 'bg-neutral-200')}
          />
          <span
            className={cn(
              'mt-0.5 h-5 rounded border',
              isDark ? 'border-neutral-800' : 'border-neutral-200',
            )}
          />
        </span>
      </span>
    </span>
  )
}

export default function AppearancePicker() {
  const { appearance, updateAppearance } = useAppearance()

  return (
    <RadioGroup
      aria-label="Interface theme"
      value={appearance}
      onValueChange={(value) => updateAppearance(value as Appearance)}
      className="grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {appearanceOptions.map(({ value, label }) => (
        <label
          key={value}
          className={cn(
            'cursor-pointer overflow-hidden rounded-lg border transition-[border-color,box-shadow]',
            appearance === value
              ? 'border-foreground ring-foreground ring-1'
              : 'hover:border-muted-foreground/50',
          )}
        >
          <span className="bg-muted flex h-28 border-b pt-3 pl-3">
            <span className="flex flex-1 overflow-hidden rounded-tl-md border-t border-l">
              {value === 'system' ? (
                <>
                  <ThemePreview theme="light" />
                  <ThemePreview theme="dark" />
                </>
              ) : (
                <ThemePreview theme={value} />
              )}
            </span>
          </span>
          <span className="flex items-center gap-2.5 px-3.5 py-3">
            <RadioGroupItem value={value} />
            <span className="text-sm font-medium">{label}</span>
          </span>
        </label>
      ))}
    </RadioGroup>
  )
}
