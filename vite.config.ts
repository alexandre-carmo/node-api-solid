import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Todos os tests dentro controllers usará o ambiente 'prisma'
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
