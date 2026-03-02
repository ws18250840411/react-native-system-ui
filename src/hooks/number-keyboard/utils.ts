import type { NumberKeyboardKeyType } from '../../components/number-keyboard/types'

export const NUM_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
export const ZERO = '0'
export const RE_NUM_LIKE = /^\d+$|^\.$|^x$/i

export interface NumberKeyboardKey { text?: string; type: NumberKeyboardKeyType; wider?: boolean }

export const shuffle = <T,>(list: T[]) => { const n = [...list]; for (let i = n.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [n[i], n[j]] = [n[j], n[i]] }; return n }

export const buildKeyboardKeys = ({ randomKeyOrder, visible, isCustom, extraKey, showDeleteKey }: { randomKeyOrder?: boolean; visible?: boolean; isCustom: boolean; extraKey?: string | string[]; showDeleteKey: boolean }): NumberKeyboardKey[] => {
  const sh = randomKeyOrder && visible
  const nK = sh ? shuffle(NUM_KEYS) : NUM_KEYS
  const mat: NumberKeyboardKey[] = nK.map(t => ({ text: t, type: '' }))
  if (isCustom) {
    const e = Array.isArray(extraKey) ? extraKey : extraKey ? [extraKey] : []
    if (e.length === 1) mat.push({ text: ZERO, type: '', wider: true }, { text: e[0], type: 'extra' })
    else if (e.length >= 2) mat.push({ text: e[0], type: 'extra' }, { text: ZERO, type: '' }, { text: e[1], type: 'extra' })
    else mat.push({ text: ZERO, type: '' })
    return mat
  }
  const nE = Array.isArray(extraKey) ? extraKey[0] ?? '' : extraKey ?? ''
  mat.push({ text: nE, type: 'extra' }, { text: ZERO, type: '' }, { type: showDeleteKey ? 'delete' : '', text: showDeleteKey ? undefined : '' })
  return mat
}
