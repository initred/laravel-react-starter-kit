import { Form } from '@inertiajs/react'
import { IconEye, IconEyeOff, IconLockSquare, IconRefresh } from '@tabler/icons-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import AlertError from '@/components/alert-error'
import { Button } from '@/components/ui/button'
import { regenerateRecoveryCodes } from '@/routes/two-factor'

type Props = {
  recoveryCodesList: string[]
  fetchRecoveryCodes: () => Promise<void>
  errors: string[]
}

export default function TwoFactorRecoveryCodes({
  recoveryCodesList,
  fetchRecoveryCodes,
  errors,
}: Props) {
  const [codesAreVisible, setCodesAreVisible] = useState<boolean>(false)
  const codesSectionRef = useRef<HTMLDivElement | null>(null)
  const canRegenerateCodes = recoveryCodesList.length > 0 && codesAreVisible

  const toggleCodesVisibility = useCallback(async () => {
    if (!codesAreVisible && !recoveryCodesList.length) {
      await fetchRecoveryCodes()
    }

    setCodesAreVisible(!codesAreVisible)

    if (!codesAreVisible) {
      setTimeout(() => {
        codesSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      })
    }
  }, [codesAreVisible, recoveryCodesList.length, fetchRecoveryCodes])

  useEffect(() => {
    if (!recoveryCodesList.length) {
      void fetchRecoveryCodes()
    }
  }, [recoveryCodesList.length, fetchRecoveryCodes])

  const RecoveryCodeIconComponent = codesAreVisible ? IconEyeOff : IconEye

  return (
    <div className="border-t px-5 py-4">
      <div className="flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-medium">
            <IconLockSquare className="text-muted-foreground size-4" aria-hidden="true" />
            Recovery codes
          </p>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Regain access if you lose your 2FA device. Store them in a password manager.
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          {canRegenerateCodes && (
            <Form
              {...regenerateRecoveryCodes.form()}
              options={{ preserveScroll: true }}
              onSuccess={fetchRecoveryCodes}
            >
              {({ processing }) => (
                <Button
                  variant="ghost"
                  size="sm"
                  type="submit"
                  disabled={processing}
                  aria-describedby="regenerate-warning"
                >
                  <IconRefresh /> Regenerate
                </Button>
              )}
            </Form>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleCodesVisibility}
            aria-expanded={codesAreVisible}
            aria-controls="recovery-codes-section"
          >
            <RecoveryCodeIconComponent aria-hidden="true" />
            {codesAreVisible ? 'Hide' : 'View'} codes
          </Button>
        </div>
      </div>
      <div
        id="recovery-codes-section"
        className={`relative overflow-hidden transition-all duration-300 ${codesAreVisible ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}
        aria-hidden={!codesAreVisible}
      >
        <div className="mt-4 space-y-3">
          {errors?.length ? (
            <AlertError errors={errors} />
          ) : (
            <>
              <div
                ref={codesSectionRef}
                className="bg-muted/50 grid gap-x-6 gap-y-1 rounded-md border p-4 font-mono text-sm sm:grid-cols-2"
                role="list"
                aria-label="Recovery codes"
              >
                {recoveryCodesList.length ? (
                  recoveryCodesList.map((code, index) => (
                    <div key={index} role="listitem" className="select-text">
                      {code}
                    </div>
                  ))
                ) : (
                  <div className="space-y-2 sm:col-span-2" aria-label="Loading recovery codes">
                    {Array.from({ length: 8 }, (_, index) => (
                      <div
                        key={index}
                        className="bg-muted-foreground/20 h-4 animate-pulse rounded"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                )}
              </div>

              <p id="regenerate-warning" className="text-muted-foreground text-xs select-none">
                Each recovery code can be used once to access your account and will be removed after
                use. If you need more, click <span className="font-medium">Regenerate</span> above.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
