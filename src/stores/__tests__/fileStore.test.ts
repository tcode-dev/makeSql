import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { type Sql, useFileStore } from '@/stores/fileStore'

// 外から解決できる Promise を作り、作成処理が終わる順番をテストで決められるようにする
const deferred = () => {
  let resolve!: (sqlList: Sql[]) => void
  const promise = new Promise<Sql[]>((r) => {
    resolve = r
  })

  return { promise, resolve }
}

const selectSql: Sql[] = [{ name: 'users', sql: 'select' }]
const insertSql: Sql[] = [{ name: 'users', sql: 'insert' }]

describe('fileStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('作成した SQL を sqlList に設定する', async () => {
    const store = useFileStore()

    await store.makeSqlList(async () => selectSql)

    expect(store.state.sqlList).toEqual(selectSql)
  })

  it('作成を始めると前回の結果を消す', async () => {
    const store = useFileStore()
    const insert = deferred()

    await store.makeSqlList(async () => selectSql)
    const making = store.makeSqlList(() => insert.promise)

    expect(store.state.sqlList).toEqual([])

    insert.resolve(insertSql)
    await making
    expect(store.state.sqlList).toEqual(insertSql)
  })

  it('前の作成処理が後から終わっても、最後に始めた作成処理の結果だけを残す', async () => {
    const store = useFileStore()
    const select = deferred()
    const insert = deferred()

    const makingSelect = store.makeSqlList(() => select.promise)
    const makingInsert = store.makeSqlList(() => insert.promise)

    insert.resolve(insertSql)
    await makingInsert
    select.resolve(selectSql)
    await makingSelect

    expect(store.state.sqlList).toEqual(insertSql)
  })

  it('$reset の後に前の作成処理が終わっても結果を反映しない', async () => {
    const store = useFileStore()
    const select = deferred()

    const making = store.makeSqlList(() => select.promise)

    store.$reset()
    select.resolve(selectSql)
    await making

    expect(store.state.sqlList).toEqual([])
  })
})
