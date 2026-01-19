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
import { store } from '@/routes/password/confirm'
import { Form, Head } from '@inertiajs/react'

export default function ConfirmPassword() {
  return (
    <AuthLayout
      title="Confirm your password"
      description="This is a secure area of the application. Please confirm your password before continuing."
    >
      <Head title="Confirm password" />

      <Form
        {...store.form()}
        disableWhileProcessing
        resetOnSuccess={['password']}
      >
        {({ processing, errors }) => (
          <FieldGroup>
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                autoFocus
                aria-invalid={!!errors.password}
              />
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            <Button
              className="w-full"
              disabled={processing}
              data-test="confirm-password-button"
            >
              {processing && <Spinner />}
              Confirm password
            </Button>
          </FieldGroup>
        )}
      </Form>
    </AuthLayout>
  )
}
