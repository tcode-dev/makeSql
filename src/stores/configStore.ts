import { computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { type Lettercase, type Delimiter, type CharacterCode, ConfigConst } from '@/const/ConfigConst'
import type { Config } from '@/sql/MakeSql'

interface State {
  characterCode: CharacterCode
  lettercase: Lettercase
  delimiter: Delimiter
  bulk: boolean
  quotation: boolean
  saveConfig: boolean
}
const defaultState: State = {
  characterCode: 'utf8',
  delimiter: 'comma',
  lettercase: 'lowercase',
  bulk: true,
  quotation: true,
  saveConfig: false
}

export const useConfigStore = defineStore('config', () => {
  const cookie = Cookies.get('config')
  const initialState = cookie ? JSON.parse(cookie) : defaultState
  const state = reactive<State>(initialState)
  const config = computed(
    () =>
      ({
        ...ConfigConst['lettercase'][state.lettercase],
        delimiter: ConfigConst['delimiter'][state.delimiter],
        bulk: state.bulk,
        quotation: state.quotation ? "'" : ''
      }) as Config
  )

  watch(state, () => {
    if (state.saveConfig) {
      Cookies.set('config', JSON.stringify(state))
    } else {
      Cookies.remove('config')
    }
  })

  return { state, config }
})
