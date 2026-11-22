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
  describe('canMakeFromText', () => {
    const input = { tableName: 'users', updates: '', contents: 'id\n1' }

    it.each<SqlType>(['select', 'insert', 'delete'])('%s はテーブル名とテーブル情報があれば作れる', (type) => {
      expect(SqlFactory.canMakeFromText(type, input)).toBe(true)
    })

    it.each<SqlType>(['select', 'insert', 'delete', 'update'])('%s はテーブル名がないと作れない', (type) => {
      expect(SqlFactory.canMakeFromText(type, { ...input, tableName: '', updates: 'name\nbaz' })).toBe(false)
    })

    it.each<SqlType>(['select', 'insert', 'delete', 'update'])('%s はテーブル情報がないと作れない', (type) => {
      expect(SqlFactory.canMakeFromText(type, { ...input, contents: '', updates: 'name\nbaz' })).toBe(false)
    })

    it('update は更新情報がないと作れない', () => {
      expect(SqlFactory.canMakeFromText('update', input)).toBe(false)
    })

    it('update はテーブル名・テーブル情報・更新情報がそろえば作れる', () => {
      expect(SqlFactory.canMakeFromText('update', { ...input, updates: 'name\nbaz' })).toBe(true)
    })
  })

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
