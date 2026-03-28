import {
  IconDashboard,
  IconFile,
  IconPalette,
  IconShield,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react'
import { dashboard } from '@/routes'
import { edit as editAppearance } from '@/routes/appearance'
import { privacy, terms } from '@/routes/docs'
import { edit as editProfile } from '@/routes/profile'
import { edit as editSecurity } from '@/routes/security'
import { index as teams } from '@/routes/teams'
import type { NavItem } from '@/types'

export const mainNavItems = (currentTeamSlug: string): NavItem[] => [
  {
    title: 'Dashboard',
    href: dashboard(currentTeamSlug),
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
    title: 'Teams',
    href: teams(),
    icon: IconUsersGroup,
  },
  {
    title: 'Appearance',
    href: editAppearance(),
    icon: IconPalette,
  },
]
