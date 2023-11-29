import { ref } from 'vue'
import { defineStore } from 'pinia'

interface State {
  tableName: string,
  value: string,
};

export const useTextStore = defineStore('text', () => {
  const state = ref<State>({
    tableName: 'testTableName',
    value: '',
  })
  const setTableName = (value: string) => {
    state.value = {...state.value, tableName: value};
  }

  return { state: state, ...state.value, setTableName }
})
