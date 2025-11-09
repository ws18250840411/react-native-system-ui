import { Cell as CellBase } from './Cell'
import { CellGroup } from './CellGroup'

const Cell = Object.assign(CellBase, { Group: CellGroup })

export default Cell
export { Cell }
export { CellGroup }
export type { CellProps, CellGroupProps, CellArrowDirection, CellSize } from './types'
