import { ref } from 'vue'
import { defineStore } from 'pinia'

interface State {
  tableName: string
  contents: string
  sql: string
}

export const useTextStore = defineStore('text', () => {
  const state = ref<State>({
    tableName: 'testTableName',
    contents: 'col1,col2\ndata1, data2',
    sql: ''
  })
  const setSql = (sql: string) => {
    state.value = {
      tableName: state.value.tableName,
      contents: state.value.contents,
      sql
    }
  }
  return { state, setSql }
})
