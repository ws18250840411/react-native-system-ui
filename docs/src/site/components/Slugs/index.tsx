import React from 'react'
import './index.less'

type Heading = {
  depth: number
  text: string
  slug: string
}

type SlugsProps = {
  headings: Heading[]
}

const Slugs: React.FC<SlugsProps> = ({ headings }) => {
  const handleClick = React.useCallback((slug: string) => {
    const element = document.getElementById(slug)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  if (!headings.length) return null

  return (
    <aside className="doc-md--slugs" aria-label="Page outline">
      <div className="doc-md--slug doc-md--slug-title">On this page</div>
      {headings.map((heading) => (
        <button
          key={heading.slug}
          type="button"
          className={`doc-md--slug doc-md--slug-${heading.depth}`}
          onClick={() => handleClick(heading.slug)}
        >
          {heading.text}
        </button>
      ))}
    </aside>
  )
}

export default Slugs
