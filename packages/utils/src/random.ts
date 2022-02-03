export class Random {
  static randomFloat(start: number, end: number) {
    return Math.random() * (end - start) + start
  }

  static randomInt(start: number, end: number) {
    return Math.floor(Random.randomFloat(start, end))
  }

  static choice(range: string | Array<any>) {
    const length = range.length
    const randomIndex = Math.floor(length * Math.random())
    return range[randomIndex]
  }

  static color(colorHexStringOrArray: string | Array<string> = '0123456789ABCDEF') {
    return (
      '#' +
      Random.choice(colorHexStringOrArray) +
      Random.choice(colorHexStringOrArray) +
      Random.choice(colorHexStringOrArray) +
      Random.choice(colorHexStringOrArray) +
      Random.choice(colorHexStringOrArray) +
      Random.choice(colorHexStringOrArray)
    )
  }
}
