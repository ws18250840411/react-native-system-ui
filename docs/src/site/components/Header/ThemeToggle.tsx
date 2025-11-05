import React from 'react'
import MoonIcon from '../icons/MoonIcon'
import LightIcon from '../icons/LightIcon'

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof document === 'undefined') return 'light'
    return (document.documentElement.dataset.theme as 'light' | 'dark') || 'light'
  })

  React.useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <button type="button" className="doc-navbar__item" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <MoonIcon fill="#323232" /> : <LightIcon fill="#f4c430" />}
    </button>
  )
}

export default ThemeToggle
