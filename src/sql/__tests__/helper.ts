import { ConfigConst, type Delimiter, type Lettercase } from '@/const/ConfigConst'
import type { Config } from '@/sql/MakeSql'

interface Options {
  lettercase?: Lettercase
  delimiter?: Delimiter
  bulk?: boolean
  quotation?: boolean
}

// configStore の config と同じ組み立て方でテスト用の Config を作る
export const makeConfig = ({ lettercase = 'lowercase', delimiter = 'comma', bulk = true, quotation = true }: Options = {}): Config =>
  ({
    ...ConfigConst.lettercase[lettercase],
    delimiter: ConfigConst.delimiter[delimiter],
    bulk,
    quotation: quotation ? "'" : ''
  }) as Config
