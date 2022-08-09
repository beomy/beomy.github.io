import _ from 'lodash-es'

export default class ArrayUtil {
  public static mix(array) {
    const newArray = []
    const copyArray = _.cloneDeep(array)
    const rand: number = _.random(0, copyArray.length - 1)
    let item = copyArray.splice(rand, 1).pop()
    while (item !== undefined) {
      newArray.push(item)
      item = copyArray.splice(_.random(0, copyArray.length - 1), 1).pop()
    }
    return newArray
  }

  public static toMatrix(array, width: number) {
    const newArray = []
    const copyArray = _.cloneDeep(array)
    let item = copyArray.splice(0, width)
    while (item.length !== 0) {
      newArray.push(item)
      item = copyArray.splice(0, width)
    }
    return newArray
  }
}
