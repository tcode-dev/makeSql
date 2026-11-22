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

  it('途中の空の行は1列の空の値として残す', () => {
    expect(parseTable('id\n1\n\n2', ',')).toEqual([['id'], ['1'], [''], ['2']])
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
  it.each([',', '\t'])('区切り文字 "%s" で戻した文字列を読み直すと、途中の空の行も含めて同じ行と列になる', (delimiter) => {
    const rows = [['id', 'memo'], ['1', `a${delimiter}b`], [''], ['2', 'say "hi"\nbye']]

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
