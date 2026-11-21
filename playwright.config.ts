import { defineConfig, devices } from '@playwright/test'

const port = 4173
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.test.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry'
  },
  // 動作環境として Google Chrome を案内しているため Chromium のみで実行する
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: `npm run build-only && npm run preview -- --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
})
