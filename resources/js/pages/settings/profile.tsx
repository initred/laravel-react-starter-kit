import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController'
import DeleteUser from '@/components/delete-user'
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
import { edit } from '@/routes/profile'
import { send } from '@/routes/verification'
import { type BreadcrumbItem, type SharedData } from '@/types'
import { Transition } from '@headlessui/react'
import { Form, Head, Link, usePage } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Profile settings',
    href: edit().url,
  },
]

export default function Profile({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean
  status?: string
}) {
  const { auth } = usePage<SharedData>().props

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />

      <h1 className="sr-only">Profile Settings</h1>

      <SettingsLayout>
        <Form
          {...ProfileController.update.form()}
          options={{
            preserveScroll: true,
          }}
        >
          {({ processing, recentlySuccessful, errors }) => (
            <FieldSet>
              <FieldLegend>Profile information</FieldLegend>
              <FieldDescription>
                Update your name and email address
              </FieldDescription>
              <FieldGroup>
                <Field data-invalid={!!errors.name}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    defaultValue={auth.user.name}
                    name="name"
                    required
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
                    defaultValue={auth.user.email}
                    name="email"
                    required
                    autoComplete="username"
                    placeholder="Email address"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </Field>

                {mustVerifyEmail && auth.user.email_verified_at === null && (
                  <div>
                    <p className="-mt-4 text-sm text-muted-foreground">
                      Your email address is unverified.{' '}
                      <Link
                        href={send()}
                        as="button"
                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                      >
                        Click here to resend the verification email.
                      </Link>
                    </p>

                    {status === 'verification-link-sent' && (
                      <div className="mt-2 text-sm font-medium text-green-600">
                        A new verification link has been sent to your email
                        address.
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <Button
                    disabled={processing}
                    data-test="update-profile-button"
                  >
                    Save
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

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  )
}
