import MakeSql from './MakeSql'

export default class MakeInsert extends MakeSql {
  make() {
    if (this.config.bulk) {
      return this.bulkSql()
    } else {
      return this.splitSql()
    }
  }

  bulkSql() {
    const { fields, values } = this.getValue()
    const fieldPhrase = `(${fields.join(', ')})`
    const valuePhrase = values
      .map((row) => {
        return `(${this.config.quotation}${this.makeValues(row)}${this.config.quotation})`
      })
      .join('\n,')

    return `${this.config.insert} ${this.config.into} ${this.tableName}\n${fieldPhrase}\n${this.config.values}\n${valuePhrase}\n;`
  }

  splitSql() {
    const { fields, values } = this.getValue()
    const fieldPhrase = `(${fields.join(', ')})`

    return values
      .map((row) => {
        return `${this.config.insert} ${this.config.into} ${this.tableName} ${fieldPhrase} ${
          this.config.values
        } (${this.config.quotation}${this.makeValues(row)}${this.config.quotation});`
      })
      .join('\n')
  }

  makeValues(row: string) {
    return row
      .split(this.config.delimiter)
      .join(`${this.config.quotation},${this.config.quotation}`)
  }
}
