import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { update } from '@/routes/password'
import { Form, Head } from '@inertiajs/react'

interface ResetPasswordProps {
  token: string
  email: string
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  return (
    <AuthLayout
      title="Reset password"
      description="Please enter your new password below"
    >
      <Head title="Reset password" />

      <Form
        {...update.form()}
        transform={(data) => ({ ...data, token, email })}
        disableWhileProcessing
        resetOnSuccess={['password', 'password_confirmation']}
      >
        {({ processing, errors }) => (
          <FieldGroup>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                readOnly
                aria-invalid={!!errors.email}
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                autoFocus
                placeholder="Password"
                aria-invalid={!!errors.password}
              />
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.password_confirmation}>
              <FieldLabel htmlFor="password_confirmation">
                Confirm password
              </FieldLabel>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                autoComplete="new-password"
                placeholder="Confirm password"
                aria-invalid={!!errors.password_confirmation}
              />
              {errors.password_confirmation && (
                <FieldError>{errors.password_confirmation}</FieldError>
              )}
            </Field>

            <Button
              type="submit"
              className="mt-4 w-full"
              data-test="reset-password-button"
            >
              {processing && <Spinner />}
              Reset password
            </Button>
          </FieldGroup>
        )}
      </Form>
    </AuthLayout>
  )
}
