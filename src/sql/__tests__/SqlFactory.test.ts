import { describe, expect, it } from 'vitest'
import SqlFactory, { type SqlType } from '@/sql/SqlFactory'
import MakeDelete from '@/sql/MakeDelete'
import MakeInsert from '@/sql/MakeInsert'
import MakeSelect from '@/sql/MakeSelect'
import MakeUpdate from '@/sql/MakeUpdate'
import { makeConfig } from './helper'

const config = makeConfig({ bulk: false })
const factory = new SqlFactory(config)
const contents = 'id,name\n1,foo\n2,bar'

describe('SqlFactory', () => {
  describe('fromText', () => {
    it.each<[SqlType, string]>([
      ['select', new MakeSelect('users', contents, config).make()],
      ['insert', new MakeInsert('users', contents, config).make()],
      ['delete', new MakeDelete('users', contents, config).make()]
    ])('%s は対応する Make* クラスで SQL を作成する', (type, expected) => {
      expect(factory.fromText(type, { tableName: 'users', updates: '', contents })).toBe(expected)
    })

    it('update は updates を SET 句に使う', () => {
      expect(factory.fromText('update', { tableName: 'users', updates: 'name\nbaz', contents: 'id\n1' })).toBe("update users set name = 'baz' where id = '1';")
    })
  })

  describe('fromFile', () => {
    it.each<SqlType>(['select', 'insert', 'delete'])('%s はファイルの内容をそのまま使う', (type) => {
      expect(factory.fromFile(type, 'users', contents)).toBe(factory.fromText(type, { tableName: 'users', updates: '', contents }))
    })

    it('update は2行目を SET 句、3行目以降を WHERE 句に使う', () => {
      expect(factory.fromFile('update', 'users', 'name\nbaz\nfoo\nbar')).toBe(new MakeUpdate('users', 'name\nbaz', 'name\nfoo\nbar', config).make())
    })
  })
})
