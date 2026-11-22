import { describe, expect, it } from 'vitest'
import MakeSql from '@/sql/MakeSql'
import InputError from '@/util/InputError'
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

    it('末尾の改行は空の行として扱わない', () => {
      const sql = new MakeSql('users', 'id,name\n1,foo\n2,bar\n', makeConfig())

      expect(sql.getValue().values).toEqual(['1,foo', '2,bar'])
    })

    it('末尾に改行が複数あっても空の行として扱わない', () => {
      const sql = new MakeSql('users', 'id,name\n1,foo\n\n\n', makeConfig())

      expect(sql.getValue().values).toEqual(['1,foo'])
    })

    it('値の行がなければエラーにする', () => {
      expect(() => new MakeSql('users', 'id,name', makeConfig()).getValue()).toThrow(InputError)
      expect(() => new MakeSql('users', 'id,name\n', makeConfig()).getValue()).toThrow('値の行がありません')
    })

    it('列数が1行目より多い行があればエラーにする', () => {
      const sql = new MakeSql('users', 'id\n1\n1,2', makeConfig())

      expect(() => sql.getValue()).toThrow('列数が1行目 (1列) と一致しない行があります: "1,2"')
    })

    it('列数が1行目より少ない行があればエラーにする', () => {
      const sql = new MakeSql('users', 'id,name\n1', makeConfig())

      expect(() => sql.getValue()).toThrow(InputError)
    })

    it('途中に空の行があればエラーにする', () => {
      expect(() => new MakeSql('users', 'id\n1\n\n2', makeConfig()).getValue()).toThrow('空の行があります')
      expect(() => new MakeSql('users', 'id,name\n1,foo\n\n2,bar', makeConfig()).getValue()).toThrow('空の行があります')
    })

    it('スペース区切りでは空白だけの行も空の行としてエラーにする', () => {
      const sql = new MakeSql('users', 'id\n1\n   \n2', makeConfig({ delimiter: 'space' }))

      expect(() => sql.getValue()).toThrow('空の行があります')
    })

    it('カンマ区切りで空の値だけが並ぶ行は空の行として扱わない', () => {
      const sql = new MakeSql('users', 'id,name\n1,foo\n,', makeConfig())

      expect(sql.getValue().values).toEqual(['1,foo', ','])
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

    it('スペース区切りでは連続した空白を1つの区切りとして扱う', () => {
      const sql = new MakeSql('users', 'id  name\n1   foo', makeConfig({ delimiter: 'space' }))

      expect(sql.where()).toEqual(["id = '1' and name = 'foo'"])
    })

    it('スペース区切りでは行頭・行末の空白を無視する', () => {
      const sql = new MakeSql('users', ' id name \n 1 foo ', makeConfig({ delimiter: 'space' }))

      expect(sql.where()).toEqual(["id = '1' and name = 'foo'"])
    })

    it('タブ区切りでは行末の空の値を残す', () => {
      const sql = new MakeSql('users', 'id\tname\n1\t', makeConfig({ delimiter: 'tab' }))

      expect(sql.where()).toEqual(["id = '1' and name = ''"])
    })

    it('値に含まれるシングルクォートをエスケープする', () => {
      const sql = new MakeSql('users', "name\nO'Brien", makeConfig())

      expect(sql.where()).toEqual(["name = 'O''Brien'"])
    })
  })

  describe('quote', () => {
    it('値をクォートで囲む', () => {
      const sql = new MakeSql('users', '', makeConfig())

      expect(sql.quote('foo')).toBe("'foo'")
    })

    it('値に含まれるシングルクォートを二重にしてエスケープする', () => {
      const sql = new MakeSql('users', '', makeConfig())

      expect(sql.quote("O'Brien")).toBe("'O''Brien'")
      expect(sql.quote("'; drop table users; --")).toBe("'''; drop table users; --'")
    })

    it('quotation が無効なら値をそのまま返す', () => {
      const sql = new MakeSql('users', '', makeConfig({ quotation: false }))

      expect(sql.quote("O'Brien")).toBe("O'Brien")
    })

    it('quotation が無効で値が空ならエラーにする', () => {
      const sql = new MakeSql('users', '', makeConfig({ quotation: false }))

      expect(() => sql.quote('')).toThrow(InputError)
    })

    it('quotation が有効なら空の値は空文字列にする', () => {
      const sql = new MakeSql('users', '', makeConfig())

      expect(sql.quote('')).toBe("''")
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
