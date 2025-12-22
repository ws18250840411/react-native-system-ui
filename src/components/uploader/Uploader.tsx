import React from 'react'
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useUploaderTokens } from './tokens'
import type {
  UploaderBeforeRead,
  UploaderInstance,
  UploaderItemStatus,
  UploaderMaxSize,
  UploaderProps,
  UploaderResultType,
  UploaderValueItem,
} from './types'
import { useControllableValue } from '../../hooks'
import Image from '../image'
import ImagePreview from '../image-preview'

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i

const statusDefaults: Record<UploaderItemStatus, string> = {
  pending: '上传中',
  failed: '上传失败',
}

type InternalTask = {
  id: number
  status: UploaderItemStatus
  file: File
  url?: string
}

const parseNumber = (value: number | string | undefined, fallback: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

const normalizeCount = (value: number | string | undefined, fallback: number) => {
  const parsed = parseNumber(value, fallback)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(0, Math.floor(parsed))
}

const toArray = <T,>(value: T | T[] | undefined | null): T[] => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const isImageUrlString = (url: string) => IMAGE_REGEXP.test(url)

const isImageFile = (item: UploaderValueItem, forced?: boolean) => {
  if (forced === true) return true
  if (forced === false) return false
  if (item.file && item.file.type) {
    return item.file.type.indexOf('image') === 0
  }
  if (item.url) return isImageUrlString(item.url)
  if (item.thumbnail) return isImageUrlString(item.thumbnail)
  return false
}

const resolveSource = (item: UploaderValueItem, isImage: boolean) => {
  if (!isImage) return undefined
  if (item.source) return item.source
  if (item.thumbnail) return { uri: item.thumbnail }
  if (item.url) return { uri: item.url }
  return undefined
}

type NormalizedMaxSize = Exclude<UploaderMaxSize, string>

const normalizeMaxSize = (maxSize: UploaderMaxSize | undefined, fallback: number): NormalizedMaxSize => {
  if (typeof maxSize === 'function') return maxSize
  return parseNumber(maxSize, fallback)
}

const isOversize = (files: File[], maxSize: NormalizedMaxSize) => {
  return files.some(file => {
    if (!file) return false
    if (typeof maxSize === 'function') {
      return maxSize(file)
    }
    return file.size > maxSize
  })
}

const filterFiles = (files: File[], maxSize: NormalizedMaxSize) => {
  const valid: File[] = []
  const invalid: File[] = []
  files.forEach(file => {
    if (isOversize([file], maxSize)) {
      invalid.push(file)
    } else {
      valid.push(file)
    }
  })
  return { valid, invalid }
}

const readFileContent = async (
  file: File,
  resultType: UploaderResultType,
  createObjectUrl: (file: File) => string | undefined,
) => {
  if (resultType === 'file') {
    if (file && file.type && file.type.indexOf('image') === 0) {
      return createObjectUrl(file)
    }
    return undefined
  }

  if (file && file.type && file.type.indexOf('image') === 0) {
    return createObjectUrl(file)
  }

  if (typeof FileReader === 'undefined') {
    return undefined
  }

  return await new Promise<string | undefined>(resolve => {
    const reader = new FileReader()
    reader.onload = event => resolve((event.target as any)?.result as string)
    reader.onerror = () => resolve(undefined)
    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file)
    } else {
      reader.readAsText(file)
    }
  })
}

const processBeforeRead = async (
  file: File,
  files: File[],
  beforeRead: UploaderBeforeRead | undefined,
) => {
  if (!beforeRead) return file
  try {
    return await beforeRead(file, files)
  } catch {
    return false
  }
}

const Uploader = React.forwardRef<UploaderInstance, UploaderProps>((props, ref) => {
  const {
    accept = 'image/*',
    multiple = false,
    capture,
    maxSize,
    maxCount = Number.MAX_VALUE,
    resultType = 'dataUrl',
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
    deleteRender,
    statusTextRender,
    children,
    beforeRead,
    onOversize,
    onUpload,
    onDelete,
    onClickPreview,
    onClosePreview,
    onClickUpload,
    isImageUrl,
    upload,
    style,
    ...rest
  } = props

  const uploadDisabled = disabled || readOnly
  const tokens = useUploaderTokens()
  const [rawItems, triggerChange] = useControllableValue<UploaderValueItem[]>(props, {
    defaultValue: [],
  })
  const items = React.useMemo(() => toArray(rawItems ?? []), [rawItems])
  const itemsRef = React.useRef(items)
  React.useEffect(() => {
    itemsRef.current = items
  }, [items])

  const normalizeKeyRef = React.useRef(0)
  const normalizeItem = React.useCallback((item: UploaderValueItem, keyFallback?: string | number) => {
    const key = item.key ?? keyFallback ?? `rv-uploader-${Date.now()}-${normalizeKeyRef.current++}`
    return { ...item, key }
  }, [])

  const objectUrlsRef = React.useRef(new Set<string>())
  const createObjectUrl = React.useCallback((file: File) => {
    if (typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') return undefined
    const url = URL.createObjectURL(file)
    objectUrlsRef.current.add(url)
    return url
  }, [])

  const revokeObjectUrl = React.useCallback((url: string | undefined) => {
    if (!url) return
    if (!objectUrlsRef.current.has(url)) return
    if (typeof URL === 'undefined' || typeof URL.revokeObjectURL !== 'function') return
    URL.revokeObjectURL(url)
    objectUrlsRef.current.delete(url)
  }, [])

  const prevItemUrlsRef = React.useRef<Set<string>>(new Set())
  React.useEffect(() => {
    const current = new Set<string>()
    items.forEach(item => {
      if (typeof item.url === 'string') {
        current.add(item.url)
      }
    })

    prevItemUrlsRef.current.forEach(url => {
      if (!current.has(url)) {
        revokeObjectUrl(url)
      }
    })

    prevItemUrlsRef.current = current
  }, [items, revokeObjectUrl])

  React.useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(url => {
        if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
          URL.revokeObjectURL(url)
        }
      })
      objectUrlsRef.current.clear()
    }
  }, [])

  const setItemsSafe = React.useCallback(
    (next: UploaderValueItem[]) => {
      const normalized = next.map(it => normalizeItem(it))
      itemsRef.current = normalized
      triggerChange(normalized)
    },
    [normalizeItem, triggerChange],
  )

  const updateItems = React.useCallback(
    (updater: (prev: UploaderValueItem[]) => UploaderValueItem[]) => {
      setItemsSafe(updater(itemsRef.current))
    },
    [setItemsSafe],
  )

  const maxCountValue = React.useMemo(() => normalizeCount(maxCount, Number.MAX_VALUE), [maxCount])
  const maxSizeValue = React.useMemo(
    () => normalizeMaxSize(maxSize, Number.MAX_VALUE),
    [maxSize],
  )

  const sizeValue = React.useMemo(() => parseNumber(previewSize, tokens.size), [previewSize, tokens.size])

  const idRef = React.useRef(0)
  const [tasks, setTasks] = React.useState<InternalTask[]>([])
  const tasksRef = React.useRef(tasks)
  React.useEffect(() => {
    tasksRef.current = tasks
  }, [tasks])

  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [previewIndex, setPreviewIndex] = React.useState(0)

  const imageFiles = React.useMemo(() => {
    return items.filter(item => isImageFile(item, isImageUrl?.(item)))
  }, [isImageUrl, items])

  const previewImages = React.useMemo(() => {
    return imageFiles
      .map(item => item.source ?? item.url ?? item.thumbnail)
      .filter((value): value is NonNullable<typeof value> => value !== null && value !== undefined)
  }, [imageFiles])

  const handleWebFiles = React.useCallback(
    async (files: File[]) => {
      if (uploadDisabled) return
      if (!files.length) return

      let nextFiles = files

      if (beforeRead) {
        const processed = await Promise.all(nextFiles.map(file => processBeforeRead(file, nextFiles, beforeRead)))
        nextFiles = processed.filter(Boolean) as File[]
      }

      if (!nextFiles.length) return

      if (maxCountValue > 0) {
        const exceed = itemsRef.current.length + tasksRef.current.length + nextFiles.length - maxCountValue
        if (exceed > 0) {
          nextFiles = nextFiles.slice(0, Math.max(0, nextFiles.length - exceed))
        }
      }

      if (!nextFiles.length) return

      if (isOversize(nextFiles, maxSizeValue)) {
        const { valid, invalid } = filterFiles(nextFiles, maxSizeValue)
        if (invalid.length) {
          onOversize?.(invalid)
        }
        nextFiles = valid
      }

      if (!nextFiles.length) return

      const newTasks: InternalTask[] = nextFiles.map(file => ({
        id: idRef.current++,
        status: 'pending',
        file,
        url: (file?.type?.indexOf('image') === 0 ? createObjectUrl(file) : undefined),
      }))

      setTasks(prev => [...prev, ...newTasks])

      newTasks.forEach(task => {
        ;(async () => {
          try {
            let result: UploaderValueItem = {}
            if (upload) {
              result = await upload(task.file)
            } else {
              const content = await readFileContent(task.file, resultType, createObjectUrl)
              if (content) {
                result.url = content
              }
              result.file = task.file
              result.key = task.id
            }

            const normalized = normalizeItem(
              {
                ...result,
                file: result.file ?? task.file,
              },
              result.key ?? task.id,
            )

            setTasks(prev => {
              const current = prev.find(t => t.id === task.id)
              if (current?.url && current.url !== normalized.url) {
                revokeObjectUrl(current.url)
              }
              return prev.filter(t => t.id !== task.id)
            })

            updateItems(prev => {
              if (maxCountValue > 0 && prev.length >= maxCountValue) {
                return prev
              }
              return [...prev, normalized]
            })
          } catch {
            setTasks(prev =>
              prev.map(t => (t.id === task.id ? { ...t, status: 'failed' } : t)),
            )
          }
        })()
      })
    },
    [
      beforeRead,
      createObjectUrl,
      maxCountValue,
      maxSizeValue,
      normalizeItem,
      onOversize,
      resultType,
      revokeObjectUrl,
      updateItems,
      upload,
      uploadDisabled,
    ],
  )

  const webInputRef = React.useRef<HTMLInputElement | null>(null)
  const webHandlerRef = React.useRef(handleWebFiles)
  React.useEffect(() => {
    webHandlerRef.current = handleWebFiles
  }, [handleWebFiles])

  React.useEffect(() => {
    if (Platform.OS !== 'web') return
    if (typeof document === 'undefined') return

    const input = document.createElement('input')
    input.type = 'file'
    input.style.position = 'fixed'
    input.style.left = '-9999px'
    input.style.width = '1px'
    input.style.height = '1px'
    input.style.opacity = '0'

    const onChange = () => {
      const raw = input.files
      const files = raw ? Array.from(raw) : []
      input.value = ''
      webHandlerRef.current(files)
    }

    input.addEventListener('change', onChange)
    document.body.appendChild(input)
    webInputRef.current = input

    return () => {
      input.removeEventListener('change', onChange)
      if (input.parentNode) {
        input.parentNode.removeChild(input)
      }
      if (webInputRef.current === input) {
        webInputRef.current = null
      }
    }
  }, [])

  React.useEffect(() => {
    const input = webInputRef.current
    if (!input) return
    input.accept = accept
    input.multiple = multiple
    input.disabled = uploadDisabled
    if (capture) {
      input.setAttribute('capture', capture)
    } else {
      input.removeAttribute('capture')
    }
  }, [accept, capture, multiple, uploadDisabled])

  const canShowUpload = React.useMemo(() => {
    return showUpload && (maxCountValue === 0 || items.length + tasks.length < maxCountValue)
  }, [items.length, maxCountValue, showUpload, tasks.length])

  const chooseFile = React.useCallback(() => {
    if (Platform.OS === 'web' && webInputRef.current && !uploadDisabled) {
      webInputRef.current.click()
      return
    }
    if (uploadDisabled) return
    if (onUpload) {
      Promise.resolve(onUpload())
        .then(result => {
          const next = toArray(result as any)
          if (!next.length) return
          updateItems(prev => {
            const available = maxCountValue > 0 ? Math.max(0, maxCountValue - prev.length) : next.length
            if (available <= 0) return prev
            const normalized = next.slice(0, available).map((item, idx) => normalizeItem(item, item.key ?? `${Date.now()}-${idx}`))
            return [...prev, ...normalized]
          })
        })
        .catch(() => {})
    }
  }, [maxCountValue, normalizeItem, onUpload, updateItems, uploadDisabled])

  const closeImagePreview = React.useCallback(() => {
    setPreviewVisible(false)
  }, [])

  React.useImperativeHandle(ref, () => ({
    chooseFile,
    closeImagePreview,
  }), [chooseFile, closeImagePreview])

  const handleUploadPress = React.useCallback(
    async (event: Parameters<NonNullable<React.ComponentProps<typeof Pressable>['onPress']>>[0]) => {
      if (uploadDisabled) return
      onClickUpload?.(event)
      chooseFile()
    },
    [chooseFile, onClickUpload, uploadDisabled],
  )

  const handleDelete = React.useCallback(
    async (item: UploaderValueItem, index: number) => {
      if (onDelete) {
        let result: boolean | void
        try {
          result = await onDelete(item)
        } catch {
          return
        }
        if (result === false) {
          return
        }
      }
      updateItems(prev => {
        const removed = prev[index]
        if (removed?.url) {
          revokeObjectUrl(removed.url)
        }
        return prev.filter((_, idx) => idx !== index)
      })
    },
    [onDelete, revokeObjectUrl, updateItems],
  )

  const handlePreview = React.useCallback(
    (item: UploaderValueItem, index: number) => {
      onClickPreview?.(item, index)
      if (!previewFullImage) return

      const imageIndex = imageFiles.indexOf(item)
      if (imageIndex < 0) return
      setPreviewIndex(imageIndex)
      setPreviewVisible(true)
    },
    [imageFiles, onClickPreview, previewFullImage],
  )

  const closePreview = React.useCallback(() => {
    setPreviewVisible(false)
    onClosePreview?.()
  }, [onClosePreview])

  const renderStatus = (status: UploaderItemStatus | undefined) => {
    if (!status) return null
    const baseStyle = [styles.status, { backgroundColor: tokens.colors.maskBackground }]
    if (status === 'pending') {
      return (
        <View style={baseStyle} testID="rv-uploader-status-pending">
          <ActivityIndicator color={tokens.colors.maskText} />
          <Text style={[styles.statusText, { color: tokens.colors.maskText }]}>
            {statusTextRender?.(status) ?? statusDefaults.pending}
          </Text>
        </View>
      )
    }
    if (status === 'failed') {
      return (
        <View style={baseStyle} testID="rv-uploader-status-failed">
          <Text style={[styles.statusText, { color: tokens.colors.failed }]}>
            {statusTextRender?.(status) ?? statusDefaults.failed}
          </Text>
        </View>
      )
    }
    return null
  }

  return (
    <View style={[styles.container, style]} {...rest} testID="rv-uploader">
      <View style={styles.items}>
        {previewImage ? (
          <>
            {items.map((item, index) => {
              const isImage = isImageFile(item, isImageUrl?.(item))
              const source = resolveSource(item, isImage)
              const fileName = item.file?.name ?? item.filename ?? item.url ?? ''

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
                    testID={`rv-uploader-preview-${index}`}
                  >
                    {source ? (
                      <Image source={source} style={styles.image} fit={imageFit} />
                    ) : (
                      <View style={styles.placeholder}>
                        <Text style={styles.placeholderIcon}>FILE</Text>
                        {!!fileName ? (
                          <Text style={[styles.placeholderName, { color: tokens.colors.text }]} numberOfLines={1}>
                            {fileName}
                          </Text>
                        ) : null}
                      </View>
                    )}
                    {previewCoverRender ? (
                      <View style={styles.cover} pointerEvents="none">
                        {previewCoverRender(item)}
                      </View>
                    ) : null}
                    {renderStatus(item.status)}
                    {deletable ? (
                      <View style={[styles.delete, { backgroundColor: tokens.colors.deleteBackground }]}>
                        {deleteRender ? (
                          deleteRender(() => handleDelete(item, index))
                        ) : (
                          <Pressable
                            hitSlop={8}
                            onPress={() => handleDelete(item, index)}
                            testID={`rv-uploader-delete-${index}`}
                          >
                            <Text style={{ color: tokens.colors.deleteIcon }}>×</Text>
                          </Pressable>
                        )}
                      </View>
                    ) : null}
                  </Pressable>
                </View>
              )
            })}
            {tasks.map(task => (
              <View
                key={`task-${task.id}`}
                style={{ width: sizeValue, height: sizeValue, marginRight: tokens.gap, marginBottom: tokens.gap }}
                testID={`rv-uploader-task-${task.id}`}
              >
                <View
                  style={[
                    styles.preview,
                    {
                      borderRadius: tokens.radius,
                      backgroundColor: tokens.colors.background,
                      borderColor: tokens.colors.border,
                    },
                  ]}
                >
                  {task.url ? (
                    <Image source={{ uri: task.url }} style={styles.image} fit={imageFit} />
                  ) : (
                    <View style={styles.placeholder}>
                      <Text style={styles.placeholderIcon}>FILE</Text>
                      {task.file?.name ? (
                        <Text style={[styles.placeholderName, { color: tokens.colors.text }]} numberOfLines={1}>
                          {task.file.name}
                        </Text>
                      ) : null}
                    </View>
                  )}
                  {renderStatus(task.status)}
                  {task.status !== 'pending' ? (
                    <View style={[styles.delete, { backgroundColor: tokens.colors.deleteBackground }]}>
                      {deleteRender ? (
                        deleteRender(() => {
                          setTasks(prev => {
                            const current = prev.find(t => t.id === task.id)
                            if (current?.url) {
                              revokeObjectUrl(current.url)
                            }
                            return prev.filter(t => t.id !== task.id)
                          })
                        })
                      ) : (
                        <Pressable
                          hitSlop={8}
                          onPress={() => {
                            setTasks(prev => {
                              const current = prev.find(t => t.id === task.id)
                              if (current?.url) {
                                revokeObjectUrl(current.url)
                              }
                              return prev.filter(t => t.id !== task.id)
                            })
                          }}
                          testID={`rv-uploader-task-delete-${task.id}`}
                        >
                          <Text style={{ color: tokens.colors.deleteIcon }}>×</Text>
                        </Pressable>
                      )}
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
          </>
        ) : null}

        {canShowUpload ? (
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
              pressed ? { opacity: 0.85 } : null,
              uploadDisabled ? { opacity: 0.65 } : null,
            ]}
            onPress={handleUploadPress}
            disabled={uploadDisabled}
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
          {...previewOptions}
          visible={previewVisible}
          images={previewImages}
          startPosition={previewIndex}
          onClose={params => {
            previewOptions?.onClose?.(params)
            closePreview()
          }}
          onClosed={() => {
            previewOptions?.onClosed?.()
            setPreviewVisible(false)
          }}
        />
      ) : null}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {},
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
    paddingHorizontal: 6,
  },
  placeholderIcon: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholderName: {
    marginTop: 6,
    fontSize: 11,
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
    minWidth: 20,
    minHeight: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
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
