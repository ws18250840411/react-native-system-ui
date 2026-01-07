import { Flex as FlexBase } from './Flex'
import { FlexItem } from './FlexItem'

const Flex = Object.assign(FlexBase, { Item: FlexItem })

export default Flex
export { Flex }
export { FlexItem }
export type { FlexAlign, FlexItemProps, FlexJustify, FlexProps, FlexWrap } from './types'
