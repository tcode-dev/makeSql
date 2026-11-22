// 同じ名前が複数あるとき、2つ目以降に _2, _3 ... を付けて重ならないようにする
export const uniqueNames = (names: string[]) => {
  const used = new Set<string>()

  return names.map((name) => {
    let unique = name

    for (let i = 2; used.has(unique); i++) {
      unique = `${name}_${i}`
    }
    used.add(unique)

    return unique
  })
}
