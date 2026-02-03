import { type IconSvgElement } from '@hugeicons/react'
import { InertiaLinkProps } from '@inertiajs/react'

export interface FlashType {
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
}

export interface Auth {
  user: User
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface NavItem {
  title: string
  href: NonNullable<InertiaLinkProps['href']>
  icon?: IconSvgElement | null
  isActive?: boolean
}

export interface SharedData {
  name: string
  quote: { message: string; author: string }
  auth: Auth
  sidebarOpen: boolean
  [key: string]: unknown
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  email_verified_at: string | null
  two_factor_enabled?: boolean
  created_at: string
  updated_at: string
  [key: string]: unknown // This allows for additional properties...
}
