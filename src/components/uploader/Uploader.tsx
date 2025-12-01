import React from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useUploaderTokens } from './tokens'
import type { UploaderProps, UploaderValueItem, UploaderItemStatus } from './types'
import { useControllableValue } from '../../hooks'
import Image from '../image'
import ImagePreview from '../image-preview'

const normalizeSize = (size: number | string | undefined, fallback: number) => {
  if (typeof size === 'number' && Number.isFinite(size)) {
    return size
  }
  if (typeof size === 'string') {
    const parsed = Number.parseFloat(size)
    if (!Number.isNaN(parsed)) {
      return parsed
    }
  }
  return fallback
}

const ensureArray = (payload?: UploaderValueItem | UploaderValueItem[] | void) => {
  if (!payload) return []
  return Array.isArray(payload) ? payload : [payload]
}

const resolveSource = (item: UploaderValueItem) => {
  if (item.source) return item.source
  if (item.thumbnail) {
    return { uri: item.thumbnail }
  }
  if (item.url) {
    return { uri: item.url }
  }
  return undefined
}

const statusDefaults: Record<UploaderItemStatus, string> = {
  pending: '上传中',
  failed: '上传失败',
}

const Uploader = React.forwardRef<View, UploaderProps>((props, ref) => {
  const {
    maxCount = Number.MAX_SAFE_INTEGER,
    previewSize,
    imageFit = 'cover',
    previewImage = true,
    previewFullImage = true,
    previewOptions,
    previewCoverRender,
    showUpload = true,
    uploadText,
    uploadIcon,
    disabled = false,
    readOnly = false,
    deletable = true,
    statusTextRender,
    children,
    onUpload,
    onDelete,
    onClickPreview,
    onClosePreview,
    onClickUpload,
    style,
    ...rest
  } = props

  const tokens = useUploaderTokens()
  const [items, setItems] = useControllableValue<UploaderValueItem[]>(props, {
    defaultValue: [],
  })

  const sizeValue = React.useMemo(() => normalizeSize(previewSize, tokens.size), [previewSize, tokens.size])
  const canUpload = showUpload && !readOnly && !disabled && items.length < maxCount

  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [previewIndex, setPreviewIndex] = React.useState(0)

  const previewImages = React.useMemo(() => {
    return items.map(item => item.source ?? item.url ?? item.thumbnail ?? '')
  }, [items])

  const appendItems = React.useCallback(
    (nextItems: UploaderValueItem[]) => {
      if (!nextItems.length) return
      const normalized = nextItems.map((item, idx) => ({
        ...item,
        key: item.key ?? `${Date.now()}-${idx}`,
      }))
      const merged = [...items, ...normalized].slice(0, maxCount)
      setItems(merged)
    },
    [items, maxCount, setItems],
  )

  const handleUploadPress = React.useCallback(async () => {
    if (!canUpload) {
      return
    }
    onClickUpload?.()
    if (!onUpload) {
      return
    }
    const result = await onUpload()
    const next = ensureArray(result)
    if (next.length) {
      appendItems(next)
    }
  }, [appendItems, canUpload, onClickUpload, onUpload])

  const handleDelete = React.useCallback(
    async (item: UploaderValueItem, index: number) => {
      if (readOnly || disabled) {
        return
      }
      if (onDelete) {
        const result = await onDelete(item, index)
        if (result === false) {
          return
        }
      }
      const next = items.filter((_, idx) => idx !== index)
      setItems(next)
    },
    [disabled, items, onDelete, readOnly, setItems],
  )

  const handlePreview = React.useCallback(
    (item: UploaderValueItem, index: number) => {
      onClickPreview?.(item, index)
      if (!previewFullImage) return
      setPreviewIndex(index)
      setPreviewVisible(true)
    },
    [onClickPreview, previewFullImage],
  )

  const closePreview = React.useCallback(() => {
    setPreviewVisible(false)
    onClosePreview?.()
  }, [onClosePreview])

  const renderStatus = (status: UploaderItemStatus | undefined, item: UploaderValueItem) => {
    if (!status) return null
    const baseStyle = [styles.status, { backgroundColor: tokens.colors.maskBackground }]
    if (status === 'pending') {
      return (
        <View style={baseStyle} testID="rv-uploader-status-pending">
          <ActivityIndicator color={tokens.colors.maskText} />
          <Text style={[styles.statusText, { color: tokens.colors.maskText }]}>
            {statusTextRender?.(status, item) ?? statusDefaults.pending}
          </Text>
        </View>
      )
    }
    if (status === 'failed') {
      return (
        <View style={baseStyle} testID="rv-uploader-status-failed">
          <Text style={[styles.statusText, { color: tokens.colors.failed }]}>
            {statusTextRender?.(status, item) ?? statusDefaults.failed}
          </Text>
        </View>
      )
    }
    return null
  }

  return (
    <View ref={ref} style={[styles.container, style]} {...rest} testID="rv-uploader">
      <View style={styles.items}>
        {items.map((item, index) => {
          const source = resolveSource(item)
          return (
            <View
              key={item.key ?? index}
              style={{ width: sizeValue, height: sizeValue, marginRight: tokens.gap, marginBottom: tokens.gap }}
              testID={`rv-uploader-item-${index}`}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.preview,
                  {
                    borderRadius: tokens.radius,
                    backgroundColor: tokens.colors.background,
                    borderColor: tokens.colors.border,
                  },
                  pressed ? { opacity: 0.85 } : null,
                ]}
                onPress={() => handlePreview(item, index)}
                disabled={disabled}
                testID={`rv-uploader-preview-${index}`}
              >
                {previewImage && source ? (
                  <Image
                    source={source}
                    style={styles.image}
                    fit={imageFit}
                  />
                ) : (
                  <View style={styles.placeholder}>
                    <Text style={styles.placeholderIcon}>IMG</Text>
                  </View>
                )}
                {previewCoverRender ? (
                  <View style={styles.cover} pointerEvents="none">
                    {previewCoverRender(item)}
                  </View>
                ) : null}
                {renderStatus(item.status, item)}
                {deletable && !readOnly && !disabled ? (
                  <Pressable
                    style={[styles.delete, { backgroundColor: tokens.colors.deleteBackground }]}
                    hitSlop={8}
                    onPress={() => handleDelete(item, index)}
                    testID={`rv-uploader-delete-${index}`}
                  >
                    <Text style={{ color: tokens.colors.deleteIcon }}>×</Text>
                  </Pressable>
                ) : null}
              </Pressable>
            </View>
          )
        })}
        {canUpload ? (
          <Pressable
            style={({ pressed }) => [
              styles.upload,
              {
                width: sizeValue,
                height: sizeValue,
                marginRight: tokens.gap,
                marginBottom: tokens.gap,
                borderRadius: tokens.radius,
                backgroundColor: tokens.colors.background,
                borderColor: tokens.colors.border,
              },
              (pressed || disabled) ? { opacity: 0.85 } : null,
            ]}
            onPress={handleUploadPress}
            disabled={disabled}
            testID="rv-uploader-upload"
          >
            {children ?? (
              <View style={styles.uploadContent}>
                {uploadIcon ?? <Text style={[styles.uploadIcon, { color: tokens.colors.icon }]}>+</Text>}
                {uploadText ? (
                  <Text style={[styles.uploadText, { color: tokens.colors.text }]}>{uploadText}</Text>
                ) : null}
              </View>
            )}
          </Pressable>
        ) : null}
      </View>
      {previewFullImage ? (
        <ImagePreview
          visible={previewVisible}
          images={previewImages}
          startPosition={previewIndex}
          onClose={closePreview}
          onClosed={() => setPreviewVisible(false)}
          {...previewOptions}
        />
      ) : null}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  preview: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 20,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
  },
  delete: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upload: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  uploadIcon: {
    fontSize: 24,
    fontWeight: '600',
  },
  uploadText: {
    fontSize: 12,
  },
})

Uploader.displayName = 'Uploader'

export default Uploader
