import Papa from 'papaparse'
import InputError from '@/util/InputError'

// 入力を行と列に分ける。末尾の改行と、末尾の空白 (スペース・タブ) だけの行は空の行として扱わない。
// 空の行は列のない行 ([]) にして、ダブルクォートで囲んだ空の値だけの行 (['']) と区別する。
// カンマ・タブ区切りは CSV の形式として読み、ダブルクォートで囲んだ値の中の区切り文字や改行も値として扱う
export const parseTable = (text: string, delimiter: string | RegExp): string[][] => {
  // 表計算ソフトやエディタからコピーすると末尾に空白だけの行が混ざりやすいため、末尾の改行と一緒に取り除く
  const trimmed = text.replace(/(\n[ \t]*)+$/, '')

  if (typeof delimiter !== 'string') {
    // スペース区切りは CSV の形式ではないため、行ごとに分ける。
    // 行頭・行末の空白で空の列ができないよう、先に取り除く
    return trimmed.split('\n').map((row) => (row.trim() === '' ? [] : row.trim().split(delimiter)))
  }

  const rows: string[][] = []
  const errors: Papa.ParseError[] = []
  let cursor = 0

  // 空の行も "" だけの行も [''] として読まれるため、行ごとに元の文字列を見て空の行を見分ける
  Papa.parse<string[]>(trimmed, {
    delimiter,
    newline: '\n',
    step: ({ data, errors: rowErrors, meta }) => {
      const raw = trimmed.slice(cursor, meta.cursor).replace(/\n$/, '')

      cursor = meta.cursor
      rows.push(raw === '' ? [] : data)
      errors.push(...rowErrors)
    }
  })

  if (errors.length > 0) {
    throw new InputError(
      errors[0].type === 'Quotes' ? 'ダブルクォート (") の使い方が正しくない値があります。値をダブルクォートで囲む場合は閉じるダブルクォートも入力し、値の中のダブルクォートは "" と2つ重ねてください。' : 'テーブル情報を読み込めませんでした。区切り文字の設定と入力の形式を確認してください。'
    )
  }

  return rows
}

// parseTable で読み直すと同じ行と列になる文字列に戻す
export const serializeTable = (rows: string[][], delimiter: string | RegExp) => {
  if (typeof delimiter !== 'string') {
    return rows.map((row) => row.join(' ')).join('\n')
  }

  // 空の値はダブルクォートで囲み、空の値だけの行が読み直したときに空の行にならないようにする
  return Papa.unparse(rows, { delimiter, newline: '\n', quotes: (value: unknown) => value === '' })
}
