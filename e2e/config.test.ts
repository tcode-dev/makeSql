import { test, expect } from './fixtures'
import { configPage, navigate, textPage } from './helpers'

test.describe('設定', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/config')
  })

  test('初期設定', async ({ page }) => {
    const config = configPage(page)

    await expect(config.radio('comma')).toBeChecked()
    await expect(config.radio('lowercase')).toBeChecked()
    await expect(config.radio('UTF-8')).toBeChecked()
    await expect(config.checkbox('bulk')).toBeChecked()
    await expect(config.checkbox('quotation')).toBeChecked()
    await expect(config.checkbox('backslashEscape')).not.toBeChecked()
    await expect(config.checkbox('saveConfig')).not.toBeChecked()
  })

  test('ラジオボタンは矢印キーで同じ設定の選択肢を移動できる', async ({ page }) => {
    const config = configPage(page)

    await config.radio('comma').focus()
    await page.keyboard.press('ArrowRight')

    await expect(config.radio('space')).toBeChecked()
    await expect(config.radio('space')).toBeFocused()
    await expect(config.radio('comma')).not.toBeChecked()
    // 他の設定の選択は変わらない
    await expect(config.radio('lowercase')).toBeChecked()
    await expect(config.radio('UTF-8')).toBeChecked()
  })

  test('大文字・1行ずつ・クォートなしの設定がテキスト画面の SQL に反映される', async ({ page }) => {
    const config = configPage(page)

    await config.radio('UPPERCASE').check()
    await config.checkbox('bulk').uncheck()
    await config.checkbox('quotation').uncheck()

    await navigate(page, 'Text')
    const text = textPage(page)
    await text.tableName.fill('users')
    await text.contents.fill('id,name\n1,foo\n2,bar')
    await text.button('Select').click()

    await expect(text.sql).toHaveValue('SELECT * FROM users WHERE id = 1 AND name = foo;\nSELECT * FROM users WHERE id = 2 AND name = bar;')
  })

  test('backslashEscape の設定でバックスラッシュがエスケープされる', async ({ page }) => {
    await configPage(page).checkbox('backslashEscape').check()

    await navigate(page, 'Text')
    const text = textPage(page)
    await text.tableName.fill('files')
    await text.contents.fill('path\nC:\\dir\\')
    await text.button('Select').click()

    await expect(text.sql).toHaveValue("select *\nfrom files\nwhere\npath = 'C:\\\\dir\\\\'\n;")
  })

  test('クォートなしの設定で空の値があればエラーを表示する', async ({ page }) => {
    await configPage(page).checkbox('quotation').uncheck()

    await navigate(page, 'Text')
    const text = textPage(page)
    await text.tableName.fill('users')
    await text.contents.fill('id,name\n1,')
    await text.button('Select').click()

    await expect(text.error).toContainText('クォートなしの設定では空の値を使えません')
  })

  test('タブ区切りの設定がテキスト画面の SQL に反映される', async ({ page }) => {
    await configPage(page).radio('tab').check()

    await navigate(page, 'Text')
    const text = textPage(page)
    await text.tableName.fill('users')
    await text.contents.fill('id\tname\n1\tfoo')
    await text.button('Insert').click()

    await expect(text.sql).toHaveValue("insert into users\n(id, name)\nvalues\n('1','foo')\n;")
  })

  test('スペース区切りでは行頭・行末の空白があっても SQL を作成できる', async ({ page }) => {
    await configPage(page).radio('space').check()

    await navigate(page, 'Text')
    const text = textPage(page)
    await text.tableName.fill('users')
    await text.contents.fill(' id name \n1 foo ')
    await text.button('Insert').click()

    await expect(text.sql).toHaveValue("insert into users\n(id, name)\nvalues\n('1','foo')\n;")
  })

  test('saveConfig が有効なら再読み込みしても設定が残る', async ({ page }) => {
    const config = configPage(page)

    await config.checkbox('saveConfig').check()
    await config.radio('Camelcase').check()
    await page.reload()

    await expect(config.radio('Camelcase')).toBeChecked()
    await expect(config.checkbox('saveConfig')).toBeChecked()
  })

  test('saveConfig の Cookie はブラウザを閉じても消えないよう有効期限を持つ', async ({ page, context }) => {
    await configPage(page).checkbox('saveConfig').check()

    const cookie = (await context.cookies()).find((c) => c.name === 'config')

    // セッション Cookie の expires は -1 になる。1年後 (前後1日の誤差を許容) に切れることを確認する
    const oneYear = 365 * 24 * 60 * 60
    const now = Date.now() / 1000
    expect(cookie?.expires).toBeGreaterThan(now + oneYear - 24 * 60 * 60)
    expect(cookie?.expires).toBeLessThan(now + oneYear + 24 * 60 * 60)
  })

  test('saveConfig が無効なら再読み込みすると初期設定に戻る', async ({ page }) => {
    const config = configPage(page)

    await config.radio('Camelcase').check()
    await page.reload()

    await expect(config.radio('lowercase')).toBeChecked()
  })
})
