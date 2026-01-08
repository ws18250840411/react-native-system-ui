import { isTwoCNChar } from './validate'

export const ensureSpace = (value: string, autoInsertSpace: boolean) => {
  if (!autoInsertSpace) {
    return value
  }
  return isTwoCNChar(value) ? value.split('').join(' ') : value
}
