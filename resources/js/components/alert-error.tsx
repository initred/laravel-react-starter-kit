import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function AlertError({
  errors,
  title,
}: {
  errors: string[]
  title?: string
}) {
  return (
    <Alert variant="destructive">
      <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
      <AlertTitle>{title || 'Something went wrong.'}</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc text-sm">
          {Array.from(new Set(errors)).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
