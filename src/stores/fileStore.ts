import { ref } from 'vue'
import { defineStore } from 'pinia'

// SQL を作れなかったファイルは sql を空にし、error に理由を入れる
export interface Sql {
  name: string
  sql: string
  error?: string
}
interface State {
  fileList: File[]
  sqlList: Sql[]
}

export const useFileStore = defineStore('file', () => {
  const state = ref<State>({
    fileList: [],
    sqlList: []
  })
  // SQL の作成を始めるたびに増やし、古い作成処理の結果を捨てるのに使う
  let latestRequest = 0

  // ボタンを続けて押すと前の作成処理が終わる前に次が始まるため、
  // 最後に始めた作成処理の結果だけを反映する
  const makeSqlList = async (make: () => Promise<Sql[]>) => {
    const request = ++latestRequest

    state.value.sqlList = []

    const sqlList = await make()

    if (request === latestRequest) {
      state.value.sqlList = sqlList
    }
  }
  const setFileList = (fileList: File[]) => {
    state.value.fileList = fileList
  }
  const $reset = () => {
    latestRequest++
    state.value.sqlList = []
  }

  return { state, makeSqlList, setFileList, $reset }
})
