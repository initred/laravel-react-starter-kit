import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'
import { dashboard } from '@/routes'
import { edit as appearance } from '@/routes/appearance'
import { privacy, terms } from '@/routes/docs'
import { edit as profile } from '@/routes/profile'
import { show as twoFactor } from '@/routes/two-factor'
import { edit as password } from '@/routes/user-password'
import {
  CommandIcon,
  DashboardBrowsingIcon,
  File01Icon,
  Key01Icon,
  PaintBoardIcon,
  Search01Icon,
  SecurityCheckIcon,
  SmartPhone01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { router } from '@inertiajs/react'
import { useCallback, useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'

const parser = UAParser()
const isMacOs = parser.os.name === 'macOS'

interface AppSearchProps {
  className?: string
}

export function AppSearch({ className }: AppSearchProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <InputGroup
        className={cn('cursor-pointer', className)}
        onClick={() => setOpen(true)}
      >
        <button
          type="button"
          className="flex h-9 flex-1 cursor-pointer items-center bg-transparent px-3 text-sm text-muted-foreground outline-none placeholder:text-muted-foreground/70"
        >
          Search...
        </button>
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>
            {isMacOs ? (
              <HugeiconsIcon icon={CommandIcon} strokeWidth={2} />
            ) : (
              'Ctrl'
            )}
          </Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <CommandDialog open={open} onOpenChange={setOpen} showCloseButton={false}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => runCommand(() => router.visit(dashboard()))}
            >
              <HugeiconsIcon icon={DashboardBrowsingIcon} strokeWidth={2} />
              <span>Dashboard</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() => runCommand(() => router.visit(profile()))}
            >
              <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
              <span>Profile</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.visit(password()))}
            >
              <HugeiconsIcon icon={Key01Icon} strokeWidth={2} />
              <span>Password</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.visit(appearance()))}
            >
              <HugeiconsIcon icon={PaintBoardIcon} strokeWidth={2} />
              <span>Appearance</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.visit(twoFactor()))}
            >
              <HugeiconsIcon icon={SmartPhone01Icon} strokeWidth={2} />
              <span>Two-Factor Authentication</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Documentation">
            <CommandItem
              onSelect={() => runCommand(() => router.visit(terms()))}
            >
              <HugeiconsIcon icon={File01Icon} strokeWidth={2} />
              <span>Terms</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.visit(privacy()))}
            >
              <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={2} />
              <span>Privacy</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
