import { router } from '@inertiajs/react'
import { IconKey } from '@tabler/icons-react'
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController'
import PasskeyItem from '@/components/passkey-item'
import PasskeyRegistration from '@/components/passkey-register'
import { SettingsSection } from '@/components/settings-section'
import type { Passkey } from '@/types/auth'

export type Props = {
  canManagePasskeys?: boolean
  passkeys?: Passkey[]
}

const EmptyState = () => {
  return (
    <div className="px-6 py-10 text-center">
      <div className="text-muted-foreground mx-auto mb-4 flex size-10 items-center justify-center rounded-md border">
        <IconKey className="size-5" />
      </div>
      <p className="text-sm font-medium">No passkeys yet</p>
      <p className="text-muted-foreground mt-1 text-sm">
        Add a passkey to sign in without a password
      </p>
    </div>
  )
}

export default function ManagePasskeys(props: Props) {
  const passkeys = props.passkeys ?? []

  const handleDelete = (id: number, onError: () => void) => {
    router.delete(destroy.url(id), {
      preserveScroll: true,
      onError,
    })
  }

  const handleRegisterSuccess = () => {
    router.reload()
  }

  if (!(props.canManagePasskeys ?? false)) {
    return null
  }

  return (
    <SettingsSection
      label="Passkeys"
      title="Passkeys"
      description="Sign in with Face ID, Touch ID or a security key instead of a password."
    >
      <div className="flex flex-col gap-3">
        <div className="divide-y rounded-lg border">
          {passkeys.length > 0 ? (
            passkeys.map((passkey) => (
              <PasskeyItem key={passkey.id} passkey={passkey} onDelete={handleDelete} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        <PasskeyRegistration onSuccess={handleRegisterSuccess} />
      </div>
    </SettingsSection>
  )
}
