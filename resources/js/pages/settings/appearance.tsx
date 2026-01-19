import { Head } from '@inertiajs/react'

import AppearanceTabs from '@/components/appearance-tabs'
import { type BreadcrumbItem } from '@/types'

import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { edit as editAppearance } from '@/routes/appearance'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Appearance settings',
    href: editAppearance().url,
  },
]

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Appearance settings" />

      <h1 className="sr-only">Appearance Settings</h1>

      <SettingsLayout>
        <FieldSet>
          <FieldLegend>Appearance settings</FieldLegend>
          <FieldDescription>
            Update your account's appearance settings
          </FieldDescription>
          <FieldGroup className="flex flex-row">
            <AppearanceTabs />
          </FieldGroup>
        </FieldSet>
      </SettingsLayout>
    </AppLayout>
  )
}
