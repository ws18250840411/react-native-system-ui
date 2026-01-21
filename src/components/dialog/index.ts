import type React from 'react'
import type {
  DialogProps,
  DialogStatic,
} from './types'
import { Dialog as DialogBase } from './Dialog'
import { PortalHost } from '../portal'
import { DialogImperative } from './imperative'

export const Dialog = Object.assign(DialogBase, {
  Host: PortalHost,
  show: DialogImperative.show,
  alert: DialogImperative.alert,
  confirm: (options?: Parameters<typeof DialogImperative.confirm>[0]) => {
    const promise = DialogImperative.confirm(options).then(result =>
      result === false ? Promise.reject(false) : result
    )
    promise.catch(() => { })
    return promise
  },
  clear: DialogImperative.clear,
  setDefaultOptions: DialogImperative.setDefaultOptions,
  resetDefaultOptions: DialogImperative.resetDefaultOptions,
}) as React.FC<DialogProps> & DialogStatic

export default Dialog
export type * from './types'
