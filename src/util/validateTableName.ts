import InputError from '@/util/InputError'

// About ページで案内している、テーブル名 (ファイル名) に使える文字。ドットは schema.table のような指定に使う
const TABLE_NAME_PATTERN = /^[A-Za-z0-9_.-]+$/

// テーブル名に使えない文字があれば InputError にする。SQL にそのまま埋め込むため、壊れた SQL を作らないようにする
export const validateTableName = (name: string) => {
  if (!TABLE_NAME_PATTERN.test(name)) {
    throw new InputError(`テーブル名 (ファイル名) には、半角英数字・ダッシュ (-)・アンダースコア (_)・ドット (.) だけを使ってください: "${name}"`)
  }
}
