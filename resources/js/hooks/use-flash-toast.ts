import { router } from '@inertiajs/react'
import { useEffect } from 'react'
import { toast } from '@/components/ui/toast'
import type { FlashToast } from '@/types'

export function useFlashToast(): void {
  useEffect(() => {
    return router.on('flash', (event) => {
      const flash = (event as CustomEvent).detail?.flash
      const data = flash?.toast as FlashToast | undefined

      if (!data) {
        return
      }

      toast.add({
        type: data.type,
        title: data.message,
      })
    })
  }, [])
}
