import { router, usePage } from '@inertiajs/react'
import { IconCommand, IconSearch } from '@tabler/icons-react'
import { useCallback, useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'
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
import { docsNavItems, mainNavItems, settingsNavItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

const parser = UAParser()
const isMacOs = parser.os.name === 'macOS'

interface AppSearchProps {
  className?: string
}

export function AppSearch({ className }: AppSearchProps) {
  const { currentTeam } = usePage().props
  const currentTeamSlug = currentTeam?.slug ?? ''
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
              {mainNavItems(currentTeamSlug).map((item) => (
                <CommandItem
                  key={item.title}
                  onSelect={() => runCommand(() => router.visit(item.href))}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              {settingsNavItems.map((item) => (
                <CommandItem
                  key={item.title}
                  onSelect={() => runCommand(() => router.visit(item.href))}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Documentation">
              {docsNavItems.map((item) => (
                <CommandItem
                  key={item.title}
                  onSelect={() => runCommand(() => router.visit(item.href))}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
