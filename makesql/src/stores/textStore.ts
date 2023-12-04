import { ref } from 'vue'
import { defineStore } from 'pinia'

interface State {
  tableName: string
  updates: string
  contents: string
  sql: string
}

export const useTextStore = defineStore('text', () => {
  const state = ref<State>({
    tableName: 'testTableName',
    updates: 'col1,col3\nupdate1,update3',
    contents: 'col1,col2,col3\ndata1,data2,data3',
    sql: ''
  })
  const setSql = (sql: string) => {
    state.value = {
      tableName: state.value.tableName,
      updates: state.value.updates,
      contents: state.value.contents,
      sql
    }
  }
  return { state, setSql }
})
