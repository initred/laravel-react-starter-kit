import { FlashType } from '@/types/index'

declare module '@inertiajs/core' {
  export interface InertiaConfig {
    flashDataType: {
      toast?: FlashType
    }
  }
}
