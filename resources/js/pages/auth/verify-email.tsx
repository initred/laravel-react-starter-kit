// Components
import TextLink from '@/components/text-link'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { logout } from '@/routes'
import { send } from '@/routes/verification'
import { Form, Head } from '@inertiajs/react'
import { IconMailCheck } from '@tabler/icons-react'

export default function VerifyEmail({ status }: { status?: string }) {
  return (
    <AuthLayout
      title="Verify email"
      description="Please verify your email address by clicking on the link we just emailed to you."
    >
      <Head title="Email verification" />

      {status === 'verification-link-sent' && (
        <Alert className="mb-4">
          <IconMailCheck stroke={2} />
          <AlertDescription>
            A new verification link has been sent to the email address you
            provided during registration.
          </AlertDescription>
        </Alert>
      )}

      <Form
        {...send.form()}
        disableWhileProcessing
        className="space-y-6 text-center"
      >
        {({ processing }) => (
          <>
            <Button variant="secondary">
              {processing && <Spinner />}
              Resend verification email
            </Button>

            <TextLink href={logout()} className="mx-auto block text-sm">
              Log out
            </TextLink>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
