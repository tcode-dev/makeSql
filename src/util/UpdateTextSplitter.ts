interface SplitText {
  updates: string
  contents: string
}

// ファイル画面の UPDATE 用に、ファイルの内容を
// SET に使う部分 (ヘッダーと1行目) と WHERE に使う部分 (ヘッダーと2行目以降) に分ける
export default class UpdateTextSplitter {
  split(data: string): SplitText {
    const text = data.split('\n')
    const column = text.shift()!
    const firstRow = text.shift()!
    const updates = `${column}\n${firstRow}`
    const contents = `${column}\n${text.join('\n')}`

    return { updates, contents }
  }
}
