import { describe, expect, it } from 'vitest'
import MakeSql from '@/sql/MakeSql'
import { makeConfig } from './helper'

describe('MakeSql', () => {
  describe('getValue', () => {
    it('1行目をフィールド、2行目以降を値として分割する', () => {
      const sql = new MakeSql('users', 'id,name\n1,foo\n2,bar', makeConfig())

      expect(sql.getValue()).toEqual({
        fields: ['id', 'name'],
        values: ['1,foo', '2,bar']
      })
    })
  })

  describe('where', () => {
    it('行ごとに「フィールド = 値」を and で連結する', () => {
      const sql = new MakeSql('users', 'id,name\n1,foo\n2,bar', makeConfig())

      expect(sql.where()).toEqual(["id = '1' and name = 'foo'", "id = '2' and name = 'bar'"])
    })

    it('quotation が無効なら値をクォートしない', () => {
      const sql = new MakeSql('users', 'id\n1', makeConfig({ quotation: false }))

      expect(sql.where()).toEqual(['id = 1'])
    })

    it('lettercase に応じて and の表記が変わる', () => {
      const sql = new MakeSql('users', 'id,name\n1,foo', makeConfig({ lettercase: 'uppercase' }))

      expect(sql.where()).toEqual(["id = '1' AND name = 'foo'"])
    })

    it('タブ区切りを扱える', () => {
      const sql = new MakeSql('users', 'id\tname\n1\tfoo', makeConfig({ delimiter: 'tab' }))

      expect(sql.where()).toEqual(["id = '1' and name = 'foo'"])
    })

    it('スペース区切りを扱える', () => {
      const sql = new MakeSql('users', 'id name\n1 foo', makeConfig({ delimiter: 'space' }))

      expect(sql.where()).toEqual(["id = '1' and name = 'foo'"])
    })
  })

  describe('bulk', () => {
    const sql = new MakeSql('users', '', makeConfig())

    it('2件以上なら括弧で囲んで or で連結する', () => {
      expect(sql.bulk(['a = 1', 'b = 2', 'c = 3'])).toBe('(a = 1)\nor (b = 2)\nor (c = 3)')
    })

    it('1件ならそのまま返す', () => {
      expect(sql.bulk(['a = 1'])).toBe('a = 1')
    })

    it('0件なら空文字を返す', () => {
      expect(sql.bulk([])).toBe('')
    })
  })
})
