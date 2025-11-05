import React from 'react'
import clsx from 'clsx'
import type { PageEntry } from '../pageRegistry'
import MarkdownPageContext from '../context/MarkdownPageContext'
import './MdContent/index.less'

type MarkdownContentProps = {
  page: PageEntry
}

const slugify = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const MarkdownContent: React.FC<MarkdownContentProps> = ({ page }) => {
  const { Component, frontmatter = {} } = page
  const { dispatch, state } = React.useContext(MarkdownPageContext)
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    dispatch({
      headings: page.headings || [],
      frontmatter: page.frontmatter || {},
      loading: false,
    })
  }, [dispatch, page.headings, page.frontmatter, page.navId, page.slug, page.locale])

  React.useEffect(() => {
    const container = contentRef.current
    if (!container) return
    const headingNodes = Array.from(container.querySelectorAll<HTMLHeadingElement>('h2, h3, h4'))
    if (!headingNodes.length) return
    headingNodes.forEach((node, index) => {
      const sourceHeading = state.headings?.[index]
      const slug = sourceHeading?.slug || slugify(node.textContent || `section-${index + 1}`)
      if (slug) {
        node.id = slug
        node.dataset.anchor = slug
      }
    })
  }, [state.headings, page.slug, page.locale])

  return (
    <div
      ref={contentRef}
      className={clsx('doc-md-content', {
        'doc-md-content--blank': frontmatter.blank,
        'doc-md-content--fluid': frontmatter.fluid,
      })}
    >
      <div className="doc-md-content__wrapper">
        <Component />
      </div>
    </div>
  )
}

export default MarkdownContent
