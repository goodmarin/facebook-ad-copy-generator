/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 

// Vite define 注入的全局常量声明
declare const __APP_VERSION__: string;