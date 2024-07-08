/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_USE_BACKEND: string
    readonly VITE_BACKEND_PATH: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }