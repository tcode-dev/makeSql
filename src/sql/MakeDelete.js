import MakeSql from './MakeSql';

/**
 * MakeDelete
 */
export default class MakeDelete extends MakeSql {
  /**
   * sql文を生成する
   * @return {string}
   */
  make() {
    if (this.config.bulk) {
      return this.bulkSql();
    } else {
      return this.splitSql();
    }
  }

  /**
   * 全体で1つのsql文を生成する
   * @return {string}
   */
  bulkSql() {
    const where = this.bulk(this.where());

    return `${this.config.delete}\n${this.config.from} ${this.tableName}\n${this.config.where}\n${where}\n;`;
  }

  /**
   * 1行ごとに1つのsql文を生成する
   * @return {string}
   */
  splitSql() {
    return this.where().map((where) => {
      return `${this.config.delete} ${this.config.from} ${this.tableName} ${this.config.where} ${where};`;
    }).join('\n');
  }
}
