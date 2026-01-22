import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'

import mkcert from 'vite-plugin-mkcert'
import { devtools } from '@tanstack/devtools-vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    mkcert(),
    devtools(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      srcDirectory: 'src'
    }),
    viteReact(),
  ],
  optimizeDeps: {
    exclude: [
      '@tanstack/start-server-core',
      '@tanstack/react-start',
      '@tanstack/react-start/client',
      '@tanstack/react-start/server',
    ],
  }
})
