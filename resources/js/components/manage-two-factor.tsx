import { Form } from '@inertiajs/react'
import { IconShield, IconShieldCheck } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { SettingsSection } from '@/components/settings-section'
import { StatusBadge } from '@/components/status-badge'
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes'
import TwoFactorSetupModal from '@/components/two-factor-setup-modal'
import { Button } from '@/components/ui/button'
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth'
import { disable, enable } from '@/routes/two-factor'

export type Props = {
  canManageTwoFactor?: boolean
  requiresConfirmation?: boolean
  twoFactorEnabled?: boolean
}

export default function ManageTwoFactor(props: Props) {
  const requiresConfirmation = props.requiresConfirmation ?? false
  const twoFactorEnabled = props.twoFactorEnabled ?? false

  const {
    qrCodeSvg,
    hasSetupData,
    manualSetupKey,
    clearSetupData,
    clearTwoFactorAuthData,
    fetchSetupData,
    recoveryCodesList,
    fetchRecoveryCodes,
    errors,
  } = useTwoFactorAuth()
  const [showSetupModal, setShowSetupModal] = useState<boolean>(false)
  const prevTwoFactorEnabled = useRef(twoFactorEnabled)

  useEffect(() => {
    if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
      clearTwoFactorAuthData()
    }

    prevTwoFactorEnabled.current = twoFactorEnabled
  }, [twoFactorEnabled, clearTwoFactorAuthData])

  if (!(props.canManageTwoFactor ?? false)) {
    return null
  }

  return (
    <SettingsSection
      label="Two-factor"
      title="Two-factor authentication"
      description="Require a code from your authenticator app when you sign in."
    >
      <div className="rounded-lg border">
        <div className="flex items-start gap-4 p-5">
          <span className="text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-md border">
            <IconShield className="size-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-sm font-semibold">Authenticator app</p>
              {twoFactorEnabled ? (
                <StatusBadge variant="success">Enabled</StatusBadge>
              ) : (
                <StatusBadge>Disabled</StatusBadge>
              )}
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {twoFactorEnabled
                ? "You'll be asked for a secure, random pin from your TOTP app each time you sign in."
                : 'Add a second step to sign-in. You will scan a QR code with a TOTP-supported app on your phone.'}
            </p>
          </div>
        </div>

        {twoFactorEnabled && (
          <TwoFactorRecoveryCodes
            recoveryCodesList={recoveryCodesList}
            fetchRecoveryCodes={fetchRecoveryCodes}
            errors={errors}
          />
        )}

        <div className="flex justify-end gap-2 border-t px-5 py-3">
          {twoFactorEnabled ? (
            <Form {...disable.form()}>
              {({ processing }) => (
                <Button variant="destructive" type="submit" disabled={processing}>
                  Disable 2FA
                </Button>
              )}
            </Form>
          ) : hasSetupData ? (
            <Button onClick={() => setShowSetupModal(true)}>
              <IconShieldCheck />
              Continue setup
            </Button>
          ) : (
            <Form {...enable.form()} onSuccess={() => setShowSetupModal(true)}>
              {({ processing }) => (
                <Button type="submit" disabled={processing}>
                  Enable 2FA
                </Button>
              )}
            </Form>
          )}
        </div>
      </div>

      <TwoFactorSetupModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        requiresConfirmation={requiresConfirmation}
        twoFactorEnabled={twoFactorEnabled}
        qrCodeSvg={qrCodeSvg}
        manualSetupKey={manualSetupKey}
        clearSetupData={clearSetupData}
        fetchSetupData={fetchSetupData}
        errors={errors}
      />
    </SettingsSection>
  )
}
