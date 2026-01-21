import { isImageUrlString, isFunction, isUndefined, parseNumber } from '../../utils'
import type { UploaderBeforeRead, UploaderMaxSize, UploaderResultType, UploaderValueItem } from './types'

export const isImageFile = (item: UploaderValueItem, forced?: boolean) => {
  if (forced !== undefined) return forced
  if (item.file?.type) return item.file.type.indexOf('image') === 0
  return isImageUrlString(item.url ?? item.thumbnail ?? '')
}

export const resolveSource = (item: UploaderValueItem, isImage: boolean) => {
  if (!isImage) return
  if (item.source) return item.source
  const uri = item.thumbnail ?? item.url
  return uri ? { uri } : undefined
}

export type NormalizedMaxSize = Exclude<UploaderMaxSize, string>

export const normalizeMaxSize = (maxSize: UploaderMaxSize | undefined, fallback: number): NormalizedMaxSize => {
  if (isFunction(maxSize)) return maxSize
  return parseNumber(maxSize, fallback)
}

export const filterFiles = (files: File[], maxSize: NormalizedMaxSize) => {
  const valid: File[] = []
  const invalid: File[] = []
  files.forEach(file => {
    ; ((isFunction(maxSize) ? maxSize(file) : file.size > maxSize) ? invalid : valid).push(file)
  })
  return { valid, invalid }
}

export const readFileContent = async (
  file: File,
  resultType: UploaderResultType,
  createObjectUrl: (file: File) => string | undefined,
) => {
  if (file?.type?.indexOf('image') === 0) {
    return createObjectUrl(file)
  }
  if (resultType === 'file') return undefined

  if (isUndefined(FileReader)) {
    return undefined
  }

  return await new Promise<string | undefined>(resolve => {
    const reader = new FileReader()
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result
      resolve(typeof result === 'string' ? result : undefined)
    }
    reader.onerror = () => resolve(undefined)
    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file)
    } else {
      reader.readAsText(file)
    }
  })
}

export const processBeforeRead = async (
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
