import { test as base, expect } from '@playwright/test'

// index.html は Google Analytics と Semantic UI の CSS を外部から読み込んでいる。
// テストで本番の Analytics に計測が送られないよう、またネットワークに左右されないよう、
// localhost 以外への通信はすべて遮断する。
export const test = base.extend<{ blockExternalRequests: void }>({
  blockExternalRequests: [
    async ({ context }, use) => {
      await context.route(
        (url) => url.hostname !== 'localhost',
        (route) => route.abort()
      )
      await use()
    },
    { auto: true }
  ]
})

export { expect }
