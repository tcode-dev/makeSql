import type { CharacterCode } from "@/const/ConfigConst";

export type Config = {
  and: string,
  bulk: boolean,
  delete: string,
  delimiter: string,
  from: string,
  insert: string,
  into: string,
  or: string,
  quotation: string,
  select: string,
  set: string,
  update: string,
  values: string,
  where: string,
};

export default class MakeSql {
  protected tableName: string;
  protected tableValue: string;
  protected config: Config;

  constructor({ tableName, tableValue, config }: { tableName: string, tableValue: string, config: Config }) {
    this.tableName = tableName;
    this.tableValue = tableValue;
    this.config = config;
  }

  getValue() {
    return this.getData(this.tableValue);
  }

  getData(data: string) {
    const values = data.split("\n");
    const fields = values.shift()!.split(this.config.delimiter);

    return { fields, values };
  }

  where() {
    const { fields, values } = this.getValue();

    return this.combine(fields, values, ` ${this.config.and} `);
  }

  combine(fields: string[], values: string[], delimiter: Config['delimiter']) {
    return values.map((rowValue) => {
      return rowValue.split(this.config.delimiter).map((colValue, colIndex) => {
        return `${fields[colIndex]} = ${this.config.quotation}${colValue}${this.config.quotation}`;
      })
        .join(delimiter);
    });
  }

  bulk(combined: string[]) {
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
