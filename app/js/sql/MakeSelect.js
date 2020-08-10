import MakeSql from './Makesql';

export default class MakeSelect extends MakeSql {
    make() {
        return `${this.config.select} *\n${this.config.from} ${this.tableName}\n${this.config.where}\n${this.where()}\n;`;
    }
}
