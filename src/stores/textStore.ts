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
    tableName: '',
    updates: '',
    contents: '',
    sql: ''
  })
  const setSql = (sql: string) => {
    state.value.sql = sql
  }
  return { state, setSql }
})
