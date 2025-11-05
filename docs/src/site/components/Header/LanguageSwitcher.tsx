import React from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useSiteContext } from '../../context/SiteContext'
import type { LocaleCode } from '../../config'
import LanguageIcon from '../icons/LanguageIcon'

const LanguageSwitcher: React.FC = () => {
  const navigate = useNavigate()
  const { locales, locale, buildLocalePath } = useSiteContext()

  const onSelect = (code: LocaleCode) => {
    if (code === locale) return
    const target = buildLocalePath(code)
    navigate(target)
  }

  return (
    <div className="doc-navbar__item doc-header-action__lang" role="listbox" aria-label="Select language">
      <LanguageIcon fill="#323232" />
      <div className="doc-language-dropdown">
        {locales.map(([code, label]) => (
          <button
            key={code}
            type="button"
            onClick={() => onSelect(code)}
            className={clsx('doc-language-dropdown__item', {
              'doc-language-dropdown__item--active': code === locale,
            })}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
