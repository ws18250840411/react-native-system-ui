import React from 'react'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'
import { useSiteContext } from '../../context/SiteContext'
import MenuLink from './MenuLink'
import './index.less'

const normalizePath = (path: string) => path.replace(/\/$/, '') || '/'

const Menu: React.FC = () => {
  const { navMenu } = useSiteContext()
  const location = useLocation()
  const currentPath = normalizePath(location.pathname || '/')

  return (
    <nav className="doc-menu">
      <div className="doc-menu__group">
        {navMenu.map((section, index) => (
          <React.Fragment key={`${section.title ?? 'section'}-${index}`}>
            {section.title ? <div className="doc-menu__title">{section.title}</div> : null}
            {section.items.map((item) => {
              const itemPath = normalizePath(item.path)
              const isActive = currentPath === itemPath
              return (
                <div
                  key={item.path}
                  className={clsx('doc-menu__item', {
                    'doc-menu__item--active': isActive,
                  })}
                >
                  <MenuLink to={item.path} title={item.title} />
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </nav>
  )
}

export default Menu
