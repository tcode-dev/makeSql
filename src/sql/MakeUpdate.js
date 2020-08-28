import MakeSql from './MakeSql';

/**
 * MakeUpdate
 */
export default class MakeUpdate extends MakeSql {
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
    const set = this.set();
    const where = this.bulk(this.where());

    return `${this.config.update}\n${this.config.set} ${set}\n${this.config.from} ${this.tableName}\n${this.config.where}\n${where}\n;`;
  }

  /**
   * 1行ごとに1つのsql文を生成する
   * @return {string}
   */
  splitSql() {
    const set = this.set();

    return this.where().map((where) => {
      return `${this.config.update} ${this.config.set} ${set} ${this.config.from} ${this.tableName} ${this.config.where} ${where};`;
    }).join('\n');
  }

  /**
   * set
   * @param {array} fields
   * @param {array} values
   * @return {array}
   */
  set() {
    const {fields, values} = this.getUpdateValue();

    return this.combine(fields, values.slice(0, 1), ', ');
  }
}
