import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Lettercase, type Delimiter, type CharacterCode, ConfigConst } from '@/const/ConfigConst'

interface State {
  characterCode: CharacterCode,
  lettercase: Lettercase,
  delimiter: Delimiter,
  bulk: boolean,
  quotation: boolean,
};

export const useConfigStore = defineStore('config', () => {
  const state = ref<State>({
    characterCode: 'utf8',
    delimiter: 'comma',
    lettercase: 'lowercase',
    bulk: false,
    quotation: true
  })
  const setState = (value: State) => {
    state.value = value;
  }
  const setting = {
    characterCode: state.value.characterCode,
    delimiter: state.value.delimiter,
    lettercase: state.value.lettercase,
    bulk: state.value.bulk,
    quotation: state.value.quotation
  }
  const config = {
    ...ConfigConst['lettercase'][state.value.lettercase],
    characterCode: ConfigConst['characterCode'][state.value.characterCode],
    delimiter: ConfigConst['delimiter'][state.value.delimiter],
    bulk: state.value.bulk,
    quotation: state.value.quotation ? "'" : ""
  }

  return { config, setting, setState }
})
