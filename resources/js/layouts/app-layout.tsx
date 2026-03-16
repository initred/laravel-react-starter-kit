import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout'
import { AppLayoutProps } from '@/types/ui'

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
    {children}
  </AppLayoutTemplate>
)
