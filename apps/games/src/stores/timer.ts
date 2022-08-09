import { writable, derived } from 'svelte/store'
import { DateUtil } from '@/utils'

export const spandTime = writable(0)
export const mode = writable('pause')
export const timeString = derived(spandTime, ($spandTime) => {
  return DateUtil.msToStr($spandTime * 1000)
})
