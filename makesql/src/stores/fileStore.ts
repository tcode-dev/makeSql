import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

interface Sql {
  name: string
  sql: string
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
  const fileSelect = computed(() => {
    const len = state.value.fileList.length

    return len > 0 ? `${len}件のファイルを選択中` : 'Choose file...'
  })
  const addSql = (sql: Sql) => {
    state.value.sqlList.push(sql)
  }
  const setFileList = (fileList: File[]) => {
    state.value.fileList = fileList
  }
  const $reset = () => {
    state.value.sqlList = []
  }

  return { state, fileSelect, addSql, setFileList, $reset }
})
