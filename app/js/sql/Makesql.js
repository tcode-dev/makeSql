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
        this.config.delimiter = ',';
        this.config.select = 'select';
        this.config.from = 'from';
        this.config.where = 'where';
        this.config.and = 'and';
        this.config.or = 'or';
    }

    /**
     * where
     */
    where() {
        const values = this.tableValue.split("\n");
        const fields = values.shift().split(this.config.delimiter);
        const result = values.map((rowValue) => {
            return rowValue.split(this.config.delimiter).map((colValue, colIndex) => {
                return `${fields[colIndex]} = ${colValue}`;
            })
            .join(` ${this.config.and} `);
        });
        const lineCount = result.length;

        if (lineCount >= 2) {
            return '(' + result.join(`)\n${this.config.or} (`) + ')';
        } else if (lineCount === 1) {
            return result[0];
        } else {
            return '';
        }
    };
}
