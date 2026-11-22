import InputError from '@/util/InputError'
import { parseTable, serializeTable } from '@/util/table'

export type Config = {
  and: string
  bulk: boolean
  delete: string
  delimiter: string | RegExp
  from: string
  insert: string
  into: string
  or: string
  quotation: string
  select: string
  set: string
  update: string
  values: string
  where: string
}

export default class MakeSql {
  protected tableName: string
  protected contents: string
  protected config: Config

  constructor(tableName: string, contents: string, config: Config) {
    this.tableName = tableName
    this.contents = contents
    this.config = config
  }

  getValue() {
    return this.getData(this.contents)
  }

  // 1行目を列名、2行目以降を値として分ける。値の行がない場合、途中に空の行がある場合、
  // 列数が1行目と違う行がある場合はエラーにする
  getData(data: string) {
    const [fields = [], ...values] = parseTable(data, this.config.delimiter)

    if (values.length === 0) {
      throw new InputError('値の行がありません。1行目に列名、2行目以降に値を入力してください。')
    }

    // 空の行は空文字と一致する条件になり、意図しない行を削除・更新しかねないため、エラーにする
    if (values.some((row) => row.length === 1 && row[0] === '')) {
      throw new InputError('空の行があります。値の行の間にある空の行を削除してください。')
    }

    const invalidRow = values.find((row) => row.length !== fields.length)

    if (invalidRow !== undefined) {
      throw new InputError(`列数が1行目 (${fields.length}列) と一致しない行があります: "${serializeTable([invalidRow], this.config.delimiter)}"`)
    }

    return { fields, values }
  }

  where() {
    const { fields, values } = this.getValue()

    return this.combine(fields, values, ` ${this.config.and} `)
  }

  combine(fields: string[], values: string[][], delimiter: string) {
    return values.map((rowValue) => {
      return rowValue
        .map((colValue, colIndex) => {
          return `${fields[colIndex]} = ${this.quote(colValue)}`
        })
        .join(delimiter)
    })
  }

  // クォートで囲む場合は、値に含まれるクォートを二重にしてエスケープする。
  // クォートなしでは空の値を SQL に書けない (`name = ;` になる) ため、エラーにする
  quote(value: string) {
    const { quotation } = this.config

    if (quotation === '') {
      if (value === '') {
        throw new InputError('クォートなしの設定では空の値を使えません。値を入力するか、設定でクォートを有効にしてください。')
      }

      return value
    }

    return `${quotation}${value.replaceAll(quotation, quotation + quotation)}${quotation}`
  }

  bulk(combined: string[]) {
    const lineCount = combined.length

    if (lineCount >= 2) {
      return '(' + combined.join(`)\n${this.config.or} (`) + ')'
    } else if (lineCount === 1) {
      return combined[0]
    } else {
      return ''
    }
  }
}
