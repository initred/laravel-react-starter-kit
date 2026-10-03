import env from '@/lib/env'
import AppLogoIcon from './app-logo-icon'

export default function AppLogo() {
  return (
    <>
      <div className="bg-primary text-primary-foreground flex aspect-square size-7 shrink-0 items-center justify-center rounded-md">
        <AppLogoIcon className="size-4 fill-current" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="truncate leading-tight font-semibold">
          {env('VITE_APP_NAME', 'Laravel Starter Kit')}
        </span>
      </div>
    </>
  )
}
