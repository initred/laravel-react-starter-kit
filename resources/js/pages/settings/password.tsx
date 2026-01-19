import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController'
import { Button } from '@/components/ui/button'
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
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { edit } from '@/routes/user-password'
import { type BreadcrumbItem } from '@/types'
import { Transition } from '@headlessui/react'
import { Form, Head } from '@inertiajs/react'
import { useRef } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Password settings',
    href: edit().url,
  },
]

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null)
  const currentPasswordInput = useRef<HTMLInputElement>(null)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Password settings" />

      <h1 className="sr-only">Password Settings</h1>

      <SettingsLayout>
        <Form
          {...PasswordController.update.form()}
          options={{
            preserveScroll: true,
          }}
          resetOnError={[
            'password',
            'password_confirmation',
            'current_password',
          ]}
          resetOnSuccess
          onError={(errors) => {
            if (errors.password) {
              passwordInput.current?.focus()
            }

            if (errors.current_password) {
              currentPasswordInput.current?.focus()
            }
          }}
        >
          {({ errors, processing, recentlySuccessful }) => (
            <FieldSet>
              <FieldLegend>Update password</FieldLegend>
              <FieldDescription>
                Ensure your account is using a long, random password to stay
                secure
              </FieldDescription>
              <FieldGroup>
                <Field data-invalid={!!errors.current_password}>
                  <FieldLabel htmlFor="current_password">
                    Current password
                  </FieldLabel>
                  <Input
                    id="current_password"
                    ref={currentPasswordInput}
                    name="current_password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Current password"
                    aria-invalid={!!errors.current_password}
                  />
                  {errors.current_password && (
                    <FieldError>{errors.current_password}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="password">New password</FieldLabel>
                  <Input
                    id="password"
                    ref={passwordInput}
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="New password"
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && (
                    <FieldError>{errors.password}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.password_confirmation}>
                  <FieldLabel htmlFor="password_confirmation">
                    Confirm password
                  </FieldLabel>
                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    aria-invalid={!!errors.password_confirmation}
                  />
                  {errors.password_confirmation && (
                    <FieldError>{errors.password_confirmation}</FieldError>
                  )}
                </Field>

                <div className="flex items-center gap-4">
                  <Button
                    disabled={processing}
                    data-test="update-password-button"
                  >
                    Save password
                  </Button>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-neutral-600">Saved</p>
                  </Transition>
                </div>
              </FieldGroup>
            </FieldSet>
          )}
        </Form>
      </SettingsLayout>
    </AppLayout>
  )
}
