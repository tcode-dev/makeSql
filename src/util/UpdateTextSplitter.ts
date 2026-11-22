import InputError from '@/util/InputError'

interface SplitText {
  updates: string
  contents: string
}

// ファイル画面の UPDATE 用に、ファイルの内容を
// SET に使う部分 (ヘッダーと1行目) と WHERE に使う部分 (ヘッダーと2行目以降) に分ける
export default class UpdateTextSplitter {
  split(data: string): SplitText {
    // 末尾の改行で空の行ができないよう取り除く
    const [column, firstRow, ...rows] = data.replace(/\n+$/, '').split('\n')

    if (firstRow === undefined) {
      throw new InputError('UPDATE には、2行目に更新後の値、3行目以降に更新する行の条件が必要です。')
    }

    // 条件がないと全行を更新する文になりかねないため、3行目以降がなければエラーにする
    if (rows.length === 0) {
      throw new InputError('UPDATE には、3行目以降に更新する行の条件が必要です。')
    }

    return {
      updates: `${column}\n${firstRow}`,
      contents: `${column}\n${rows.join('\n')}`
    }
  }
}
