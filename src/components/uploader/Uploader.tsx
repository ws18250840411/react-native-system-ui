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
import { parseNumber, toArray, isFunction, isString } from '../../utils'
import {
  isImageFile,
  resolveSource,
  normalizeMaxSize,
  filterFiles,
  readFileContent,
  processBeforeRead,
  type NormalizedMaxSize,
} from './utils'

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

const Uploader = React.forwardRef<UploaderInstance, UploaderProps>((props, ref) => {
  const {
    tokensOverride,
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
  const tokens = useUploaderTokens(tokensOverride)
  const [rawItems, triggerChange] = useControllableValue<UploaderValueItem[]>(props, {
    defaultValue: [],
  })
  const items = toArray(rawItems ?? [])
  const itemsRef = React.useRef(items)
  React.useEffect(() => {
    itemsRef.current = items
  }, [items])

  const normalizeKeyRef = React.useRef(0)
  const normalizeItem = (item: UploaderValueItem, keyFallback?: string | number) => {
    const key = item.key ?? keyFallback ?? `rv-uploader-${normalizeKeyRef.current++}`
    return item.key === key ? item : { ...item, key }
  }

  const objectUrlsRef = React.useRef(new Set<string>())
  const createObjectUrl = (file: File) => {
    if (typeof URL === 'undefined' || !isFunction(URL.createObjectURL)) return undefined
    const url = URL.createObjectURL(file)
    objectUrlsRef.current.add(url)
    return url
  }

  const revokeObjectUrl = (url: string | undefined) => {
    if (!url) return
    if (!objectUrlsRef.current.has(url)) return
    if (typeof URL === 'undefined' || !isFunction(URL.revokeObjectURL)) return
    URL.revokeObjectURL(url)
    objectUrlsRef.current.delete(url)
  }

  const prevItemUrlsRef = React.useRef<Set<string>>(new Set())
  React.useEffect(() => {
    const current = new Set<string>()
    items.forEach(item => {
      if (isString(item.url)) {
        current.add(item.url)
      }
    })

    prevItemUrlsRef.current.forEach(url => {
      if (!current.has(url)) {
        revokeObjectUrl(url)
      }
    })

    prevItemUrlsRef.current = current
  }, [items])

  React.useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(url => {
        if (typeof URL !== 'undefined' && isFunction(URL.revokeObjectURL)) {
          URL.revokeObjectURL(url)
        }
      })
      objectUrlsRef.current.clear()
    }
  }, [])

  const setItemsSafe = (next: UploaderValueItem[]) => {
    const normalized = next.map(it => normalizeItem(it))
    itemsRef.current = normalized
    triggerChange(normalized)
  }

  const updateItems = (updater: (prev: UploaderValueItem[]) => UploaderValueItem[]) => {
    setItemsSafe(updater(itemsRef.current))
  }

  const maxCountValue = Math.max(0, Math.floor(parseNumber(maxCount, Number.MAX_VALUE)))
  const maxSizeValue = normalizeMaxSize(maxSize, Number.MAX_VALUE) as NormalizedMaxSize
  const sizeValue = parseNumber(previewSize, tokens.size)

  const idRef = React.useRef(0)
  const [tasks, setTasks] = React.useState<InternalTask[]>([])
  const tasksRef = React.useRef(tasks)
  React.useEffect(() => {
    tasksRef.current = tasks
  }, [tasks])

  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [previewIndex, setPreviewIndex] = React.useState(0)

  const imageFiles = items.filter(item => isImageFile(item, isImageUrl?.(item)))
  const previewImages = imageFiles
    .map(item => item.source ?? item.url ?? item.thumbnail)
    .filter((value): value is NonNullable<typeof value> => value !== null && value !== undefined)

  const handleWebFiles = async (files: File[]) => {
    if (uploadDisabled) return
    if (!files.length) return

    let nextFiles = files

    if (beforeRead) {
      const processed = await Promise.all(
        nextFiles.map(file => processBeforeRead(file, nextFiles, beforeRead))
      )
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

    const { valid, invalid } = filterFiles(nextFiles, maxSizeValue)
    if (invalid.length) onOversize?.(invalid)
    nextFiles = valid

    if (!nextFiles.length) return

    const newTasks: InternalTask[] = nextFiles.map(file => ({
      id: idRef.current++,
      status: 'pending',
      file,
      url: file?.type?.indexOf('image') === 0 ? createObjectUrl(file) : undefined,
    }))

    setTasks(prev => [...prev, ...newTasks])

    newTasks.forEach(task => {
      void (async () => {
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
          setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, status: 'failed' } : t)))
        }
      })()
    })
  }

  const webInputRef = React.useRef<HTMLInputElement | null>(null)
  const webHandlerRef = React.useRef<(files: File[]) => void>(() => { })
  webHandlerRef.current = handleWebFiles

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

  const canShowUpload =
    showUpload && (maxCountValue === 0 || items.length + tasks.length < maxCountValue)

  const chooseFile = () => {
    if (uploadDisabled) return
    if (Platform.OS === 'web' && webInputRef.current) {
      webInputRef.current.click()
      return
    }
    if (!onUpload) return
    Promise.resolve(onUpload())
      .then(result => {
        if (!result) return
        const next = Array.isArray(result) ? result : [result]
        if (!next.length) return
        updateItems(prev => {
          const available = maxCountValue > 0 ? Math.max(0, maxCountValue - prev.length) : next.length
          if (available <= 0) return prev
          return [...prev, ...next.slice(0, available).map(item => normalizeItem(item))]
        })
      })
      .catch(error => {
        if (typeof __DEV__ !== 'undefined' && __DEV__) console.warn('[Uploader] onUpload rejected:', error)
      })
  }

  const closeImagePreview = () => setPreviewVisible(false)

  React.useImperativeHandle(ref, () => ({
    chooseFile,
    closeImagePreview,
  }), [chooseFile])

  const handleUploadPress = async (
    event: Parameters<NonNullable<React.ComponentProps<typeof Pressable>['onPress']>>[0]
  ) => {
    if (uploadDisabled) return
    onClickUpload?.(event)
    chooseFile()
  }

  const handleDelete = async (item: UploaderValueItem, index: number) => {
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
  }

  const handlePreview = (item: UploaderValueItem, index: number) => {
    onClickPreview?.(item, index)
    if (!previewFullImage) return

    const imageIndex = imageFiles.indexOf(item)
    if (imageIndex < 0) return
    setPreviewIndex(imageIndex)
    setPreviewVisible(true)
  }

  const closePreview = () => {
    setPreviewVisible(false)
    onClosePreview?.()
  }

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

  const boxStyle = {
    width: sizeValue,
    height: sizeValue,
    marginRight: tokens.gap,
    marginBottom: tokens.gap,
  }
  const frameStyle = {
    borderRadius: tokens.radius,
    backgroundColor: tokens.colors.background,
    borderColor: tokens.colors.border,
  }
  const placeholderNameStyle = [styles.placeholderName, { color: tokens.colors.text }]
  const deleteStyle = [styles.delete, { backgroundColor: tokens.colors.deleteBackground }]
  const deleteIconStyle = { color: tokens.colors.deleteIcon }

  const renderPlaceholder = (name?: string) => (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderIcon}>FILE</Text>
      {name ? (
        <Text style={placeholderNameStyle} numberOfLines={1}>
          {name}
        </Text>
      ) : null}
    </View>
  )

  const renderDelete = (onPress: () => void, testID: string) =>
    deleteRender ? (
      deleteRender(onPress)
    ) : (
      <Pressable hitSlop={8} onPress={onPress} testID={testID}>
        <Text style={deleteIconStyle}>×</Text>
      </Pressable>
    )

  const removeTask = (id: number) => {
    setTasks(prev => {
      const current = prev.find(t => t.id === id)
      if (current?.url) {
        revokeObjectUrl(current.url)
      }
      return prev.filter(t => t.id !== id)
    })
  }

  return (
    <View style={[styles.container, style]} {...rest} testID="rv-uploader">
      <View style={styles.items}>
        {previewImage ? (
          <>
            {items.map((item, index) => {
              const isImage = isImageFile(item, isImageUrl?.(item))
              const source = resolveSource(item, isImage)
              const fileName =
                typeof item.file?.name === 'string'
                  ? item.file.name
                  : typeof item.url === 'string'
                    ? item.url
                    : typeof item.thumbnail === 'string'
                      ? item.thumbnail
                      : ''

              return (
                <View
                  key={item.key ?? index}
                  style={boxStyle}
                  testID={`rv-uploader-item-${index}`}
                >
                  <Pressable
                    style={({ pressed }) => [
                      styles.preview,
                      frameStyle,
                      pressed && styles.pressed,
                    ]}
                    onPress={() => handlePreview(item, index)}
                    testID={`rv-uploader-preview-${index}`}
                  >
                    {source ? (
                      <Image source={source} style={styles.image} fit={imageFit} />
                    ) : (
                      renderPlaceholder(fileName)
                    )}
                    {previewCoverRender ? (
                      <View style={styles.cover} pointerEvents="none">
                        {previewCoverRender(item)}
                      </View>
                    ) : null}
                    {renderStatus(item.status)}
                    {deletable ? (
                      <View style={deleteStyle}>
                        {renderDelete(() => handleDelete(item, index), `rv-uploader-delete-${index}`)}
                      </View>
                    ) : null}
                  </Pressable>
                </View>
              )
            })}
            {tasks.map(task => (
              <View
                key={`task-${task.id}`}
                style={boxStyle}
                testID={`rv-uploader-task-${task.id}`}
              >
                <View
                  style={[
                    styles.preview,
                    frameStyle,
                  ]}
                >
                  {task.url ? (
                    <Image source={{ uri: task.url }} style={styles.image} fit={imageFit} />
                  ) : (
                    renderPlaceholder(task.file?.name)
                  )}
                  {renderStatus(task.status)}
                  {task.status !== 'pending' ? (
                    <View style={deleteStyle}>
                      {renderDelete(() => removeTask(task.id), `rv-uploader-task-delete-${task.id}`)}
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
              boxStyle,
              frameStyle,
              pressed && styles.pressed,
              uploadDisabled && styles.disabled,
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
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.65,
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
