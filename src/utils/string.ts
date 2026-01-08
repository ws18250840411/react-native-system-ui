import { isTwoCNChar } from './validate'

export const ensureSpace = (value: string, autoInsertSpace: boolean) => {
  if (!autoInsertSpace) {
    return value
  }
  return isTwoCNChar(value) ? value.split('').join(' ') : value
}

export const trimExtraChar = (value: string, char: string, regExp: RegExp) => {
  const index = value.indexOf(char)
  if (index === -1) return value
  if (char === '-' && index !== 0) {
    return value.slice(0, index)
  }
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
}

export const formatNumberInput = (value: string, allowDot = true, allowMinus = true) => {
  let next = value
  if (allowDot) {
    next = trimExtraChar(next, '.', /\./g)
  } else {
    next = next.split('.')[0]
  }

  if (allowMinus) {
    next = trimExtraChar(next, '-', /-/g)
  } else {
    next = next.replace(/-/g, '')
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g
  return next.replace(regExp, '')
}
