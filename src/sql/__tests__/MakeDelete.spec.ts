import { describe, expect, it } from 'vitest'
import MakeDelete from '@/sql/MakeDelete'
import { makeConfig } from './helper'

const contents = 'id,name\n1,foo\n2,bar'

describe('MakeDelete', () => {
  it('bulk が有効なら1つの DELETE 文にまとめる', () => {
    const sql = new MakeDelete('users', contents, makeConfig({ bulk: true }))

    expect(sql.make()).toBe("delete\nfrom users\nwhere\n(id = '1' and name = 'foo')\nor (id = '2' and name = 'bar')\n;")
  })

  it('bulk が無効なら行ごとに DELETE 文を作る', () => {
    const sql = new MakeDelete('users', contents, makeConfig({ bulk: false }))

    expect(sql.make()).toBe("delete from users where id = '1' and name = 'foo';\n" + "delete from users where id = '2' and name = 'bar';")
  })

  it('uppercase かつ quotation 無効', () => {
    const sql = new MakeDelete('users', 'id\n1', makeConfig({ bulk: false, lettercase: 'uppercase', quotation: false }))

    expect(sql.make()).toBe('DELETE FROM users WHERE id = 1;')
  })
})
