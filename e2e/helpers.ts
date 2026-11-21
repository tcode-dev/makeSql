import type { Page } from '@playwright/test'

export const textPage = (page: Page) => ({
  tableName: page.getByLabel('テーブル名', { exact: true }),
  updates: page.getByLabel('更新情報', { exact: true }),
  contents: page.getByLabel('テーブル情報', { exact: true }),
  sql: page.getByLabel('SQL', { exact: true }),
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
  results: page.locator('.ui.accordion'),
  accordion: (tableName: string) => {
    const accordion = page.locator('.ui.accordion', { has: page.getByText(tableName, { exact: true }) })

    return {
      title: accordion.locator('.title'),
      content: accordion.locator('.content')
    }
  }
})

// ナビゲーションで画面を移動する。page.goto で再読み込みすると Pinia の状態が消えるため
export const navigate = (page: Page, name: 'Text' | 'File' | 'Config' | 'About') => page.getByRole('navigation').getByRole('link', { name, exact: true }).click()

export const csv = (name: string, content: string | Buffer) => ({
  name,
  mimeType: 'text/csv',
  buffer: typeof content === 'string' ? Buffer.from(content) : content
})
