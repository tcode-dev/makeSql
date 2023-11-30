import { ref } from 'vue'
import { defineStore } from 'pinia'

interface State {
  tableName: string,
  table: string,
  sql: string,
};

export const useTextStore = defineStore('text', () => {
  const state = ref<State>({
    tableName: 'testTableName',
    table: 'col1,col2\ndata1, data2',
    sql: '',
  })
  const setSql = (sql: string) => {
    state.value = {
      tableName: state.value.tableName,
      table: state.value.table,
      sql
    }
    console.log(state);
  }
  return { state, setSql }
})
