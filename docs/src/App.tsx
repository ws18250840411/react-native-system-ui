import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './site/components/Layout'
import { SiteProvider } from './site/context/SiteContext'
import { allPages, buildMenu, findPage, getFirstPage, type PageEntry } from './site/pageRegistry'
import { defaultLocale, locales, navs, siteConfig, type LocaleCode } from './site/config'

const DocRoute: React.FC<{ page: PageEntry }> = ({ page }) => {
  const locale = (page.locale as LocaleCode) || defaultLocale

  const navMenu = React.useMemo(() => {
    const menu = buildMenu(page.navId, locale)
    if (menu.length > 0) return menu
    if (locale !== defaultLocale) return buildMenu(page.navId, defaultLocale)
    return menu
  }, [page.navId, locale])

  const buildLocalePath = React.useCallback(
    (targetLocale: LocaleCode) => {
      if (targetLocale === locale) return page.routePath
      const matched = findPage(page.navId, page.slug, targetLocale)
      if (matched) return matched.routePath
      const fallback =
        getFirstPage(page.navId, targetLocale) ||
        getFirstPage(navs[0]?.id || 'components', targetLocale) ||
        getFirstPage(navs[0]?.id || 'components', defaultLocale)
      return fallback ? fallback.routePath : '/'
    },
    [locale, page.navId, page.routePath, page.slug],
  )

  return (
    <SiteProvider
      value={{
        locale,
        navId: page.navId,
        navMenu,
        currentPage: page,
        site: siteConfig,
        navs,
        locales,
        buildLocalePath,
      }}
    >
      <Layout page={page} />
    </SiteProvider>
  )
}

const DocsRoutes: React.FC = () => {
  const defaultNavId = navs[0]?.id || 'components'
  const defaultPage = getFirstPage(defaultNavId, defaultLocale) || allPages[0]

  return (
    <Routes>
      <Route
        path="/"
        element={
          defaultPage ? <Navigate to={defaultPage.routePath} replace /> : <div>No documentation pages found.</div>
        }
      />
      {navs.map((nav) => {
        const basePath = nav.path.startsWith('/') ? nav.path : `/${nav.path}`
        const defaultLocalePage = getFirstPage(nav.id, defaultLocale) || defaultPage
        return (
          <React.Fragment key={nav.id}>
            {defaultLocalePage && (
              <Route
                path={basePath}
                element={<Navigate to={defaultLocalePage.routePath} replace />}
              />
            )}
            {locales
              .map(([code]) => code as LocaleCode)
              .filter((code) => code !== defaultLocale)
              .map((code) => {
                const localePage = getFirstPage(nav.id, code) || defaultLocalePage
                if (!localePage) return null
                const localizedPath = `/${code}${basePath}`.replace(/\/{2,}/g, '/')
                return (
                  <Route
                    key={`${nav.id}-${code}`}
                    path={localizedPath}
                    element={<Navigate to={localePage.routePath} replace />}
                  />
                )
              })}
          </React.Fragment>
        )
      })}
      {allPages.map((page) => (
        <Route key={page.id} path={page.routePath} element={<DocRoute page={page} />} />
      ))}
      {defaultPage && <Route path="*" element={<Navigate to={defaultPage.routePath} replace />} />}
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <DocsRoutes />
    </BrowserRouter>
  )
}

export default App
