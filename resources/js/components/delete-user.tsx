import { Form } from '@inertiajs/react'
import { useRef } from 'react'
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController'
import InputError from '@/components/input-error'
import PasswordInput from '@/components/password-input'
import { SettingsSection } from '@/components/settings-section'
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
import { Field, FieldLabel } from '@/components/ui/field'

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null)

  return (
    <SettingsSection
      label="Danger zone"
      tone="destructive"
      title="Delete account"
      description="This cannot be undone."
    >
      <div className="border-destructive/30 flex flex-wrap items-center justify-between gap-4 rounded-lg border p-5">
        <p className="text-muted-foreground min-w-60 flex-1 text-sm">
          Permanently delete your account and all of its resources. You'll be asked for your
          password to confirm.
        </p>

        <Dialog>
          <DialogTrigger render={<Button variant="destructive" data-test="delete-user-button" />}>
            Delete account
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will also be permanently
              deleted. Please enter your password to confirm you would like to permanently delete
              your account.
            </DialogDescription>

            <Form
              {...ProfileController.destroy.form()}
              options={{
                preserveScroll: true,
              }}
              onError={() => passwordInput.current?.focus()}
              resetOnSuccess
              className="space-y-6"
            >
              {({ resetAndClearErrors, processing, errors }) => (
                <>
                  <Field>
                    <FieldLabel htmlFor="password" className="sr-only">
                      Password
                    </FieldLabel>

                    <PasswordInput
                      id="password"
                      name="password"
                      ref={passwordInput}
                      placeholder="Password"
                      autoComplete="current-password"
                    />

                    <InputError message={errors.password} />
                  </Field>

                  <DialogFooter className="gap-2">
                    <DialogClose
                      render={<Button variant="secondary" onClick={() => resetAndClearErrors()} />}
                    >
                      Cancel
                    </DialogClose>

                    <Button
                      variant="destructive"
                      disabled={processing}
                      type="submit"
                      data-test="confirm-delete-user-button"
                    >
                      Delete account
                    </Button>
                  </DialogFooter>
                </>
              )}
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </SettingsSection>
  )
}
