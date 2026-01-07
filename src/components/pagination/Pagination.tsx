import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { usePaginationTokens } from './tokens'
import type { PaginationProps, PaginationPageItem } from './types'
import { useControllableValue } from '../../hooks'
import { clamp } from '../../utils/number'

const isTextLike = (value: React.ReactNode): value is string | number =>
  typeof value === 'string' || typeof value === 'number'

const Pagination = React.forwardRef<View, PaginationProps>((props, ref) => {
  const {
    mode = 'multi',
    pageCount = 0,
    totalItems = 0,
    itemsPerPage = 10,
    showPageSize = 5,
    forceEllipses = false,
    prevText = '上一页',
    nextText = '下一页',
    pageDesc,
    pageRender,
    style,
    ...rest
  } = props

  const tokens = usePaginationTokens(props.tokensOverride)
  const [page, setPage] = useControllableValue<number>(props, {
    defaultValue: 1,
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
          styles.item,
          {
            paddingHorizontal: tokens.spacing.paddingX,
            paddingVertical: tokens.spacing.paddingY,
            borderColor: tokens.colors.border,
            borderRadius: tokens.radius,
            backgroundColor: item.active ? tokens.colors.activeBackground : 'transparent',
          },
          pressed && !item.active ? { opacity: 0.7 } : null,
        ]}
        testID={`rv-pagination-page-${index}`}
      >
        {isTextLike(node) ? (
          <Text style={{ color: textColor, fontWeight: item.active ? '600' : '400' }}>
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
          styles.control,
          {
            paddingHorizontal: tokens.spacing.paddingX,
            paddingVertical: tokens.spacing.paddingY,
            borderColor: tokens.colors.border,
            borderRadius: tokens.radius,
            opacity: disabled ? 0.5 : 1,
          },
          pressed && !disabled ? { opacity: 0.7 } : null,
        ]}
        testID={`rv-pagination-${type}`}
      >
        {isTextLike(label) ? (
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
    <View ref={ref} style={[styles.container, style]} {...rest}>
      {renderControl('prev')}
      {mode === 'multi' ? (
        <View style={[styles.pages, { gap: tokens.spacing.gap }]}>
          {pages.map(renderPage)}
        </View>
      ) : null}
      {descNode == null ? null : isTextLike(descNode) ? (
        <Text style={[styles.desc, { color: tokens.colors.text }]} testID="rv-pagination-desc">
          {descNode}
        </Text>
      ) : (
        <View style={styles.desc} testID="rv-pagination-desc">
          {descNode}
        </View>
      )}
      {renderControl('next')}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  control: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  desc: {
    marginHorizontal: 4,
  },
})

Pagination.displayName = 'Pagination'

export default Pagination
