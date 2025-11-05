import React from 'react'
import clsx from 'clsx'
import type { PageEntry } from '../pageRegistry'
import './MdContent/index.less'

type MarkdownContentProps = {
  page: PageEntry
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ page }) => {
  const { Component, frontmatter = {} } = page

  return (
    <div
      className={clsx('doc-md-content', {
        'doc-md-content--blank': frontmatter.blank,
        'doc-md-content--fluid': frontmatter.fluid,
      })}
    >
      <Component />
    </div>
  )
}

export default MarkdownContent
