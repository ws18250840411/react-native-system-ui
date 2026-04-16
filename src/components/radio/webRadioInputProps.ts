import type { InputHTMLAttributes } from 'react'

const ALLOW = new Set([
  'type',
  'name',
  'form',
  'value',
  'defaultValue',
  'checked',
  'defaultChecked',
  'disabled',
  'required',
  'readOnly',
  'id',
  'className',
  'tabIndex',
  'autoComplete',
  'autoFocus',
  'title',
  'lang',
  'translate',
  'onClick',
  'onBlur',
  'onFocus',
  'onChange',
  'onKeyDown',
  'onKeyUp',
  'onKeyPress',
  'onInput',
  'role',
])

function allowedKey(k: string) {
  if (ALLOW.has(k)) return true
  if (k.startsWith('aria-')) return true
  if (k.startsWith('data-')) return true
  return false
}

export function toWebRadioInputProps(raw: Record<string, unknown>): InputHTMLAttributes<HTMLInputElement> {
  const out: Record<string, unknown> = {}
  for (const k of Object.keys(raw)) {
    if (k === 'ref' || k === 'style') continue
    if (!allowedKey(k)) continue
    out[k] = raw[k]
  }
  const attrs = out as InputHTMLAttributes<HTMLInputElement>
  attrs.type = 'radio'
  if (attrs.onChange === undefined) attrs.onChange = () => {}
  return attrs
}
