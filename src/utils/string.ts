import { isTwoCNChar } from './validate'
export const ensureSpace = (value: string, autoInsertSpace: boolean) =>
  autoInsertSpace && isTwoCNChar(value) ? value.split('').join(' ') : value
export const trimExtraChar = (value: string, char: string, regExp: RegExp) => {
  const i = value.indexOf(char)
  if (i === -1) return value
  if (char === '-' && i !== 0) return value.slice(0, i)
  return value.slice(0, i + 1) + value.slice(i).replace(regExp, '')
}
export const formatNumberInput = (value: string, allowDot = true, allowMinus = true) => {
  let n = allowDot ? trimExtraChar(value, '.', /\./g) : value.split('.')[0]
  n = allowMinus ? trimExtraChar(n, '-', /-/g) : n.replace(/-/g, '')
  return n.replace(allowDot ? /[^-0-9.]/g : /[^-0-9]/g, '')
}
