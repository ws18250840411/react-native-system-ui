import React from 'react'
import type { PageEntry } from '../pageRegistry'
import Header from './Header'
import Menu from './Menu'
import Container from './Container'
import MarkdownContent from './MarkdownContent'
import Slugs from './Slugs'
import './layout.less'

type LayoutProps = {
  page: PageEntry
}

const Layout: React.FC<LayoutProps> = ({ page }) => {
  return (
    <div className="doc-layout">
      <Header />
      <div className="doc-layout__body">
        <Menu />
        <Container>
          <MarkdownContent page={page} />
        </Container>
        <Slugs headings={page.headings || []} />
      </div>
    </div>
  )
}

export default Layout
