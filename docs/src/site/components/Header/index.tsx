import React from 'react'
import { useSiteContext } from '../../context/SiteContext'
import Logo from '../Logo'
import Navbar from './Navbar'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import GithubLink from './GithubLink'
import { defaultLocale } from '../../config'
import './index.less'

const Header: React.FC = () => {
  const { navs, locale } = useSiteContext()

  const navItems = React.useMemo(() => {
    return navs.map((nav) => {
      const basePath = nav.path.startsWith('/') ? nav.path : `/${nav.path}`
      const localizedPath = locale === defaultLocale ? basePath : `/${locale}${basePath}`
      return {
        path: localizedPath.replace(/\/{2,}/g, '/'),
        label: nav.titles[locale] ?? nav.titles['zh-CN'] ?? nav.id,
      }
    })
  }, [navs, locale])

  return (
    <header className="doc-header">
      <Logo />
      <Navbar items={navItems} />
      <div className="doc-header-action">
        <LanguageSwitcher />
        <ThemeToggle />
        <GithubLink />
      </div>
    </header>
  )
}

export default Header
