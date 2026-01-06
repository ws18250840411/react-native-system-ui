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
  confirm: DialogImperative.confirm,
  clear: DialogImperative.clear,
  setDefaultOptions: DialogImperative.setDefaultOptions,
  resetDefaultOptions: DialogImperative.resetDefaultOptions,
}) as React.FC<DialogProps> & DialogStatic

export default Dialog
export type * from './types'
