import {
  Command,
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
import { router } from '@inertiajs/react'
import {
  IconCommand,
  IconDashboard,
  IconDeviceMobile,
  IconFile,
  IconKey,
  IconPalette,
  IconSearch,
  IconShieldCheck,
  IconUser,
} from '@tabler/icons-react'
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
          <IconSearch />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>{isMacOs ? <IconCommand /> : 'Ctrl'}</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <CommandDialog open={open} onOpenChange={setOpen} showCloseButton={false}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem
                onSelect={() => runCommand(() => router.visit(dashboard()))}
              >
                <IconDashboard />
                <span>Dashboard</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem
                onSelect={() => runCommand(() => router.visit(profile()))}
              >
                <IconUser />
                <span>Profile</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.visit(password()))}
              >
                <IconKey />
                <span>Password</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.visit(appearance()))}
              >
                <IconPalette />
                <span>Appearance</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.visit(twoFactor()))}
              >
                <IconDeviceMobile />
                <span>Two-Factor Authentication</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Documentation">
              <CommandItem
                onSelect={() => runCommand(() => router.visit(terms()))}
              >
                <IconFile />
                <span>Terms</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.visit(privacy()))}
              >
                <IconShieldCheck />
                <span>Privacy</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
