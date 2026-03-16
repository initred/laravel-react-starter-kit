import { ImportMetaEnv } from '@/types/vite-env'

export default function env(
  key: keyof ImportMetaEnv,
  defaultValue: string = '',
): string {
  const value = import.meta.env[key] || defaultValue

  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${key} is not defined`)
  } else {
    return value
  }
}
