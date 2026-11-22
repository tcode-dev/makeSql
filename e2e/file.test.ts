import JSZip from 'jszip'
import { test, expect } from './fixtures'
import { configPage, csv, filePage, navigate } from './helpers'

test.describe('ファイルから SQL を作成', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/file')
  })

  test('ファイルを選択するまでボタンは押せない', async ({ page }) => {
    const file = filePage(page)

    await expect(file.button('Select')).toBeDisabled()
    await file.input.setInputFiles(csv('users.csv', 'id\n1'))

    await expect(page.getByText('1件のファイルを選択中')).toBeVisible()
    await expect(file.button('Select')).toBeEnabled()
    // Download は SQL を作成するまで押せない
    await expect(file.button('Download')).toBeDisabled()
  })

  test('ファイル名をテーブル名として SELECT 文を作成する', async ({ page }) => {
    const file = filePage(page)

    await file.input.setInputFiles(csv('users.csv', 'id,name\n1,foo\n2,bar'))
    await file.button('Select').click()

    await expect(file.result('users')).toHaveValue("select *\nfrom users\nwhere\n(id = '1' and name = 'foo')\nor (id = '2' and name = 'bar')\n;")
  })

  test('複数のファイルからそれぞれ SQL を作成する', async ({ page }) => {
    const file = filePage(page)

    await file.input.setInputFiles([csv('users.csv', 'id\n1'), csv('items.csv', 'code\nA')])
    await expect(page.getByText('2件のファイルを選択中')).toBeVisible()
    await file.button('Delete').click()

    await expect(file.results).toHaveCount(2)
    await expect(file.result('users')).toHaveValue("delete\nfrom users\nwhere\nid = '1'\n;")
    await expect(file.result('items')).toHaveValue("delete\nfrom items\nwhere\ncode = 'A'\n;")
  })

  test('結果は選択したファイルの順に並ぶ', async ({ page }) => {
    const file = filePage(page)

    await file.input.setInputFiles([csv('users.csv', 'id\n1'), csv('items.csv', 'code\nA'), csv('orders.csv', 'no\n1')])
    await file.button('Select').click()

    await expect(file.results.locator('.title')).toHaveText(['users', 'items', 'orders'])
  })

  test('ボタンを続けて押すと最後に押したボタンの結果だけを表示する', async ({ page }) => {
    const file = filePage(page)

    await file.input.setInputFiles([csv('users.csv', 'id\n1'), csv('items.csv', 'code\nA')])
    // ファイルの読み込みが終わる前に次のボタンを押した状態にするため、同じタスク内で続けてクリックする
    // e2e の tsconfig には DOM の型がないため、ブラウザで実行するコードは文字列で渡す
    await page.evaluate(`{
      const button = (name) => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === name)
      button('Select').click()
      button('Insert').click()
    }`)

    await expect(file.result('users')).toHaveValue("insert into users\n(id)\nvalues\n('1')\n;")
    await expect(file.result('items')).toHaveValue("insert into items\n(code)\nvalues\n('A')\n;")
    await expect(file.results).toHaveCount(2)
  })

  test('Insert で INSERT 文を作成する', async ({ page }) => {
    const file = filePage(page)

    await file.input.setInputFiles(csv('users.csv', 'id,name\r\n1,foo\r\n2,bar\r\n'))
    await file.button('Insert').click()

    await expect(file.result('users')).toHaveValue("insert into users\n(id, name)\nvalues\n('1','foo')\n,('2','bar')\n;")
  })

  test('Update は2行目を SET 句、3行目以降を WHERE 句に使う', async ({ page }) => {
    const file = filePage(page)

    await file.input.setInputFiles(csv('users.csv', 'name\nbaz\nfoo\nbar'))
    await file.button('Update').click()

    await expect(file.result('users')).toHaveValue("update\nusers\nset name = 'baz'\nwhere\n(name = 'foo')\nor (name = 'bar');")
  })

  test('ファイルの末尾に改行があっても余分な条件を作らない', async ({ page }) => {
    const file = filePage(page)

    await file.input.setInputFiles(csv('users.csv', 'id\n1\n'))
    await file.button('Select').click()

    await expect(file.result('users')).toHaveValue("select *\nfrom users\nwhere\nid = '1'\n;")
  })

  test('文字コードの設定に従って Shift_JIS のファイルを読み込む', async ({ page }) => {
    await navigate(page, 'Config')
    await configPage(page).radio('Shift_JIS').check()
    await navigate(page, 'File')

    const file = filePage(page)
    // 「あ」の Shift_JIS 表現は 0x82 0xA0
    await file.input.setInputFiles(csv('users.csv', Buffer.concat([Buffer.from('name\n'), Buffer.from([0x82, 0xa0])])))
    await file.button('Select').click()

    await expect(file.result('users')).toHaveValue("select *\nfrom users\nwhere\nname = 'あ'\n;")
  })

  // 開閉の表示は CDN から読み込む Semantic UI の CSS が active クラスに応じて切り替える。
  // e2e テストでは外部への通信を遮断しているため、active クラスの付け外しを確認する
  test('アコーディオンのタイトルをクリックすると開閉が切り替わる', async ({ page }) => {
    const file = filePage(page)

    await file.input.setInputFiles(csv('users.csv', 'id\n1'))
    await file.button('Select').click()
    const accordion = file.accordion('users')

    // 作成直後は開いている
    await expect(accordion.title).toHaveClass(/\bactive\b/)
    await expect(accordion.content).toHaveClass(/\bactive\b/)

    await accordion.title.click()
    await expect(accordion.title).not.toHaveClass(/\bactive\b/)
    await expect(accordion.content).not.toHaveClass(/\bactive\b/)

    await accordion.title.click()
    await expect(accordion.title).toHaveClass(/\bactive\b/)
    await expect(accordion.content).toHaveClass(/\bactive\b/)
  })

  test('作成した SQL を zip でダウンロードできる', async ({ page }) => {
    const file = filePage(page)

    await file.input.setInputFiles([csv('users.csv', 'id\n1'), csv('items.csv', 'code\nA')])
    await file.button('Select').click()
    await expect(file.results).toHaveCount(2)

    const downloadPromise = page.waitForEvent('download')
    await file.button('Download').click()
    const download = await downloadPromise

    expect(download.suggestedFilename()).toMatch(/^sql_\d{14}\.zip$/)

    const stream = await download.createReadStream()
    const chunks: Buffer[] = []
    for await (const chunk of stream) chunks.push(chunk as Buffer)
    const zip = await JSZip.loadAsync(Buffer.concat(chunks))

    expect(Object.keys(zip.files).sort()).toEqual(['items.sql', 'users.sql'])
    expect(await zip.file('users.sql')!.async('string')).toBe("select *\nfrom users\nwhere\nid = '1'\n;")
    expect(await zip.file('items.sql')!.async('string')).toBe("select *\nfrom items\nwhere\ncode = 'A'\n;")
  })
})
