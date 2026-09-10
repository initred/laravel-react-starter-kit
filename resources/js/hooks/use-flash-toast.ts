import { Toast } from '@base-ui/react/toast'
import { router } from '@inertiajs/react'
import { useEffect } from 'react'

export function useFlashToast(): void {
  const { add } = Toast.useToastManager()

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
