import '../css/app.css'

import { createInertiaApp, router } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { toast, Toaster } from 'sonner'
import { initializeTheme } from './hooks/use-appearance'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <StrictMode>
        <App {...props} />
        <Toaster position="top-center" richColors />
      </StrictMode>,
    )
  },
  progress: {
    color: '#4B5563',
  },
})

// Flash message listener (registered once, outside React)
router.on('flash', (event) => {
  const flashToast = event.detail.flash.toast
  if (flashToast) {
    toast[flashToast.type](flashToast.message)
  }
})

// This will set light / dark mode on load...
initializeTheme()
