import { test, expect } from './fixtures'
import { textPage } from './helpers'

test.describe('テキストから SQL を作成', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('テーブル名とテーブル情報を入力するまでボタンは押せない', async ({ page }) => {
    const text = textPage(page)

    await expect(text.button('Select')).toBeDisabled()
    await text.tableName.fill('users')
    await expect(text.button('Select')).toBeDisabled()
    await text.contents.fill('id\n1')
    await expect(text.button('Select')).toBeEnabled()
    // Update は更新情報も必要
    await expect(text.button('Update')).toBeDisabled()
    await text.updates.fill('name\nbaz')
    await expect(text.button('Update')).toBeEnabled()
  })

  test('Select で SELECT 文を作成する', async ({ page }) => {
    const text = textPage(page)

    await text.tableName.fill('users')
    await text.contents.fill('id,name\n1,foo\n2,bar')
    await text.button('Select').click()

    await expect(text.sql).toHaveValue("select *\nfrom users\nwhere\n(id = '1' and name = 'foo')\nor (id = '2' and name = 'bar')\n;")
  })

  test('Insert で INSERT 文を作成する', async ({ page }) => {
    const text = textPage(page)

    await text.tableName.fill('users')
    await text.contents.fill('id,name\n1,foo\n2,bar')
    await text.button('Insert').click()

    await expect(text.sql).toHaveValue("insert into users\n(id, name)\nvalues\n('1','foo')\n,('2','bar')\n;")
  })

  test('Delete で DELETE 文を作成する', async ({ page }) => {
    const text = textPage(page)

    await text.tableName.fill('users')
    await text.contents.fill('id,name\n1,foo\n2,bar')
    await text.button('Delete').click()

    await expect(text.sql).toHaveValue("delete\nfrom users\nwhere\n(id = '1' and name = 'foo')\nor (id = '2' and name = 'bar')\n;")
  })

  test('Update で UPDATE 文を作成する', async ({ page }) => {
    const text = textPage(page)

    await text.tableName.fill('users')
    await text.updates.fill('name,age\nbaz,20')
    await text.contents.fill('id\n1\n2')
    await text.button('Update').click()

    await expect(text.sql).toHaveValue("update\nusers\nset name = 'baz', age = '20'\nwhere\n(id = '1')\nor (id = '2');")
  })

  test('テーブル情報の末尾に改行があっても余分な条件を作らない', async ({ page }) => {
    const text = textPage(page)

    await text.tableName.fill('users')
    await text.contents.fill('id\n1\n')
    await text.button('Select').click()

    await expect(text.sql).toHaveValue("select *\nfrom users\nwhere\nid = '1'\n;")
  })

  test('列数が1行目と合わない行があればエラーを表示し、直すと SQL を表示する', async ({ page }) => {
    const text = textPage(page)

    await text.tableName.fill('users')
    await text.contents.fill('id\n1,2')
    await text.button('Select').click()

    await expect(text.error).toHaveText('列数が1行目 (1列) と一致しない行があります: "1,2"')
    await expect(text.sql).toHaveValue('')

    await text.contents.fill('id\n1')
    await text.button('Select').click()

    await expect(text.error).toHaveCount(0)
    await expect(text.sql).toHaveValue("select *\nfrom users\nwhere\nid = '1'\n;")
  })

  test('値の行がなければエラーを表示する', async ({ page }) => {
    const text = textPage(page)

    await text.tableName.fill('users')
    await text.contents.fill('id')
    await text.button('Delete').click()

    await expect(text.error).toContainText('値の行がありません')
  })
})
