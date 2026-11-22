import InputError from '@/util/InputError'

export type Config = {
  and: string
  bulk: boolean
  delete: string
  delimiter: string
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

  // 1行目を列名、2行目以降を値として分ける。値の行がない場合や、列数が1行目と違う行がある場合はエラーにする
  getData(data: string) {
    // 末尾の改行で空の行ができないよう取り除く
    const values = data.replace(/\n+$/, '').split('\n')
    const fields = values.shift()!.split(this.config.delimiter)

    if (values.length === 0) {
      throw new InputError('値の行がありません。1行目に列名、2行目以降に値を入力してください。')
    }

    const invalidRow = values.find((row) => row.split(this.config.delimiter).length !== fields.length)

    if (invalidRow !== undefined) {
      throw new InputError(`列数が1行目 (${fields.length}列) と一致しない行があります: "${invalidRow}"`)
    }

    return { fields, values }
  }

  where() {
    const { fields, values } = this.getValue()

    return this.combine(fields, values, ` ${this.config.and} `)
  }

  combine(fields: string[], values: string[], delimiter: Config['delimiter']) {
    return values.map((rowValue) => {
      return rowValue
        .split(this.config.delimiter)
        .map((colValue, colIndex) => {
          return `${fields[colIndex]} = ${this.quote(colValue)}`
        })
        .join(delimiter)
    })
  }

  // クォートで囲む場合は、値に含まれるクォートを二重にしてエスケープする
  quote(value: string) {
    const { quotation } = this.config

    if (quotation === '') {
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
