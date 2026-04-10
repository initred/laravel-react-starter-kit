import { createInertiaApp } from '@inertiajs/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { initializeTheme } from '@/hooks/use-appearance'
import AppLayout from '@/layouts/app-layout'
import AuthLayout from '@/layouts/auth-layout'
import DocsLayout from '@/layouts/docs/docs-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { Toaster } from './components/ui/sonner'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  layout: (name) => {
    switch (true) {
      case name === 'home':
        return null
      case name.startsWith('auth/'):
        return AuthLayout
      case name.startsWith('settings/'):
      case name.startsWith('teams/'):
        return [AppLayout, SettingsLayout]
      case name.startsWith('docs/'):
        return DocsLayout
      default:
        return AppLayout
    }
  },
  strictMode: true,
  withApp(app) {
    return (
      <TooltipProvider delayDuration={0}>
        {app}
        <Toaster position="top-center" richColors />
      </TooltipProvider>
    )
  },
  progress: {
    color: '#4B5563',
  },
})

// This will set light / dark mode on load...
initializeTheme()
