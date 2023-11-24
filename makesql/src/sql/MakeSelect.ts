import MakeSql from './MakeSql';

export default class MakeSelect extends MakeSql {
  make() {
    if (this.config.bulk) {
      return this.bulkSql();
    } else {
      return this.splitSql();
    }
  }

  bulkSql() {
    const where = this.bulk(this.where());

    return `${this.config.select} *\n${this.config.from} ${this.tableName}\n${this.config.where}\n${where}\n;`;
  }

  splitSql() {
    return this.where().map((where) => {
      return `${this.config.select} * ${this.config.from} ${this.tableName} ${this.config.where} ${where};`;
    }).join('\n');
  }
}
