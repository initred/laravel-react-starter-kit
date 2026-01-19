import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController'
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Form } from '@inertiajs/react'
import { useRef } from 'react'

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null)

  return (
    <FieldSet>
      <FieldLegend>Delete account</FieldLegend>
      <FieldDescription>
        Delete your account and all of its resources
      </FieldDescription>
      <div className="rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <FieldSet>
          <FieldLegend>Warning</FieldLegend>
          <FieldDescription>
            Please proceed with caution, this cannot be undone.
          </FieldDescription>
          <FieldGroup className="flex flex-row">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" data-test="delete-user-button">
                  Delete account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  Are you sure you want to delete your account?
                </DialogTitle>
                <DialogDescription>
                  Once your account is deleted, all of its resources and data
                  will also be permanently deleted. Please enter your password
                  to confirm you would like to permanently delete your account.
                </DialogDescription>

                <Form
                  {...ProfileController.destroy.form()}
                  options={{
                    preserveScroll: true,
                  }}
                  onError={() => passwordInput.current?.focus()}
                  disableWhileProcessing
                  resetOnSuccess
                  className="space-y-6"
                >
                  {({ resetAndClearErrors, processing, errors }) => (
                    <>
                      <Field data-invalid={!!errors.password}>
                        <FieldLabel htmlFor="password" className="sr-only">
                          Password
                        </FieldLabel>
                        <Input
                          id="password"
                          type="password"
                          name="password"
                          ref={passwordInput}
                          placeholder="Password"
                          autoComplete="current-password"
                          aria-invalid={!!errors.password}
                        />
                        {errors.password && (
                          <FieldError>{errors.password}</FieldError>
                        )}
                      </Field>

                      <DialogFooter className="gap-2">
                        <DialogClose asChild>
                          <Button
                            variant="secondary"
                            onClick={() => resetAndClearErrors()}
                          >
                            Cancel
                          </Button>
                        </DialogClose>

                        <Button
                          variant="destructive"
                          type="submit"
                          data-test="confirm-delete-user-button"
                        >
                          {processing && <Spinner />}
                          Delete account
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </Form>
              </DialogContent>
            </Dialog>
          </FieldGroup>
        </FieldSet>
      </div>
    </FieldSet>
  )
}
