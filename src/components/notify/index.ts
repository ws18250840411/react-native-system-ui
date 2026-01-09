import { Notify as NotifyComponent } from './Notify'
import { NotifyImperative } from './imperative'

const Notify = Object.assign(NotifyComponent, NotifyImperative)

export type { NotifyProps, NotifyType, NotifyPosition } from './types'
export type { NotifyShowOptions, NotifyInput, NotifyReturnType } from './imperative'
export default Notify
export { Notify }
