import type { InertiaLinkProps } from '@inertiajs/react'

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
  return typeof url === 'string' ? url : url.url
}
