/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_MY_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
