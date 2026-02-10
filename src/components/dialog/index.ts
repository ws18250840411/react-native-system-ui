import type React from 'react'
import type { DialogProps, DialogStatic } from './types'
import { Dialog as DialogBase } from './Dialog'
import { PortalHost } from '../portal'
import { DialogImperative } from './imperative'

const confirmWrapper = (options?: Parameters<typeof DialogImperative.confirm>[0]) => { const p = DialogImperative.confirm(options).then(r => r === false ? Promise.reject(false) : r); p.catch(() => {}); return p }

export const Dialog = Object.assign(DialogBase, { Host: PortalHost, show: DialogImperative.show, alert: DialogImperative.alert, confirm: confirmWrapper, clear: DialogImperative.clear, setDefaultOptions: DialogImperative.setDefaultOptions, resetDefaultOptions: DialogImperative.resetDefaultOptions }) as React.FC<DialogProps> & DialogStatic

export default Dialog
export type * from './types'
