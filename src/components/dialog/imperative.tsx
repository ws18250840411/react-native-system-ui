import React, { useCallback, useEffect, useState } from 'react'
import { Portal } from '../portal/Portal'
import { deepMerge, isString, isUndefined } from '../../utils'
import type { DialogAlertOptions, DialogConfirmOptions, DialogProps, DialogShowOptions } from './types'
import Dialog from './Dialog'

const runHook = async (handler?: () => any) => { if (!handler) return true; try { const result = await handler(); return result !== false } catch (error) { console.error(error); return false } }

type ImperativeMode = 'show' | 'alert' | 'confirm'
interface ImperativeMeta { mode: ImperativeMode; resolve?: (value?: any) => void }
interface DialogRegistryItem { key: number; options: DialogProps; meta: ImperativeMeta; close?: () => void }

const registry = new Map<number, DialogRegistryItem>()
type DefaultOptionsKey = 'default' | ImperativeMode
const defaults: Record<DefaultOptionsKey, DialogShowOptions> = { default: {}, show: {}, alert: {}, confirm: {} }

const requestClose = (key: number) => { const e = registry.get(key); if (!e) { Portal.remove(key); return }; if (e.close) { e.close(); return }; Portal.remove(key); registry.delete(key) }

interface DialogPortalProps { options: DialogProps; meta: ImperativeMeta; portalKeyRef: { current: number } }

const DialogPortalInstance: React.FC<DialogPortalProps> = ({ options, meta, portalKeyRef }) => {
  const [visible, setVisible] = useState(true); const close = useCallback(() => { setVisible(false) }, [])
  useEffect(() => { if (!portalKeyRef.current) return; const e = registry.get(portalKeyRef.current); if (e) e.close = close; return () => { const e = registry.get(portalKeyRef.current ?? -1); if (e && e.close === close) e.close = undefined } }, [close, portalKeyRef])
  useEffect(() => () => { if (portalKeyRef.current) registry.delete(portalKeyRef.current) }, [portalKeyRef])
  const act = useCallback(async (action: 'cancel' | 'confirm' | 'close', handler?: () => any) => { if (!(await runHook(() => options.beforeClose?.(action)))) return; if (!(await runHook(handler))) return; if (action === 'confirm' ? meta.mode === 'alert' || meta.mode === 'confirm' : meta.mode === 'confirm') meta.resolve?.(action === 'confirm'); close() }, [close, meta, options.beforeClose])
  const handleClosed = useCallback(() => { options.onClosed?.(); if (portalKeyRef.current) { Portal.remove(portalKeyRef.current); registry.delete(portalKeyRef.current) } }, [options, portalKeyRef])
  return <Dialog {...options} visible={visible} onCancel={options.showCancelButton ? () => act('cancel', options.onCancel) : options.onCancel} onConfirm={() => act('confirm', options.onConfirm)} onClose={() => act('close', options.onClose)} onClosed={handleClosed} />
}

const mount = (options: DialogProps, meta: ImperativeMeta) => { const portalKeyRef = { current: 0 }; const element = <DialogPortalInstance options={options} meta={meta} portalKeyRef={portalKeyRef} />; const key = Portal.add(element); portalKeyRef.current = key; registry.set(key, { key, options, meta }); return () => requestClose(key) }
const normalize = (mode: ImperativeMode, options: DialogShowOptions = {}) => { const merged = deepMerge(deepMerge(defaults.default, defaults[mode]), options); const normalized: DialogProps = { ...merged, visible: true } as DialogProps; if (isUndefined(normalized.showConfirmButton)) normalized.showConfirmButton = true; return normalized }

const setDefaultOptions = (targetOrOptions: ImperativeMode | DialogShowOptions, maybeOptions?: DialogShowOptions) => { if (isString(targetOrOptions)) { defaults[targetOrOptions] = deepMerge(defaults[targetOrOptions], maybeOptions ?? {}); return }; defaults.default = deepMerge(defaults.default, targetOrOptions) }
const resetDefaultOptions = (target?: ImperativeMode) => { if (target) { defaults[target] = {}; return }; defaults.default = {}; defaults.show = {}; defaults.alert = {}; defaults.confirm = {} }

export const DialogImperative = {
  show: (options?: DialogShowOptions) => mount(normalize('show', options), { mode: 'show' }),
  alert: (options?: DialogAlertOptions) => new Promise<void>(resolve => { mount(normalize('alert', { ...options, showCancelButton: false }), { mode: 'alert', resolve }) }),
  confirm: (options?: DialogConfirmOptions) => new Promise<boolean>(resolve => { mount(normalize('confirm', { showCancelButton: true, ...options }), { mode: 'confirm', resolve: result => resolve(result === undefined ? true : result) }) }),
  clear: () => { registry.forEach((_, key) => requestClose(key)) },
  setDefaultOptions,
  resetDefaultOptions,
}

export const __DIALOG_STORE__ = { getItems: () => Array.from(registry.values()).map(({ key, options, meta }) => ({ key, options, meta })), close: requestClose }
