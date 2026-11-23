import InputError from '@/util/InputError'

// About ページで案内している、テーブル名 (ファイル名) に使える文字。
// テーブル名はクォートせずに埋め込むため、ダッシュ (-) は引き算として読まれてしまい使えない
const TABLE_NAME_PATTERN = /^[A-Za-z0-9_]+$/

// テーブル名に使えない文字があれば InputError にする。SQL にそのまま埋め込むため、壊れた SQL を作らないようにする
export const validateTableName = (name: string) => {
  if (!TABLE_NAME_PATTERN.test(name)) {
    throw new InputError(`テーブル名 (ファイル名) には、半角英数字・アンダースコア (_) だけを使ってください: "${name}"`)
  }
}
