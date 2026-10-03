import { Head } from '@inertiajs/react'
import AppearancePicker from '@/components/appearance-picker'
import { SettingsSection } from '@/components/settings-section'
import { edit as editAppearance } from '@/routes/appearance'
import { edit as editProfile } from '@/routes/profile'

export default function Appearance() {
  return (
    <>
      <Head title="Appearance settings" />

      <SettingsSection
        label="Theme"
        title="Interface theme"
        description="Choose how the app looks on this device. System follows your OS setting."
      >
        <AppearancePicker />
      </SettingsSection>
    </>
  )
}

Appearance.layout = {
  breadcrumbs: [
    {
      title: 'Settings',
      href: editProfile(),
    },
    {
      title: 'Appearance',
      href: editAppearance(),
    },
  ],
}
