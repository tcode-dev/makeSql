import MakeSql from './MakeSql';

export default class MakeDelete extends MakeSql {
  make() {
    if (this.config.bulk) {
      return this.bulkSql();
    } else {
      return this.splitSql();
    }
  }

  bulkSql() {
    const where = this.bulk(this.where());

    return `${this.config.delete}\n${this.config.from} ${this.tableName}\n${this.config.where}\n${where}\n;`;
  }

  splitSql() {
    return this.where().map((where) => {
      return `${this.config.delete} ${this.config.from} ${this.tableName} ${this.config.where} ${where};`;
    }).join('\n');
  }
}
