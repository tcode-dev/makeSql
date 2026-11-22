// 同じ名前が複数あるとき、2つ目以降に _2, _3 ... を付けて重ならないようにする。
// macOS や Windows では大文字と小文字を区別せずにファイルを上書きするため、Users と users も同じ名前として扱う
export const uniqueNames = (names: string[]) => {
  const used = new Set<string>()

  return names.map((name) => {
    let unique = name

    for (let i = 2; used.has(unique.toLowerCase()); i++) {
      unique = `${name}_${i}`
    }
    used.add(unique.toLowerCase())

    return unique
  })
}
