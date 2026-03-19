import type { Auth } from '@/types/auth'
import type { FlashType } from '@/types/index'

declare module '@inertiajs/core' {
  export interface InertiaConfig {
    sharedPageProps: {
      name: string
      auth: Auth
      sidebarOpen: boolean
      [key: string]: unknown
    }
    flashDataType: {
      toast?: FlashType
    }
  }
}
