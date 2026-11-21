import type { Page } from '@playwright/test'

// テキスト画面の入力欄は label と入力欄が for/id で関連付いていないため、
// ラベルの文字を含む .field の中から入力欄を探す
const field = (page: Page, label: string) => page.locator('.field', { has: page.getByText(label, { exact: true }) })

export const textPage = (page: Page) => ({
  tableName: field(page, 'テーブル名').locator('input'),
  updates: field(page, '更新情報').locator('textarea'),
  contents: field(page, 'テーブル情報').locator('textarea'),
  sql: field(page, 'SQL').locator('textarea'),
  button: (name: 'Select' | 'Insert' | 'Delete' | 'Update') => page.getByRole('button', { name, exact: true })
})

export const configPage = (page: Page) => ({
  // ラジオボタンは label と input が for/id で関連付いている
  radio: (label: string) => page.getByLabel(label, { exact: true }),
  // チェックボックスの label は空のため、設定名のセルがある行から探す
  checkbox: (name: 'bulk' | 'quotation' | 'saveConfig') => page.locator('tr', { has: page.getByRole('cell', { name, exact: true }) }).getByRole('checkbox')
})

export const filePage = (page: Page) => ({
  input: page.locator('#fileInput'),
  button: (name: 'Select' | 'Insert' | 'Delete' | 'Update' | 'Download') => page.getByRole('button', { name, exact: true }),
  // 結果はファイルごとのアコーディオンで、タイトルにテーブル名 (ファイル名) が表示される
  result: (tableName: string) => page.locator('.ui.accordion', { has: page.getByText(tableName, { exact: true }) }).locator('textarea'),
  results: page.locator('.ui.accordion')
})

// ナビゲーションで画面を移動する。page.goto で再読み込みすると Pinia の状態が消えるため
export const navigate = (page: Page, name: 'Text' | 'File' | 'Config' | 'About') => page.getByRole('navigation').getByRole('link', { name, exact: true }).click()

export const csv = (name: string, content: string | Buffer) => ({
  name,
  mimeType: 'text/csv',
  buffer: typeof content === 'string' ? Buffer.from(content) : content
})
