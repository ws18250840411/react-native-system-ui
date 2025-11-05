import React from 'react'
import GithubIcon from '../icons/GithubIcon'
import { useSiteContext } from '../../context/SiteContext'

const GithubLink: React.FC = () => {
  const { site } = useSiteContext()
  if (!site.github) return null
  return (
    <a
      className="doc-navbar__item doc-header-action__github"
      href={site.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <GithubIcon fill="#323232" />
    </a>
  )
}

export default GithubLink
