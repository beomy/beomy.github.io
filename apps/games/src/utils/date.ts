export default class DateUtil {
  public static msToStr(ms: number): string {
    const sec = 1000
    const min = sec * 60
    const hour = min * 60
    const day = hour * 24
    const year = day * 365

    const msYear = Math.floor(ms / year)
    const msDay = Math.floor((ms - msYear * year) / day)
    const msHour = Math.floor((ms - msYear * year - msDay * day) / hour)
    const msMin = Math.floor(
      (ms - msYear * year - msDay * day - msHour * hour) / min,
    )
    const msSec = Math.floor(
      (ms - msYear * year - msDay * day - msHour * hour - msMin * min) / sec,
    )

    let str = ''
    if (msYear) {
      str = `${msYear}년 ${msDay || 0}일 ${msHour || 0}시간 ${msMin || 0}분 ${
        msSec || 0
      }초`
    } else if (msDay) {
      str = `${msDay}일 ${msHour || 0}시간 ${msMin || 0}분 ${msSec || 0}초`
    } else if (msHour) {
      str = `${msHour}시간 ${msMin || 0}분 ${msSec || 0}초`
    } else if (msMin) {
      str = `${msMin}분 ${msSec || 0}초`
    } else if (msSec) {
      str = `${msSec}초`
    }

    return str
  }
}
