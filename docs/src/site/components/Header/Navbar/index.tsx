import React from 'react'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import './index.less'

export type NavbarItem = {
  path: string
  label: string
}

type NavbarProps = {
  items: NavbarItem[]
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  if (!items.length) return null
  return (
    <nav className="doc-navbar">
      {items.map((item) => (
        <div className="doc-navbar__item" key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              clsx('doc-navbar__link', {
                'doc-navbar__link--active': isActive,
              })
            }
          >
            {item.label}
          </NavLink>
        </div>
      ))}
    </nav>
  )
}

export default Navbar
