import type { ComponentType } from 'react'
import { defaultLocale, navs } from './config'
import { normalizeLocale, toKebabCase } from './utils/strings'

type MarkdownModule = {
  default: ComponentType
  frontmatter?: Record<string, any>
  headings?: Array<{ depth: number; text: string; slug: string }>
  title?: string
}

export type PageEntry = {
  id: string
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

const pageModules = import.meta.glob<MarkdownModule>('../pages/**/index.*.md', {
  eager: true,
})

const entries: PageEntry[] = []

for (const [filepath, mod] of Object.entries(pageModules)) {
  const match = filepath.match(/\.\.\/pages\/([^/]+)\/index\.([\w-]+)\.md$/)
  if (!match) continue
  const [, componentName, localeRaw] = match
  const locale = normalizeLocale(localeRaw) ?? localeRaw
  const frontmatter = { ...(mod.frontmatter || {}) }
  const navId = (frontmatter.nav as string) || 'components'
  const navConfig = navs.find((item) => item.id === navId)
  const navPath = navConfig?.path || `/${navId}`
  const slug = (frontmatter.slug as string) || toKebabCase(componentName)
  const title = (frontmatter.title as string) || mod.title || componentName
  const group = (frontmatter.group as string) || undefined
  const order = Number(frontmatter.order ?? 0) || 0
  const normalizedNavPath = navPath.endsWith('/') ? navPath.slice(0, -1) : navPath
  const basePath = `${normalizedNavPath}/${slug}`.replace(/\/{2,}/g, '/')
  const routePath = locale === defaultLocale ? basePath : `/${locale}${basePath}`

  entries.push({
    id: `${navId}|${slug}|${locale}`,
    componentName,
    locale,
    navId,
    navPath: normalizedNavPath,
    slug,
    routePath,
    title,
    group,
    order,
    frontmatter,
    headings: mod.headings || [],
    Component: mod.default,
  })
}

entries.sort((a, b) => {
  if (a.navId !== b.navId) return a.navId.localeCompare(b.navId)
  if (a.locale !== b.locale) return a.locale.localeCompare(b.locale)
  if (a.order !== b.order) return a.order - b.order
  if (a.group !== b.group) {
    const groupA = a.group || ''
    const groupB = b.group || ''
    if (groupA !== groupB) return groupA.localeCompare(groupB)
  }
  return a.slug.localeCompare(b.slug)
})

const pageIndex = new Map<string, Map<string, PageEntry>>()
for (const entry of entries) {
  const key = `${entry.navId}|${entry.slug}`
  if (!pageIndex.has(key)) {
    pageIndex.set(key, new Map())
  }
  pageIndex.get(key)!.set(entry.locale, entry)
}

export function findPage(navId: string, slug: string, locale: string): PageEntry | undefined {
  const localeMap = pageIndex.get(`${navId}|${slug}`)
  if (!localeMap) return undefined
  return localeMap.get(locale) || localeMap.get(defaultLocale)
}

export function listPagesByLocale(navId: string, locale: string): PageEntry[] {
  return entries.filter((entry) => entry.navId === navId && entry.locale === locale)
}

export function getFirstPage(navId: string, locale: string): PageEntry | undefined {
  const pages = listPagesByLocale(navId, locale)
  return pages[0]
}

export type MenuSection = {
  title?: string
  items: Array<{
    title: string
    path: string
    slug: string
    order: number
    frontmatter: Record<string, any>
  }>
}

export function buildMenu(navId: string, locale: string): MenuSection[] {
  const pages = listPagesByLocale(navId, locale)
  const sectionMap = new Map<string | undefined, MenuSection>()
  for (const page of pages) {
    const sectionKey = page.group
    if (!sectionMap.has(sectionKey)) {
      sectionMap.set(sectionKey, {
        title: sectionKey,
        items: [],
      })
    }
    sectionMap.get(sectionKey)!.items.push({
      title: page.title,
      path: page.routePath,
      slug: page.slug,
      order: page.order,
      frontmatter: page.frontmatter,
    })
  }
  const sections = Array.from(sectionMap.values())
  sections.forEach((section) => {
    section.items.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.title.localeCompare(b.title)
    })
  })
  return sections
}

export const allPages = entries
