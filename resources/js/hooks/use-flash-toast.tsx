import { router } from '@inertiajs/react'
import { useEffect } from 'react'
import { useToastManager } from '@/components/ui/toast'

export function useFlashToast(): void {
  const { add } = useToastManager()

  useEffect(() => {
    return router.on('flash', (event) => {
      const data = event.detail.flash.toast

      if (!data) {
        return
      }

      add({
        type: data.type,
        title: data.message,
      })
    })
  }, [add])
}

export function FlashToastListener() {
  useFlashToast()

  return null
}
