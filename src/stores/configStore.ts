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

const isKeyOf = <T extends object>(obj: T, key: unknown): key is keyof T => typeof key === 'string' && Object.hasOwn(obj, key)

// Cookie の値は壊れていたり古い形式だったりする可能性があるため、
// 項目ごとに検証し、不正な項目は初期値を使う
const loadState = (): State => {
  const cookie = Cookies.get('config')
  const state = { ...defaultState }

  if (!cookie) {
    return state
  }

  let saved: unknown

  try {
    saved = JSON.parse(cookie)
  } catch {
    return state
  }

  if (typeof saved !== 'object' || saved === null) {
    return state
  }

  const { characterCode, delimiter, lettercase, bulk, quotation, saveConfig } = saved as Record<string, unknown>

  if (isKeyOf(ConfigConst.characterCode, characterCode)) state.characterCode = characterCode
  if (isKeyOf(ConfigConst.delimiter, delimiter)) state.delimiter = delimiter
  if (isKeyOf(ConfigConst.lettercase, lettercase)) state.lettercase = lettercase
  if (typeof bulk === 'boolean') state.bulk = bulk
  if (typeof quotation === 'boolean') state.quotation = quotation
  if (typeof saveConfig === 'boolean') state.saveConfig = saveConfig

  return state
}

export const useConfigStore = defineStore('config', () => {
  const state = reactive<State>(loadState())
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
      // expires を指定しないとブラウザを閉じたときに消えるため、1年間保存する
      Cookies.set('config', JSON.stringify(state), { expires: 365 })
    } else {
      Cookies.remove('config')
    }
  })

  return { state, config }
})
