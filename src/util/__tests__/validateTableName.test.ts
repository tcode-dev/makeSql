import { describe, expect, it } from 'vitest'
import { validateTableName } from '@/util/validateTableName'
import InputError from '@/util/InputError'

describe('validateTableName', () => {
  it.each(['Users_2-log', 'users.2024'])('使える文字だけの "%s" は何もしない', (name) => {
    expect(() => validateTableName(name)).not.toThrow()
  })

  it.each(['my table', 'x;drop', 'ユーザー', 'a/b', ''])('使えない文字を含む "%s" は InputError にする', (name) => {
    expect(() => validateTableName(name)).toThrow(InputError)
  })
})
