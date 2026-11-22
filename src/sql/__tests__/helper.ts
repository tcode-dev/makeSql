import { ConfigConst, type Delimiter, type Lettercase } from '@/const/ConfigConst'
import type { Config } from '@/sql/MakeSql'

interface Options {
  lettercase?: Lettercase
  delimiter?: Delimiter
  bulk?: boolean
  quotation?: boolean
  backslashEscape?: boolean
}

// configStore の config と同じ組み立て方でテスト用の Config を作る
export const makeConfig = ({ lettercase = 'lowercase', delimiter = 'comma', bulk = true, quotation = true, backslashEscape = false }: Options = {}): Config =>
  ({
    ...ConfigConst.lettercase[lettercase],
    delimiter: ConfigConst.delimiter[delimiter],
    bulk,
    quotation: quotation ? "'" : '',
    backslashEscape
  }) as Config
