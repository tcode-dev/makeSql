import { afterEach, describe, expect, it, vi } from 'vitest'
import DateTime from '@/util/DateTime'

describe('DateTime', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('現在時刻を YYYYMMDDhhmmss 形式でゼロ埋めして返す', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 0, 2, 3, 4, 5))

    expect(new DateTime().now()).toBe('20260102030405')
  })

  it('2桁の値はそのまま返す', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 11, 31, 23, 59, 58))

    expect(new DateTime().now()).toBe('20261231235958')
  })
})
