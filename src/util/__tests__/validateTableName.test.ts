import { describe, expect, it } from 'vitest'
import { validateTableName } from '@/util/validateTableName'
import InputError from '@/util/InputError'

describe('validateTableName', () => {
  it.each(['users', 'Users_2_log'])('使える文字だけの "%s" は何もしない', (name) => {
    expect(() => validateTableName(name)).not.toThrow()
  })

  it.each(['user-list', 'my table', 'x;drop', 'sales.users', 'ユーザー', ''])('使えない文字を含む "%s" は InputError にする', (name) => {
    expect(() => validateTableName(name)).toThrow(InputError)
  })
})
