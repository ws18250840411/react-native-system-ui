import type React from 'react'
import type {
  DialogProps,
  DialogActionState,
  DialogMessageAlign,
  DialogTheme,
  DialogBeforeCloseAction,
  DialogStatic,
  DialogShowOptions,
  DialogAlertOptions,
  DialogConfirmOptions,
  DialogSetDefaultOptions,
  DialogResetDefaultOptions,
} from './types'
import { Dialog as DialogBase } from './Dialog'
import { PortalHost } from '../portal'
import { DialogImperative } from './imperative'

const DialogWithStatics = Object.assign(DialogBase, {
  Host: PortalHost,
  show: DialogImperative.show,
  alert: DialogImperative.alert,
  confirm: DialogImperative.confirm,
  clear: DialogImperative.clear,
  setDefaultOptions: DialogImperative.setDefaultOptions,
  resetDefaultOptions: DialogImperative.resetDefaultOptions,
}) as React.FC<DialogProps> & DialogStatic

const Dialog = DialogWithStatics

export default Dialog
export { Dialog }
export type {
  DialogProps,
  DialogTheme,
  DialogMessageAlign,
  DialogActionState,
  DialogBeforeCloseAction,
  DialogShowOptions,
  DialogAlertOptions,
  DialogConfirmOptions,
  DialogSetDefaultOptions,
  DialogResetDefaultOptions,
}
