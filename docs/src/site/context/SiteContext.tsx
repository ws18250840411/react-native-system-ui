import React, { createContext, useContext } from 'react'
import { locales, navs, siteConfig } from '../config'
import type { MenuSection } from '../pageRegistry'
import type { LocaleCode } from '../config'
import type { ComponentType } from 'react'

type PageLike = {
  componentName: string
  locale: string
  navId: string
  navPath: string
  slug: string
  routePath: string
  title: string
  group?: string
  order: number
  frontmatter: Record<string, any>
  headings: Array<{ depth: number; text: string; slug: string }>
  Component: ComponentType
}

type SiteContextValue = {
  locale: LocaleCode
  navId: string
  navMenu: MenuSection[]
  currentPage?: PageLike
  site: typeof siteConfig
  navs: typeof navs
  locales: typeof locales
  buildLocalePath: (locale: LocaleCode) => string
}

const SiteContext = createContext<SiteContextValue | null>(null)

export const SiteProvider: React.FC<{
  value: SiteContextValue
  children?: React.ReactNode
}> = ({ value, children }) => {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSiteContext(): SiteContextValue {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useSiteContext must be used within SiteProvider')
  }
  return context
}
