import { describe, expect, it } from 'vitest'
import MakeUpdate from '@/sql/MakeUpdate'
import { makeConfig } from './helper'

const updates = 'name,age\nbaz,20'
const contents = 'id\n1\n2'

describe('MakeUpdate', () => {
  it('bulk が有効なら1つの UPDATE 文にまとめる', () => {
    const sql = new MakeUpdate('users', updates, contents, makeConfig({ bulk: true }))

    // 他の文と違い、末尾の ; の前に改行が入らない
    expect(sql.make()).toBe("update\nusers\nset name = 'baz', age = '20'\nwhere\n(id = '1')\nor (id = '2');")
  })

  it('bulk が無効なら行ごとに UPDATE 文を作る', () => {
    const sql = new MakeUpdate('users', updates, contents, makeConfig({ bulk: false }))

    expect(sql.make()).toBe("update users set name = 'baz', age = '20' where id = '1';\n" + "update users set name = 'baz', age = '20' where id = '2';")
  })

  it('updates の2行目以降は無視して1行目だけを SET に使う', () => {
    const sql = new MakeUpdate('users', 'name\nbaz\nqux', 'id\n1', makeConfig({ bulk: false }))

    expect(sql.make()).toBe("update users set name = 'baz' where id = '1';")
  })

  it('updates と contents の末尾に改行があっても余分な条件を作らない', () => {
    const sql = new MakeUpdate('users', 'name\nbaz\n', 'id\n1\n2\n', makeConfig({ bulk: true }))

    expect(sql.make()).toBe("update\nusers\nset name = 'baz'\nwhere\n(id = '1')\nor (id = '2');")
  })

  it('uppercase かつ quotation 無効', () => {
    const sql = new MakeUpdate('users', 'age\n20', 'id\n1', makeConfig({ bulk: false, lettercase: 'uppercase', quotation: false }))

    expect(sql.make()).toBe('UPDATE users SET age = 20 WHERE id = 1;')
  })
})
