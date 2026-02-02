import React, { useCallback, useEffect, useMemo } from 'react'
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

  const pageCountNumber = Number.isFinite(pageCount) ? Math.floor(pageCount) : 0
  const totalItemsNumber = Number.isFinite(totalItems) ? Math.floor(totalItems) : 0
  const itemsPerPageNumber = Number.isFinite(itemsPerPage) ? Math.floor(itemsPerPage) : 0
  const showPageSizeNumber = Number.isFinite(showPageSize) ? Math.floor(showPageSize) : 0

  const count =
    pageCountNumber > 0
      ? pageCountNumber
      : totalItemsNumber > 0 && itemsPerPageNumber > 0
        ? Math.max(1, Math.ceil(totalItemsNumber / itemsPerPageNumber))
        : 1
  const currentPage = clamp(page, 1, count)

  const pages = useMemo(() => {
    const items: PaginationPageItem[] = []
    if (mode !== 'multi') return items

    const limit = Math.max(1, showPageSizeNumber)
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
      items.push({ number, text: number, active: number === currentPage })
    }

    if (maxSized && forceEllipses) {
      if (startPage > 1) items.unshift({ number: startPage - 1, text: '...' })
      if (endPage < count) items.push({ number: endPage + 1, text: '...' })
    }

    return items
  }, [count, currentPage, forceEllipses, mode, showPageSizeNumber])

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage)
    }
  }, [currentPage, page, setPage])

  const handleSelect = useCallback((next: number) => setPage(clamp(next, 1, count)), [count, setPage])

  const renderPage = useCallback((item: PaginationPageItem, index: number) => {
    const node = pageRender ? pageRender(item) : item.text
    const textColor = item.active ? tokens.colors.activeText : tokens.colors.text

    return (
      <Pressable
        accessibilityRole="button"
        key={`${item.number}-${index}`}
        onPress={() => handleSelect(item.number)}
        style={({ pressed }) => [
          tokens.layout.item,
          item.active && { backgroundColor: tokens.colors.activeBackground },
          pressed && !item.active && { opacity: tokens.defaults.pressedOpacity },
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
  }, [handleSelect, pageRender, tokens.colors.activeText, tokens.colors.text, tokens.defaults.pressedOpacity, tokens.layout.item])

  const renderControl = useCallback((type: 'prev' | 'next') => {
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
          disabled && { opacity: tokens.defaults.disabledOpacity },
          pressed && !disabled && { opacity: tokens.defaults.pressedOpacity },
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
  }, [
    count,
    currentPage,
    handleSelect,
    nextText,
    prevText,
    tokens.colors.disabled,
    tokens.colors.text,
    tokens.defaults.disabledOpacity,
    tokens.defaults.pressedOpacity,
    tokens.layout.control,
  ])

  const descNode = useMemo(
    () => (mode === 'multi' ? null : pageDesc ?? `${currentPage}/${count}`),
    [count, currentPage, mode, pageDesc]
  )

  return (
    <View ref={ref} style={[tokens.layout.container, style]} {...rest}>
      {renderControl('prev')}
      {mode === 'multi' ? (
        <View style={tokens.layout.pages}>
          {pages.map(renderPage)}
        </View>
      ) : null}
      {descNode == null ? null : isText(descNode) ? (
        <Text
          style={tokens.layout.desc}
          testID="rv-pagination-desc"
        >
          {descNode}
        </Text>
      ) : (
        <View
          style={tokens.layout.desc}
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
