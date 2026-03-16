import { dashboard } from '@/routes'
import { edit as editAppearance } from '@/routes/appearance'
import { privacy, terms } from '@/routes/docs'
import { edit as editProfile } from '@/routes/profile'
import { edit as editSecurity } from '@/routes/security'
import { type NavItem } from '@/types'
import {
  IconDashboard,
  IconFile,
  IconPalette,
  IconShield,
  IconUser,
} from '@tabler/icons-react'

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: IconDashboard,
  },
]

export const docsNavItems: NavItem[] = [
  {
    title: 'Terms',
    href: terms(),
    icon: IconFile,
  },
  {
    title: 'Privacy',
    href: privacy(),
    icon: IconFile,
  },
]

export const settingsNavItems: NavItem[] = [
  {
    title: 'Profile',
    href: editProfile(),
    icon: IconUser,
  },
  {
    title: 'Security',
    href: editSecurity(),
    icon: IconShield,
  },
  {
    title: 'Appearance',
    href: editAppearance(),
    icon: IconPalette,
  },
]
