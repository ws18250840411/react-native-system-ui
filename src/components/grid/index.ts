import { Grid } from './Grid'
import { GridItem } from './GridItem'

export type { GridProps, GridItemProps, GridDirection } from './types'

export const GridComponent = Object.assign(Grid, {
  Item: GridItem,
})

export default GridComponent
