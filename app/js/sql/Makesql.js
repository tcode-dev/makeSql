/**
 * Makesql
 */
export default class Makesql {
    /**
     * @constructor
     * @param {object}
     * @property {string} tableName
     * @property {string} tableValue
     * @property {object} config
     */
    constructor({tableName, tableValue, config}) {
        this.tableName = tableName;
        this.tableValue = tableValue;
        this.config = config;
    }

    /**
     * getData
     */
    getData() {
        const values = this.tableValue.split("\n");
        const fields = values.shift().split(this.config.delimiter);

        return {fields, values};
    }

    /**
     * combine
     * 列名と値を結合する
     * @param {array} fields
     * @param {array} values
     */
    combine(fields, values) {
        return values.map((rowValue) => {
            return rowValue.split(this.config.delimiter).map((colValue, colIndex) => {
                return `${fields[colIndex]} = ${colValue}`;
            })
            .join(` ${this.config.and} `);
        });
    }

    /**
     * bulk
     * @param {array} combined 
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
