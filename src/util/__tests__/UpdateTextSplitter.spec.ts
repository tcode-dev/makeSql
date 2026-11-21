import { describe, expect, it } from 'vitest'
import UpdateTextSplitter from '@/util/UpdateTextSplitter'
import MakeUpdate from '@/sql/MakeUpdate'
import { makeConfig } from '@/sql/__tests__/helper'

describe('UpdateTextSplitter', () => {
  const splitter = new UpdateTextSplitter()

  it('ヘッダーと1行目を updates に、ヘッダーと2行目以降を contents に分ける', () => {
    expect(splitter.split('id,name\nbaz,qux\n1,foo\n2,bar')).toEqual({
      updates: 'id,name\nbaz,qux',
      contents: 'id,name\n1,foo\n2,bar'
    })
  })

  it('分けた結果から MakeUpdate で行ごとの UPDATE 文を作れる', () => {
    const { updates, contents } = splitter.split('name\nbaz\nfoo\nbar')
    const sql = new MakeUpdate('users', updates, contents, makeConfig({ bulk: false }))

    expect(sql.make()).toBe("update users set name = 'baz' where name = 'foo';\nupdate users set name = 'baz' where name = 'bar';")
  })
})
