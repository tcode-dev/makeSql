import { ConfigConst, type CharacterCode } from '@/const/ConfigConst'
import InputError from '@/util/InputError'

interface Data {
  name: string
  text: string
}

// 最後の拡張子だけを取り除く。拡張子しかない名前 (".csv" など) はそのまま使う
const removeExtension = (fileName: string) => fileName.replace(/\.[^.]+$/, '') || fileName

export default class FileExtractor {
  extract(file: File, characterCode: CharacterCode): Promise<Data> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        resolve({
          name: removeExtension(file.name),
          // CRLF と CR を LF にそろえる。LF が続く空行はそのまま残す
          text: (reader.result as string).replace(/\r\n?/g, '\n')
        })
      }
      reader.onerror = () => {
        reject(new InputError(`ファイルを読み込めませんでした: ${file.name}`))
      }

      reader.readAsText(file, ConfigConst.characterCode[characterCode])
    })
  }
}
