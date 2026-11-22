import Papa from 'papaparse'
import InputError from '@/util/InputError'

// 入力を行と列に分ける。末尾の改行は空の行として扱わない。
// カンマ・タブ区切りは CSV の形式として読み、ダブルクォートで囲んだ値の中の区切り文字や改行も値として扱う
export const parseTable = (text: string, delimiter: string | RegExp): string[][] => {
  const trimmed = text.replace(/\n+$/, '')

  if (typeof delimiter !== 'string') {
    // スペース区切りは CSV の形式ではないため、行ごとに分ける。
    // 行頭・行末の空白で空の列ができないよう、先に取り除く
    return trimmed.split('\n').map((row) => row.trim().split(delimiter))
  }

  const { data, errors } = Papa.parse<string[]>(trimmed, { delimiter, newline: '\n' })

  if (errors.length > 0) {
    throw new InputError(
      errors[0].type === 'Quotes' ? 'ダブルクォート (") の使い方が正しくない値があります。値をダブルクォートで囲む場合は閉じるダブルクォートも入力し、値の中のダブルクォートは "" と2つ重ねてください。' : 'テーブル情報を読み込めませんでした。区切り文字の設定と入力の形式を確認してください。'
    )
  }

  return data
}

// parseTable で読み直すと同じ行と列になる文字列に戻す
export const serializeTable = (rows: string[][], delimiter: string | RegExp) => {
  if (typeof delimiter !== 'string') {
    return rows.map((row) => row.join(' ')).join('\n')
  }

  return Papa.unparse(rows, { delimiter, newline: '\n' })
}
