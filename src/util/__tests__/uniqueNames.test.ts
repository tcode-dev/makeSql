import { describe, expect, it } from 'vitest'
import { uniqueNames } from '@/util/uniqueNames'

describe('uniqueNames', () => {
  it('重なりがなければそのまま返す', () => {
    expect(uniqueNames(['users', 'items'])).toEqual(['users', 'items'])
  })

  it('同じ名前の2つ目以降に連番を付ける', () => {
    expect(uniqueNames(['users', 'items', 'users', 'users'])).toEqual(['users', 'items', 'users_2', 'users_3'])
  })

  it('連番を付けた名前が既にあれば、さらに別の名前にする', () => {
    expect(uniqueNames(['users', 'users_2', 'users'])).toEqual(['users', 'users_2', 'users_3'])
  })

  it('大文字と小文字だけが違う名前も重なりとして扱い、元の表記は残す', () => {
    expect(uniqueNames(['Users', 'users', 'USERS_2'])).toEqual(['Users', 'users_2', 'USERS_2_2'])
  })
})
