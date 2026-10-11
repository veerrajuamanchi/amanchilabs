import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    baseURL: process.env.SITE_TEST_URL ?? 'http://127.0.0.1:5174',
    channel: process.env.PLAYWRIGHT_CHANNEL,
    viewport: { width: 1440, height: 900 },
    trace: 'retain-on-failure',
  },
  webServer: process.env.SITE_TEST_URL ? undefined : {
    command: 'npm run dev -- --host 127.0.0.1 --port 5174 --strictPort',
    url: 'http://127.0.0.1:5174',
    reuseExistingServer: !process.env.CI,
  },
})