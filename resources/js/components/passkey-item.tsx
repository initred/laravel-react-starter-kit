import { IconKey, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Passkey } from '@/types/auth'

type Props = {
  passkey: Passkey
  onDelete: (id: number, onError: () => void) => void
}

export default function PasskeyItem({ passkey, onDelete }: Props) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    onDelete(passkey.id, () => setIsDeleting(false))
  }

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-md border">
          <IconKey className="size-4.5" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium">{passkey.name}</p>
            {passkey.authenticator && (
              <span className="text-muted-foreground rounded border px-1.5 font-mono text-[11px]">
                {passkey.authenticator}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-[13px]">
            Added {passkey.created_at_diff}
            {passkey.last_used_at_diff && (
              <>
                <span className="mx-1">·</span>
                Last used {passkey.last_used_at_diff}
              </>
            )}
          </p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            />
          }
        >
          <IconTrash className="h-4 w-4" />
          <span className="sr-only">Remove</span>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Remove passkey</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove the "{passkey.name}" passkey? You will no longer be able
            to use it to sign in.
          </DialogDescription>
          <DialogFooter className="gap-2">
            <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Removing...' : 'Remove passkey'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
