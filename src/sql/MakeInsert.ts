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
        return `(${this.makeValues(row)})`
      })
      .join('\n,')

    return `${this.config.insert} ${this.config.into} ${this.tableName}\n${fieldPhrase}\n${this.config.values}\n${valuePhrase}\n;`
  }

  splitSql() {
    const { fields, values } = this.getValue()
    const fieldPhrase = `(${fields.join(', ')})`

    return values
      .map((row) => {
        return `${this.config.insert} ${this.config.into} ${this.tableName} ${fieldPhrase} ${this.config.values} (${this.makeValues(row)});`
      })
      .join('\n')
  }

  makeValues(row: string[]) {
    return row.map((value) => this.quote(value)).join(',')
  }
}
