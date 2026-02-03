import TextLink from '@/components/text-link'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { register } from '@/routes'
import { privacy, terms } from '@/routes/docs'
import { store } from '@/routes/login'
import { request } from '@/routes/password'
import { Form, Head } from '@inertiajs/react'
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface LoginProps {
  status?: string
  canResetPassword: boolean
  canRegister: boolean
}

export default function Login({
  status,
  canResetPassword,
  canRegister,
}: LoginProps) {
  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email and password below to log in"
    >
      <Head title="Log in" />

      <Form
        {...store.form()}
        resetOnSuccess={['password']}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            {status && (
              <FieldGroup>
                <Alert>
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
                  <AlertDescription>{status}</AlertDescription>
                </Alert>
              </FieldGroup>
            )}

            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  placeholder="email@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.password}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {canResetPassword && (
                    <TextLink
                      href={request()}
                      className="ml-auto text-sm"
                      tabIndex={5}
                    >
                      Forgot password?
                    </TextLink>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  placeholder="Password"
                  aria-invalid={!!errors.password}
                />
                {errors.password && <FieldError>{errors.password}</FieldError>}
              </Field>

              <Field orientation="horizontal">
                <Checkbox id="remember" name="remember" tabIndex={3} />
                <FieldLabel htmlFor="remember">Remember me</FieldLabel>
              </Field>

              <Button
                type="submit"
                className="mt-4 w-full"
                tabIndex={4}
                data-test="login-button"
              >
                {processing && <Spinner />}
                Log in
              </Button>
            </FieldGroup>

            {canRegister && (
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <TextLink href={register()} tabIndex={5}>
                  Sign up
                </TextLink>
              </div>
            )}

            <FieldDescription className="mt-4 px-6 text-center">
              By clicking continue, you agree to our{' '}
              <TextLink href={terms()}>Terms of Service</TextLink> and{' '}
              <TextLink href={privacy()}>Privacy Policy</TextLink>.
            </FieldDescription>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
