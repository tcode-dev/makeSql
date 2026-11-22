import { ref } from 'vue'
import { defineStore } from 'pinia'

interface State {
  tableName: string
  updates: string
  contents: string
  sql: string
  error: string
}

export const useTextStore = defineStore('text', () => {
  const state = ref<State>({
    tableName: '',
    updates: '',
    contents: '',
    sql: '',
    error: ''
  })
  const setSql = (sql: string) => {
    state.value.sql = sql
    state.value.error = ''
  }
  // SQL を作れなかったときは前回の SQL を残さず、理由を表示する
  const setError = (error: string) => {
    state.value.sql = ''
    state.value.error = error
  }

  return { state, setSql, setError }
})
