import { defineConfig, devices } from '@playwright/test'

const port = 4173
// BASE_URL を指定すると、そのサイト (デプロイ後の本番など) に対してテストする
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`

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
  // BASE_URL を指定したときは、そのサイトに対してテストするのでサーバーを起動しない
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npm run build-only && npm run preview -- --port ${port} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000
      }
})
