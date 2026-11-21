import { describe, expect, it } from 'vitest'
import MakeSelect from '@/sql/MakeSelect'
import { makeConfig } from './helper'

const contents = 'id,name\n1,foo\n2,bar'

describe('MakeSelect', () => {
  it('bulk が有効なら1つの SELECT 文にまとめる', () => {
    const sql = new MakeSelect('users', contents, makeConfig({ bulk: true }))

    expect(sql.make()).toBe("select *\nfrom users\nwhere\n(id = '1' and name = 'foo')\nor (id = '2' and name = 'bar')\n;")
  })

  it('bulk が有効で1行だけなら括弧を付けない', () => {
    const sql = new MakeSelect('users', 'id,name\n1,foo', makeConfig({ bulk: true }))

    expect(sql.make()).toBe("select *\nfrom users\nwhere\nid = '1' and name = 'foo'\n;")
  })

  it('bulk が無効なら行ごとに SELECT 文を作る', () => {
    const sql = new MakeSelect('users', contents, makeConfig({ bulk: false }))

    expect(sql.make()).toBe("select * from users where id = '1' and name = 'foo';\n" + "select * from users where id = '2' and name = 'bar';")
  })

  it('uppercase ならキーワードを大文字にする', () => {
    const sql = new MakeSelect('users', 'id\n1', makeConfig({ bulk: false, lettercase: 'uppercase' }))

    expect(sql.make()).toBe("SELECT * FROM users WHERE id = '1';")
  })

  it('camelcase ならキーワードを先頭大文字にする', () => {
    const sql = new MakeSelect('users', 'id\n1', makeConfig({ bulk: false, lettercase: 'camelcase' }))

    expect(sql.make()).toBe("Select * From users Where id = '1';")
  })
})
