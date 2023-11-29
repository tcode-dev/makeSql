import { ref } from 'vue'
import { defineStore } from 'pinia'

interface State {
  tableName: string,
  table: string,
};

export const useTextStore = defineStore('text', () => {
  const state = ref<State>({
    tableName: 'testTableName',
    table: 'col1,col2\ndata1, data2',
  })

  return { textState: state }
})
