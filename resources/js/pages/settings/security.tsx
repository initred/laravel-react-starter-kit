import { Form, Head } from '@inertiajs/react'
import { useRef } from 'react'
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController'
import InputError from '@/components/input-error'
import type { Props as ManagePasskeysProps } from '@/components/manage-passkeys'
import ManagePasskeys from '@/components/manage-passkeys'
import type { Props as ManageTwoFactorProps } from '@/components/manage-two-factor'
import ManageTwoFactor from '@/components/manage-two-factor'
import PasswordInput from '@/components/password-input'
import { SettingsSection } from '@/components/settings-section'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { edit as editProfile } from '@/routes/profile'
import { edit } from '@/routes/security'

type Props = {
  passwordRules: string
} & ManagePasskeysProps &
  ManageTwoFactorProps

export default function Security(props: Props) {
  const passwordInput = useRef<HTMLInputElement>(null)
  const currentPasswordInput = useRef<HTMLInputElement>(null)

  return (
    <>
      <Head title="Security settings" />

      <SettingsSection
        label="Password"
        title="Update password"
        description="Use a long, random password to keep your account secure."
      >
        <Form
          {...SecurityController.update.form()}
          options={{
            preserveScroll: true,
          }}
          resetOnError={['password', 'password_confirmation', 'current_password']}
          resetOnSuccess
          onError={(errors) => {
            if (errors.password) {
              passwordInput.current?.focus()
            }

            if (errors.current_password) {
              currentPasswordInput.current?.focus()
            }
          }}
          className="flex flex-col gap-5"
        >
          {({ errors, processing }) => (
            <>
              <Field>
                <FieldLabel htmlFor="current_password">Current password</FieldLabel>

                <PasswordInput
                  id="current_password"
                  ref={currentPasswordInput}
                  name="current_password"
                  autoComplete="current-password"
                  placeholder="Current password"
                />

                <InputError message={errors.current_password} />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
                <Field>
                  <FieldLabel htmlFor="password">New password</FieldLabel>

                  <PasswordInput
                    id="password"
                    ref={passwordInput}
                    name="password"
                    autoComplete="new-password"
                    placeholder="New password"
                    passwordrules={props.passwordRules}
                  />

                  <InputError message={errors.password} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password_confirmation">Confirm password</FieldLabel>

                  <PasswordInput
                    id="password_confirmation"
                    name="password_confirmation"
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    passwordrules={props.passwordRules}
                  />

                  <InputError message={errors.password_confirmation} />
                </Field>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={processing} data-test="update-password-button">
                  Update password
                </Button>
              </div>
            </>
          )}
        </Form>
      </SettingsSection>

      <ManageTwoFactor
        canManageTwoFactor={props.canManageTwoFactor}
        requiresConfirmation={props.requiresConfirmation}
        twoFactorEnabled={props.twoFactorEnabled}
      />

      <ManagePasskeys canManagePasskeys={props.canManagePasskeys} passkeys={props.passkeys} />
    </>
  )
}

Security.layout = {
  breadcrumbs: [
    {
      title: 'Settings',
      href: editProfile(),
    },
    {
      title: 'Security',
      href: edit(),
    },
  ],
}
