import React from 'react'
import MarkdownPageContext from '../../context/MarkdownPageContext'
import './index.less'

type SlugsProps = {
  title?: string
}

const Slugs: React.FC<SlugsProps> = ({ title = 'On this page' }) => {
  const { state } = React.useContext(MarkdownPageContext)
  const headings = React.useMemo(() => (state.headings || []).filter((item) => item.depth === 2 || item.depth === 3), [state.headings])
  const enabled = state.frontmatter?.slug !== false
  const [active, setActive] = React.useState<string>(headings[0]?.slug || '')

  React.useEffect(() => {
    setActive(headings[0]?.slug || '')
  }, [headings])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    if (!headings.length) return
    const offset = 120
    const elements = headings.map((heading) => document.getElementById(heading.slug))

    const handleScroll = () => {
      const scrollTop = window.scrollY + offset
      let current = headings[0]?.slug
      elements.forEach((el, index) => {
        if (!el) return
        if (el.offsetTop <= scrollTop) {
          current = headings[index]?.slug
        }
      })
      if (current) setActive(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  const handleClick = React.useCallback((slug: string) => {
    const element = document.getElementById(slug)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(slug)
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `#${slug}`)
      }
    }
  }, [])

  if (!enabled || !headings.length) return null

  return (
    <aside className="doc-md--slugs" aria-label="Page outline">
      <div className="doc-md--slug doc-md--slug-title">{title}</div>
      {headings.map((heading) => (
        <button
          key={heading.slug}
          type="button"
          className={`doc-md--slug doc-md--slug-${heading.depth}${active === heading.slug ? ' active' : ''}`}
          onClick={() => handleClick(heading.slug)}
        >
          {heading.text}
        </button>
      ))}
    </aside>
  )
}

export default Slugs
