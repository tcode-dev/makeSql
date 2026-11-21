import { describe, expect, it } from 'vitest'
import FileExtractor from '@/util/FileExtractor'

describe('FileExtractor', () => {
  const extractor = new FileExtractor()

  it('拡張子を除いたファイル名と本文を返す', async () => {
    const file = new File(['id,name\n1,foo'], 'users.csv')

    await expect(extractor.extract(file, 'utf8')).resolves.toEqual({
      name: 'users',
      text: 'id,name\n1,foo'
    })
  })

  it('CRLF と CR を LF にそろえる', async () => {
    const file = new File(['a\r\nb\rc\n'], 'users.csv')

    const { text } = await extractor.extract(file, 'utf8')

    expect(text).toBe('a\nb\nc\n')
  })

  it('連続した2つの改行は1つにまとめる', async () => {
    const file = new File(['a\n\nb'], 'users.csv')

    const { text } = await extractor.extract(file, 'utf8')

    expect(text).toBe('a\nb')
  })

  it('ファイル名に複数のドットがある場合は最初のドットより前を使う', async () => {
    const file = new File(['id'], 'my.users.csv')

    const { name } = await extractor.extract(file, 'utf8')

    expect(name).toBe('my')
  })

  it('Shift_JIS のファイルを読み込める', async () => {
    // 「あ」の Shift_JIS 表現
    const file = new File([new Uint8Array([0x82, 0xa0])], 'users.csv')

    const { text } = await extractor.extract(file, 'shiftJis')

    expect(text).toBe('あ')
  })

  it('EUC-JP のファイルを読み込める', async () => {
    // 「あ」の EUC-JP 表現
    const file = new File([new Uint8Array([0xa4, 0xa2])], 'users.csv')

    const { text } = await extractor.extract(file, 'eucJp')

    expect(text).toBe('あ')
  })
})
