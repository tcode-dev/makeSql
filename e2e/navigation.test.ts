import { test, expect } from './fixtures'
import { navigate } from './helpers'

test.describe('画面遷移', () => {
  test('ナビゲーションで各画面に移動できる', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'テキストからSQLを作成' })).toBeVisible()

    await navigate(page, 'File')
    await expect(page).toHaveURL('/file')
    await expect(page.getByRole('heading', { name: 'ファイルからSQLを作成' })).toBeVisible()

    await navigate(page, 'Config')
    await expect(page).toHaveURL('/config')
    await expect(page.getByRole('heading', { name: '設定' })).toBeVisible()

    await navigate(page, 'About')
    await expect(page).toHaveURL('/about')
    await expect(page.getByRole('heading', { name: 'このサイトについて' })).toBeVisible()

    await navigate(page, 'Text')
    await expect(page).toHaveURL('/')
  })

  test('現在の画面のナビゲーションが選択状態になる', async ({ page }) => {
    await page.goto('/config')

    await expect(page.getByRole('navigation').getByRole('link', { name: 'Config' })).toHaveClass(/active/)
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Text' })).not.toHaveClass(/active/)
  })

  test('URL を直接開いても各画面が表示される', async ({ page }) => {
    await page.goto('/about')

    await expect(page.getByRole('heading', { name: 'このサイトについて' })).toBeVisible()
  })

  test('移動先の画面のファイルを読み込めないときは再読み込みして最新のファイルを読み込む', async ({ page }) => {
    await page.goto('/')

    // デプロイで古いバージョンのファイルが削除された状態を再現するため、再読み込みするまでファイル画面のファイルを読み込めなくする
    let reloaded = false
    await page.route('**/assets/FileView-*.js', (route) => (reloaded ? route.fallback() : route.abort()))

    const load = page.waitForEvent('load')
    await navigate(page, 'File')
    await load
    reloaded = true

    await expect(page.getByRole('heading', { name: 'テキストからSQLを作成' })).toBeVisible()

    await navigate(page, 'File')
    await expect(page).toHaveURL('/file')
    await expect(page.getByRole('heading', { name: 'ファイルからSQLを作成' })).toBeVisible()
  })
})
