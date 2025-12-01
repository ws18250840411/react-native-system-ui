import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { usePaginationTokens } from './tokens'
import type { PaginationProps, PaginationPageItem } from './types'
import { useControllableValue } from '../../hooks'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const makePage = (number: number, text: React.ReactNode, active?: boolean): PaginationPageItem => ({
  number,
  text,
  active,
})

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

  const tokens = usePaginationTokens()
  const [page, setPage] = useControllableValue<number>(props, {
    defaultValue: 1,
  })

  const count = React.useMemo(() => {
    if (pageCount > 0) return pageCount
    if (totalItems && itemsPerPage) {
      return Math.max(1, Math.ceil(totalItems / itemsPerPage))
    }
    return 1
  }, [itemsPerPage, pageCount, totalItems])

  const pages = React.useMemo(() => {
    if (mode !== 'multi') return []
    const items: PaginationPageItem[] = []
    const limit = Math.max(1, showPageSize)
    let startPage = 1
    let endPage = count
    const maxSized = limit < count

    if (maxSized) {
      startPage = Math.max(page - Math.floor(limit / 2), 1)
      endPage = startPage + limit - 1
      if (endPage > count) {
        endPage = count
        startPage = endPage - limit + 1
      }
    }

    for (let number = startPage; number <= endPage; number += 1) {
      items.push(makePage(number, number, number === page))
    }

    if (maxSized && forceEllipses) {
      if (startPage > 1) {
        items.unshift(makePage(startPage - 1, '...'))
      }
      if (endPage < count) {
        items.push(makePage(endPage + 1, '...'))
      }
    }

    return items
  }, [mode, showPageSize, count, page, forceEllipses])

  React.useEffect(() => {
    setPage(clamp(page, 1, count))
  }, [count])

  const handleSelect = React.useCallback((next: number) => {
    const target = clamp(next, 1, count)
    setPage(target)
  }, [count, setPage])

  const renderPage = (item: PaginationPageItem, index: number) => (
    <Pressable
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
      <Text style={{
        color: item.active ? tokens.colors.activeText : tokens.colors.text,
        fontWeight: item.active ? '600' : '400',
      }}>
        {pageRender ? pageRender(item) : item.text}
      </Text>
    </Pressable>
  )

  const renderDesc = () => {
    if (mode !== 'multi') {
      return (
        <Text style={[styles.desc, { color: tokens.colors.text }]}
          testID="rv-pagination-desc"
        >
          {pageDesc ?? `${page}/${count}`}
        </Text>
      )
    }
    return null
  }

  const renderControl = (type: 'prev' | 'next') => {
    const disabled = type === 'prev' ? page <= 1 : page >= count
    const target = type === 'prev' ? page - 1 : page + 1
    return (
      <Pressable
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
        <Text style={{ color: disabled ? tokens.colors.disabled : tokens.colors.text }}>
          {type === 'prev' ? prevText : nextText}
        </Text>
      </Pressable>
    )
  }

  return (
    <View ref={ref} style={[styles.container, style]} {...rest}>
      {renderControl('prev')}
      {mode === 'multi' ? (
        <View style={[styles.pages, { gap: tokens.spacing.gap }]}>
          {pages.map(renderPage)}
        </View>
      ) : null}
      {renderDesc()}
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
