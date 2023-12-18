import MakeSql, { type Config } from './MakeSql'

export default class MakeUpdate extends MakeSql {
  private updates: string

  constructor(tableName: string, updates: string, contents: string, config: Config) {
    super(tableName, contents, config)
    this.updates = updates
  }

  make() {
    if (this.config.bulk) {
      return this.bulkSql()
    } else {
      return this.splitSql()
    }
  }

  bulkSql() {
    const set = this.set()
    const where = this.bulk(this.where())

    return `${this.config.update}\n${this.tableName}\n${this.config.set} ${set}\n${this.config.where}\n${where};`
  }

  getUpdateValue() {
    return this.getData(this.updates)
  }

  splitSql() {
    const set = this.set()

    return this.where()
      .map((where) => {
        return `${this.config.update} ${this.tableName} ${this.config.set} ${set} ${this.config.where} ${where};`
      })
      .join('\n')
  }

  set() {
    const { fields, values } = this.getUpdateValue()

    return this.combine(fields, values.slice(0, 1), ', ')
  }
}
