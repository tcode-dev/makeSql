// 入力が SQL を作れない内容だったときのエラー。message はそのまま画面に表示する
export default class InputError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InputError'
  }
}
