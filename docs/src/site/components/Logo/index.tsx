import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import defaultLogo from './default_logo.svg'
import { useSiteContext } from '../../context/SiteContext'

const Logo: React.FC = () => {
  const { site, locale, buildLocalePath } = useSiteContext()
  const to = buildLocalePath(locale)

  return (
    <div className="doc-logo">
      <Link to={to} className="doc-logo--main">
        <img alt="logo" src={site.logo || defaultLogo} />
        <span>{site.title}</span>
      </Link>
    </div>
  )
}

export default Logo
