import InputError from '@/util/InputError'
import { parseTable, serializeTable } from '@/util/table'

interface SplitText {
  updates: string
  contents: string
}

// ファイル画面の UPDATE 用に、ファイルの内容を
// SET に使う部分 (ヘッダーと1行目) と WHERE に使う部分 (ヘッダーと2行目以降) に分ける。
// ダブルクォートで囲んだ値の中に改行があっても行を正しく分けられるよう、先に行と列に分けてから文字列に戻す
export default class UpdateTextSplitter {
  split(data: string, delimiter: string | RegExp): SplitText {
    const [column = [], firstRow, ...rows] = parseTable(data, delimiter)

    if (firstRow === undefined) {
      throw new InputError('UPDATE には、2行目に更新後の値、3行目以降に更新する行の条件が必要です。')
    }

    // 条件がないと全行を更新する文になりかねないため、3行目以降がなければエラーにする
    if (rows.length === 0) {
      throw new InputError('UPDATE には、3行目以降に更新する行の条件が必要です。')
    }

    return {
      updates: serializeTable([column, firstRow], delimiter),
      contents: serializeTable([column, ...rows], delimiter)
    }
  }
}
