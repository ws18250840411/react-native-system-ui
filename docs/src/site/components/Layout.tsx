import React from 'react'
import type { PageEntry } from '../pageRegistry'
import Header from './Header'
import Menu from './Menu'
import Container from './Container'
import MarkdownContent from './MarkdownContent'
import Slugs from './Slugs'
import MarkdownPageContext, { type MarkdownPageState } from '../context/MarkdownPageContext'
import './layout.less'

type LayoutProps = {
  page: PageEntry
}

const Layout: React.FC<LayoutProps> = ({ page }) => {
  const [state, setState] = React.useState<MarkdownPageState>({
    headings: page.headings || [],
    frontmatter: page.frontmatter || {},
    loading: false,
  })

  React.useEffect(() => {
    setState({
      headings: page.headings || [],
      frontmatter: page.frontmatter || {},
      loading: false,
    })
  }, [page.headings, page.frontmatter, page.navId, page.slug, page.locale])

  const dispatch = React.useCallback((payload: Partial<MarkdownPageState>) => {
    setState((prev) => ({ ...prev, ...payload }))
  }, [])

  return (
    <MarkdownPageContext.Provider value={{ state, dispatch }}>
      <div className="doc-layout">
        <Header />
        <div className="doc-layout__body">
          <Menu />
          <Container>
            <MarkdownContent page={page} />
          </Container>
          <Slugs title={page.locale?.toLowerCase().startsWith('zh') ? '本页目录' : 'On this page'} />
        </div>
      </div>
    </MarkdownPageContext.Provider>
  )
}

export default Layout
