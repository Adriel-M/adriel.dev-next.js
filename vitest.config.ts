import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node', // Node because we're not testing DOM
  },
})
