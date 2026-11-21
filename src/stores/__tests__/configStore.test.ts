import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import Cookies from 'js-cookie'

// configStore はモジュール内の defaultState を reactive で直接書き換えるため、
// テストごとにモジュールを読み込み直して状態を初期化する
const loadStore = async () => {
  vi.resetModules()
  const { useConfigStore } = await import('@/stores/configStore')

  return useConfigStore()
}

describe('configStore', () => {
  beforeEach(() => {
    Cookies.remove('config')
    setActivePinia(createPinia())
  })

  it('初期値から Config を組み立てる', async () => {
    const store = await loadStore()

    expect(store.state).toEqual({
      characterCode: 'utf8',
      delimiter: 'comma',
      lettercase: 'lowercase',
      bulk: true,
      quotation: true,
      saveConfig: false
    })
    expect(store.config).toEqual({
      select: 'select',
      insert: 'insert',
      delete: 'delete',
      update: 'update',
      from: 'from',
      where: 'where',
      into: 'into',
      values: 'values',
      set: 'set',
      and: 'and',
      or: 'or',
      delimiter: ',',
      bulk: true,
      quotation: "'"
    })
  })

  it('state の変更が config に反映される', async () => {
    const store = await loadStore()

    store.state.lettercase = 'uppercase'
    store.state.delimiter = 'tab'
    store.state.bulk = false
    store.state.quotation = false

    expect(store.config).toMatchObject({
      select: 'SELECT',
      where: 'WHERE',
      delimiter: /\t/,
      bulk: false,
      quotation: ''
    })
  })

  it('saveConfig が有効なら state を Cookie に保存する', async () => {
    const store = await loadStore()

    store.state.saveConfig = true
    store.state.lettercase = 'camelcase'
    await nextTick()

    expect(JSON.parse(Cookies.get('config')!)).toMatchObject({
      saveConfig: true,
      lettercase: 'camelcase'
    })
  })

  it('saveConfig を無効にすると Cookie を削除する', async () => {
    const store = await loadStore()

    store.state.saveConfig = true
    await nextTick()
    expect(Cookies.get('config')).toBeDefined()

    store.state.saveConfig = false
    await nextTick()
    expect(Cookies.get('config')).toBeUndefined()
  })

  it('Cookie に保存された設定があれば初期値として使う', async () => {
    Cookies.set(
      'config',
      JSON.stringify({
        characterCode: 'shiftJis',
        delimiter: 'space',
        lettercase: 'uppercase',
        bulk: false,
        quotation: false,
        saveConfig: true
      })
    )

    const store = await loadStore()

    expect(store.state.characterCode).toBe('shiftJis')
    expect(store.config).toMatchObject({
      select: 'SELECT',
      delimiter: /\s/,
      bulk: false,
      quotation: ''
    })
  })
})
