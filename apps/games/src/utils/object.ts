export default class ObjectUtil {
  public static isEmpty(obj): boolean {
    return this.isUndef(obj) ? true : Object.keys(obj).length === 0
  }

  public static isUndef(obj): boolean {
    return obj === undefined || obj === null
  }

  public static enumToArray(Enum) {
    const values = Object.values(Enum)
    const ids = values.splice(values.length / 2)
    return ids.map((x, i) => ({
      id: x,
      value: values[i],
    }))
  }
}
