/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_APP_NAME: StringIterator
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
