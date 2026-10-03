import { Form, Head, Link, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController'
import DeleteUser from '@/components/delete-user'
import InputError from '@/components/input-error'
import { SettingsSection } from '@/components/settings-section'
import { StatusBadge } from '@/components/status-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useInitials } from '@/hooks/use-initials'
import { edit } from '@/routes/profile'
import { send } from '@/routes/verification'

export default function Profile({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean
  status?: string
}) {
  const { auth } = usePage().props
  const getInitials = useInitials()
  const isEmailUnverified = mustVerifyEmail && auth.user.email_verified_at === null

  return (
    <>
      <Head title="Profile settings" />

      <div className="flex items-center gap-4 border-b py-8">
        <Avatar className="size-14">
          <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
          <AvatarFallback className="text-lg font-semibold">
            {getInitials(auth.user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold tracking-tight">{auth.user.name}</p>
          <p className="text-muted-foreground truncate text-sm">{auth.user.email}</p>
        </div>
        <p className="text-muted-foreground ml-auto hidden font-mono text-xs whitespace-nowrap sm:block">
          Joined {format(new Date(auth.user.created_at), 'MMM yyyy')}
        </p>
      </div>

      <SettingsSection
        label="Profile"
        title="Personal information"
        description="Update your name and the email address you sign in with."
      >
        <Form
          {...ProfileController.update.form()}
          options={{
            preserveScroll: true,
          }}
          className="flex flex-col gap-5"
        >
          {({ processing, errors }) => (
            <>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>

                <Input
                  id="name"
                  defaultValue={auth.user.name}
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Full name"
                />

                <InputError message={errors.name} />
              </Field>

              <Field>
                <div className="flex items-center justify-between gap-3">
                  <FieldLabel htmlFor="email">Email address</FieldLabel>
                  {mustVerifyEmail &&
                    (isEmailUnverified ? (
                      <StatusBadge tone="warning">Unverified</StatusBadge>
                    ) : (
                      <StatusBadge tone="success">Verified</StatusBadge>
                    ))}
                </div>

                <Input
                  id="email"
                  type="email"
                  defaultValue={auth.user.email}
                  name="email"
                  required
                  autoComplete="username"
                  placeholder="Email address"
                />

                <InputError message={errors.email} />

                {isEmailUnverified && (
                  <p className="text-muted-foreground text-sm">
                    Your email address is unverified.{' '}
                    <Link
                      href={send()}
                      as="button"
                      className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                    >
                      Resend verification email
                    </Link>
                  </p>
                )}

                {status === 'verification-link-sent' && (
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    A new verification link has been sent to your email address.
                  </p>
                )}
              </Field>

              <div className="flex justify-end">
                <Button type="submit" disabled={processing} data-test="update-profile-button">
                  Save
                </Button>
              </div>
            </>
          )}
        </Form>
      </SettingsSection>

      <DeleteUser />
    </>
  )
}

Profile.layout = {
  breadcrumbs: [
    {
      title: 'Settings',
      href: edit(),
    },
    {
      title: 'Profile',
      href: edit(),
    },
  ],
}
