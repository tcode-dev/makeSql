import MakeSql from './MakeSql';

/**
 * MakeInsert
 */
export default class MakeInsert extends MakeSql {
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
    const {fields, values} = this.getValue();
    const fieldPhrase = `(${fields.join(', ')})`;
    const valuePhrase = values.map((row) => {
      return `(${this.config.quotation}${this.makeValues(row)}${this.config.quotation})`;
    }).join('\n,');

    return `${this.config.insert} ${this.config.into} ${this.tableName}\n${fieldPhrase}\n${this.config.values}\n${valuePhrase}\n;`;
  }

  /**
   * 1行ごとに1つのsql文を生成する
   * @return {string}
   */
  splitSql() {
    const {fields, values} = this.getValue();
    const fieldPhrase = `(${fields.join(', ')})`;

    return values.map((row) => {
      return `${this.config.insert} ${this.config.into} ${this.tableName} ${fieldPhrase} ${this.config.values} (${this.config.quotation}${this.makeValues(row)}${this.config.quotation});`;
    }).join('\n');
  }

  /**
   * values句を生成する
   * @param {string} row
   * @return {string}
   */
  makeValues(row) {
    return row.split(this.config.delimiter).join(`${this.config.quotation},${this.config.quotation}`);
  }
}
