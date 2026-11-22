import MakeDelete from './MakeDelete'
import MakeInsert from './MakeInsert'
import MakeSelect from './MakeSelect'
import MakeUpdate from './MakeUpdate'
import type { Config } from './MakeSql'
import UpdateTextSplitter from '@/util/UpdateTextSplitter'

export type SqlType = 'select' | 'insert' | 'delete' | 'update'

export const SqlLabel: Record<SqlType, string> = {
  select: 'Select',
  insert: 'Insert',
  delete: 'Delete',
  update: 'Update'
}

interface TextInput {
  tableName: string
  updates: string
  contents: string
}

// SQL の種類に応じて Make* クラスを選び、SQL を作成する
export default class SqlFactory {
  private config: Config

  constructor(config: Config) {
    this.config = config
  }

  // テキスト画面で SQL を作るのに必要な入力がそろっているか
  static canMakeFromText(type: SqlType, { tableName, updates, contents }: TextInput) {
    if (!tableName || !contents) {
      return false
    }

    // UPDATE は SET 句に使う更新情報も必要
    return type !== 'update' || updates !== ''
  }

  // テキスト画面用。updates は UPDATE のときだけ使う
  fromText(type: SqlType, { tableName, updates, contents }: TextInput) {
    switch (type) {
      case 'select':
        return new MakeSelect(tableName, contents, this.config).make()
      case 'insert':
        return new MakeInsert(tableName, contents, this.config).make()
      case 'delete':
        return new MakeDelete(tableName, contents, this.config).make()
      case 'update':
        return new MakeUpdate(tableName, updates, contents, this.config).make()
    }
  }

  // ファイル画面用。UPDATE のときはファイルの2行目を SET 句、3行目以降を WHERE 句に使う
  fromFile(type: SqlType, tableName: string, text: string) {
    if (type === 'update') {
      const { updates, contents } = new UpdateTextSplitter().split(text)

      return this.fromText(type, { tableName, updates, contents })
    }

    return this.fromText(type, { tableName, updates: '', contents: text })
  }
}
