import { afterEach, describe, expect, it, vi } from 'vitest'
import FileExtractor from '@/util/FileExtractor'
import InputError from '@/util/InputError'

describe('FileExtractor', () => {
  const extractor = new FileExtractor()

  afterEach(() => {
    vi.restoreAllMocks()
  })

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

  it('LF が続く空行は残す', async () => {
    const file = new File(['a\n\nb\r\n\r\nc'], 'users.csv')

    const { text } = await extractor.extract(file, 'utf8')

    expect(text).toBe('a\n\nb\n\nc')
  })

  it('ファイル名に複数のドットがある場合は最後の拡張子だけを取り除く', async () => {
    const file = new File(['id'], 'users.2024.csv')

    const { name } = await extractor.extract(file, 'utf8')

    expect(name).toBe('users.2024')
  })

  it('拡張子がないファイル名はそのまま使う', async () => {
    const { name } = await extractor.extract(new File(['id'], 'users'), 'utf8')

    expect(name).toBe('users')
  })

  it('拡張子しかないファイル名はそのまま使う', async () => {
    const { name } = await extractor.extract(new File(['id'], '.csv'), 'utf8')

    expect(name).toBe('.csv')
  })

  it('ファイルを読み込めなければ InputError で失敗する', async () => {
    vi.spyOn(FileReader.prototype, 'readAsText').mockImplementation(function (this: FileReader) {
      this.onerror?.(new ProgressEvent('error') as ProgressEvent<FileReader>)
    })

    const extracting = extractor.extract(new File(['id'], 'users.csv'), 'utf8')

    await expect(extracting).rejects.toBeInstanceOf(InputError)
    await expect(extracting).rejects.toThrow('ファイルを読み込めませんでした: users.csv')
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
