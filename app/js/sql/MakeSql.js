/**
 * MakeSql
 */
export default class MakeSql {
    /**
     * @constructor
     * @param {object}
     * @property {string} tableName
     * @property {string} updateValue
     * @property {string} tableValue
     * @property {object} config
     */
    constructor({tableName, updateValue, tableValue, config}) {
        this.tableName = tableName;
        this.updateValue = updateValue;
        this.tableValue = tableValue;
        this.config = config;
    }

    /**
     * getUpdateValue
     * 更新情報を取得する
     * @return {object}
     */
    getUpdateValue() {
        return this.getData(this.updateValue);
    }

    /**
     * getValue
     * テーブル情報を取得する
     * @return {object}
     */
    getValue() {
        return this.getData(this.tableValue);
    }

    /**
     * getData
     * @param {string} data
     * @return {object}
     */
    getData(data) {
        const values = data.split("\n");
        const fields = values.shift().split(this.config.delimiter);

        return {fields, values};
    }

    /**
     * where
     * @param {array} fields
     * @param {array} values
     * @return {array}
     */
    where() {
        const {fields, values} = this.getValue();

        return this.combine(fields, values, ` ${this.config.and} `);
    }

    /**
     * combine
     * 列名と値を結合する
     * @param {array} fields
     * @param {array} values
     * @param {string} delimiter
     * @return {array}
     */
    combine(fields, values, delimiter) {
        return values.map((rowValue) => {
            return rowValue.split(this.config.delimiter).map((colValue, colIndex) => {
                return `${fields[colIndex]} = ${this.config.quotation}${colValue}${this.config.quotation}`;
            })
            .join(delimiter);
        });
    }

    /**
     * bulk
     * @param {array} combined 
     * @return {string}
     */
    bulk(combined) {
        const lineCount = combined.length;

        if (lineCount >= 2) {
            return '(' + combined.join(`)\n${this.config.or} (`) + ')';
        } else if (lineCount === 1) {
            return combined[0];
        } else {
            return '';
        }
    }
}
