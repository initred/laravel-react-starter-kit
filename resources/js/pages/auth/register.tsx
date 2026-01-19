import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
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
import { login } from '@/routes'
import { privacy, terms } from '@/routes/docs'
import { store } from '@/routes/register'
import { Form, Head } from '@inertiajs/react'

export default function Register() {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Head title="Register" />
      <Form
        {...store.form()}
        resetOnSuccess={['password', 'password_confirmation']}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <FieldGroup>
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="name"
                  placeholder="Full name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  placeholder="email@example.com"
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
                  required
                  tabIndex={3}
                  autoComplete="new-password"
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
                  required
                  tabIndex={4}
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
                className="mt-2 w-full"
                tabIndex={5}
                data-test="register-user-button"
              >
                {processing && <Spinner />}
                Create account
              </Button>
            </FieldGroup>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <TextLink href={login()} tabIndex={6}>
                Log in
              </TextLink>
            </div>

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
