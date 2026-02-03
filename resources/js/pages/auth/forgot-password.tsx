import TextLink from '@/components/text-link'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
import { login } from '@/routes'
import { email } from '@/routes/password'
import { Form, Head } from '@inertiajs/react'
import { IconMailCheck } from '@tabler/icons-react'

export default function ForgotPassword({ status }: { status?: string }) {
  return (
    <AuthLayout
      title="Forgot password"
      description="Enter your email to receive a password reset link"
    >
      <Head title="Forgot password" />

      {status && (
        <Alert className="mb-4">
          <IconMailCheck stroke={2} />
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <Form {...email.form()} disableWhileProcessing>
          {({ processing, errors }) => (
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  placeholder="email@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>

              <Button
                className="w-full"
                data-test="email-password-reset-link-button"
              >
                {processing && <Spinner />}
                Email password reset link
              </Button>
            </FieldGroup>
          )}
        </Form>

        <div className="space-x-1 text-center text-sm text-muted-foreground">
          <span>Or, return to</span>
          <TextLink href={login()}>log in</TextLink>
        </div>
      </div>
    </AuthLayout>
  )
}
