import { Toast as ToastComponent } from './Toast'
import { ToastImperative } from './imperative'

const Toast = Object.assign(ToastComponent, ToastImperative)

export type { ToastProps, ToastPosition, ToastType } from './Toast'
export type { ToastShowOptions, ToastInput, ToastReturnType } from './imperative'
export default Toast
export { Toast }
