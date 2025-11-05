import React from 'react'

export type HeadingItem = {
  depth: number
  text: string
  slug: string
}

export type MarkdownPageState = {
  headings: HeadingItem[]
  frontmatter?: Record<string, any>
  loading: boolean
}

const defaultState: MarkdownPageState = {
  headings: [],
  frontmatter: {},
  loading: true,
}

const MarkdownPageContext = React.createContext<{
  state: MarkdownPageState
  dispatch: (payload: Partial<MarkdownPageState>) => void
}>({
  state: defaultState,
  dispatch: () => undefined,
})

export default MarkdownPageContext
