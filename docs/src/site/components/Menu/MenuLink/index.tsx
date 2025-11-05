import React from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import './index.less'

type MenuLinkProps = {
  to: string
  title: string
}

const MenuLink: React.FC<MenuLinkProps> = ({ to, title }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => clsx('doc-menulink', { 'doc-menulink--active': isActive })}
    >
      {title}
    </NavLink>
  )
}

export default MenuLink
