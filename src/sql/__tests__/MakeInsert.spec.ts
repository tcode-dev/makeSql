import { describe, expect, it } from 'vitest'
import MakeInsert from '@/sql/MakeInsert'
import { makeConfig } from './helper'

const contents = 'id,name\n1,foo\n2,bar'

describe('MakeInsert', () => {
  it('bulk が有効なら1つの INSERT 文にまとめる', () => {
    const sql = new MakeInsert('users', contents, makeConfig({ bulk: true }))

    expect(sql.make()).toBe("insert into users\n(id, name)\nvalues\n('1','foo')\n,('2','bar')\n;")
  })

  it('bulk が無効なら行ごとに INSERT 文を作る', () => {
    const sql = new MakeInsert('users', contents, makeConfig({ bulk: false }))

    expect(sql.make()).toBe("insert into users (id, name) values ('1','foo');\n" + "insert into users (id, name) values ('2','bar');")
  })

  it('quotation が無効なら値をクォートしない', () => {
    const sql = new MakeInsert('users', contents, makeConfig({ bulk: false, quotation: false }))

    expect(sql.make()).toBe('insert into users (id, name) values (1,foo);\ninsert into users (id, name) values (2,bar);')
  })

  it('タブ区切りを扱える', () => {
    const sql = new MakeInsert('users', 'id\tname\n1\tfoo', makeConfig({ bulk: false, delimiter: 'tab' }))

    expect(sql.make()).toBe("insert into users (id, name) values ('1','foo');")
  })

  it('uppercase ならキーワードを大文字にする', () => {
    const sql = new MakeInsert('users', 'id\n1', makeConfig({ bulk: false, lettercase: 'uppercase' }))

    expect(sql.make()).toBe("INSERT INTO users (id) VALUES ('1');")
  })
})
