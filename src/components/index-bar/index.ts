import IndexBarBase from './IndexBar'
import IndexAnchor from './IndexAnchor'

export type { IndexBarInstance, IndexBarProps, IndexBarValue, IndexAnchorProps } from './types'
export { useIndexBarTokens } from './tokens'

const IndexBar = IndexBarBase as typeof IndexBarBase & {
  Anchor: typeof IndexAnchor
}

IndexBar.Anchor = IndexAnchor

export { IndexAnchor }
export default IndexBar
