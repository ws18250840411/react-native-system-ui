import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { usePaginationTokens } from './tokens'
import type { PaginationProps, PaginationPageItem } from './types'
import { useControllableValue } from '../../hooks'
import { clamp } from '../../utils/number'
import { isText } from '../../utils/validate'

const Pagination = React.forwardRef<View, PaginationProps>((props, ref) => {
  const {
    tokensOverride,
    mode: modeProp,
    pageCount: pageCountProp,
    totalItems: totalItemsProp,
    itemsPerPage: itemsPerPageProp,
    showPageSize: showPageSizeProp,
    forceEllipses: forceEllipsesProp,
    prevText: prevTextProp,
    nextText: nextTextProp,
    pageDesc,
    pageRender,
    style,
    ...rest
  } = props

  const tokens = usePaginationTokens(tokensOverride)

  const mode = modeProp ?? tokens.defaults.mode
  const pageCount = pageCountProp ?? tokens.defaults.pageCount
  const totalItems = totalItemsProp ?? tokens.defaults.totalItems
  const itemsPerPage = itemsPerPageProp ?? tokens.defaults.itemsPerPage
  const showPageSize = showPageSizeProp ?? tokens.defaults.showPageSize
  const forceEllipses = forceEllipsesProp ?? tokens.defaults.forceEllipses
  const prevText = prevTextProp ?? tokens.defaults.prevText
  const nextText = nextTextProp ?? tokens.defaults.nextText
  const [page, setPage] = useControllableValue<number>(props, {
    defaultValue: tokens.defaults.defaultPage,
  })

  const count =
    pageCount > 0
      ? pageCount
      : totalItems && itemsPerPage
        ? Math.max(1, Math.ceil(totalItems / itemsPerPage))
        : 1
  const currentPage = clamp(page, 1, count)

  const pages: PaginationPageItem[] = []
  if (mode === 'multi') {
    const limit = Math.max(1, showPageSize)
    let startPage = 1
    let endPage = count
    const maxSized = limit < count

    if (maxSized) {
      startPage = Math.max(currentPage - Math.floor(limit / 2), 1)
      endPage = startPage + limit - 1
      if (endPage > count) {
        endPage = count
        startPage = endPage - limit + 1
      }
    }

    for (let number = startPage; number <= endPage; number += 1) {
      pages.push({ number, text: number, active: number === currentPage })
    }

    if (maxSized && forceEllipses) {
      if (startPage > 1) pages.unshift({ number: startPage - 1, text: '...' })
      if (endPage < count) pages.push({ number: endPage + 1, text: '...' })
    }
  }

  React.useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage)
    }
  }, [currentPage, page, setPage])

  const handleSelect = (next: number) => setPage(clamp(next, 1, count))

  const renderPage = (item: PaginationPageItem, index: number) => {
    const node = pageRender ? pageRender(item) : item.text
    const textColor = item.active ? tokens.colors.activeText : tokens.colors.text

    return (
      <Pressable
        accessibilityRole="button"
        key={`${item.number}-${index}`}
        onPress={() => handleSelect(item.number)}
        style={({ pressed }) => [
          tokens.layout.item,
          {
            borderWidth: tokens.borders.width,
            paddingHorizontal: tokens.spacing.paddingX,
            paddingVertical: tokens.spacing.paddingY,
            borderColor: tokens.colors.border,
            borderRadius: tokens.radii.item,
            backgroundColor: item.active ? tokens.colors.activeBackground : 'transparent',
          },
          pressed && !item.active ? { opacity: tokens.defaults.pressedOpacity } : null,
        ]}
        testID={`rv-pagination-page-${index}`}
      >
        {isText(node) ? (
          <Text
            style={{
              color: textColor,
              fontWeight: item.active ? tokens.typography.activeFontWeight : tokens.typography.fontWeight,
            }}
          >
            {node}
          </Text>
        ) : (
          node
        )}
      </Pressable>
    )
  }

  const renderControl = (type: 'prev' | 'next') => {
    const disabled = type === 'prev' ? currentPage <= 1 : currentPage >= count
    const target = type === 'prev' ? currentPage - 1 : currentPage + 1
    const label = type === 'prev' ? prevText : nextText
    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => handleSelect(target)}
        disabled={disabled}
        style={({ pressed }) => [
          tokens.layout.control,
          {
            borderWidth: tokens.borders.width,
            paddingHorizontal: tokens.spacing.paddingX,
            paddingVertical: tokens.spacing.paddingY,
            borderColor: tokens.colors.border,
            borderRadius: tokens.radii.item,
            opacity: disabled ? tokens.defaults.disabledOpacity : 1,
          },
          pressed && !disabled ? { opacity: tokens.defaults.pressedOpacity } : null,
        ]}
        testID={`rv-pagination-${type}`}
      >
        {isText(label) ? (
          <Text style={{ color: disabled ? tokens.colors.disabled : tokens.colors.text }}>
            {label}
          </Text>
        ) : (
          label
        )}
      </Pressable>
    )
  }

  const descNode = mode === 'multi' ? null : pageDesc ?? `${currentPage}/${count}`

  return (
    <View ref={ref} style={[tokens.layout.container, { gap: tokens.spacing.gap }, style]} {...rest}>
      {renderControl('prev')}
      {mode === 'multi' ? (
        <View style={[tokens.layout.pages, { gap: tokens.spacing.gap }]}>
          {pages.map(renderPage)}
        </View>
      ) : null}
      {descNode == null ? null : isText(descNode) ? (
        <Text
          style={[
            tokens.layout.desc,
            { marginHorizontal: tokens.spacing.descMarginHorizontal, color: tokens.colors.text },
          ]}
          testID="rv-pagination-desc"
        >
          {descNode}
        </Text>
      ) : (
        <View
          style={[tokens.layout.desc, { marginHorizontal: tokens.spacing.descMarginHorizontal }]}
          testID="rv-pagination-desc"
        >
          {descNode}
        </View>
      )}
      {renderControl('next')}
    </View>
  )
})

Pagination.displayName = 'Pagination'

export default Pagination
