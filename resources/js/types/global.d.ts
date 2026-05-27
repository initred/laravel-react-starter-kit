import type { Auth } from '@/types/auth'
import type { FlashToast } from '@/types/index'

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface InputHTMLAttributes<T> {
    passwordrules?: string
  }
}

declare module '@inertiajs/core' {
  export interface InertiaConfig {
    sharedPageProps: {
      name: string
      auth: Auth
      sidebarOpen: boolean
      currentTeam: Team | null
      teams: Team[]
      [key: string]: unknown
    }
    flashDataType: {
      toast?: FlashToast
    }
  }
}
