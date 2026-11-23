import { describe, expect, it } from 'vitest'
import { parseTable, serializeTable } from '@/util/table'
import InputError from '@/util/InputError'

describe('parseTable', () => {
  it('カンマ区切りを CSV として行と列に分ける', () => {
    expect(parseTable('"id","name"\n1,"Doe, John"', ',')).toEqual([
      ['id', 'name'],
      ['1', 'Doe, John']
    ])
  })

  it('末尾の改行は空の行として扱わない', () => {
    expect(parseTable('id\n1\n\n', ',')).toEqual([['id'], ['1']])
  })

  it('途中の空の行は列のない行として残す', () => {
    expect(parseTable('id\n1\n\n2', ',')).toEqual([['id'], ['1'], [], ['2']])
    expect(parseTable('id\n1\n   \n2', /\s+/)).toEqual([['id'], ['1'], [], ['2']])
  })

  it('ダブルクォートで囲んだ空の値だけの行は空の行と区別する', () => {
    expect(parseTable('id\n""\n\n2', ',')).toEqual([['id'], [''], [], ['2']])
  })

  it('ダブルクォートで囲んだ値の中の空の行は値として扱う', () => {
    expect(parseTable('id\n"a\n\nb"\n2', ',')).toEqual([['id'], ['a\n\nb'], ['2']])
  })

  it('スペース区切りは行頭・行末の空白を取り除いてから分ける', () => {
    expect(parseTable(' id  name \n1 foo', /\s+/)).toEqual([
      ['id', 'name'],
      ['1', 'foo']
    ])
  })

  it('ダブルクォートの使い方が正しくなければ InputError にする', () => {
    expect(() => parseTable('id\n"1', ',')).toThrow(InputError)
    expect(() => parseTable('id\n"1"2', ',')).toThrow(InputError)
  })
})

describe('serializeTable', () => {
  it.each([',', '\t'])('区切り文字 "%s" で戻した文字列を読み直すと、途中の空の行や空の値だけの行も含めて同じ行と列になる', (delimiter) => {
    const rows = [['id', 'memo'], ['1', `a${delimiter}b`], [], [''], ['2', 'say "hi"\nbye']]

    expect(parseTable(serializeTable(rows, delimiter), delimiter)).toEqual(rows)
  })

  it('スペース区切りは空白1つでつなぐ', () => {
    expect(
      serializeTable(
        [
          ['id', 'name'],
          ['1', 'foo']
        ],
        /\s+/
      )
    ).toBe('id name\n1 foo')
  })
})
