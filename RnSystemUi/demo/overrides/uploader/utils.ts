import * as React from 'react'
import { Platform } from 'react-native'

import type { UploaderValueItem } from 'react-native-system-ui'

import * as ImagePicker from 'expo-image-picker'

const DEMO_UPLOAD_API = 'https://nextjs-upload-service.vercel.app/api/upload'

type PickOptions = {
  multiple?: boolean
  maxCount?: number
  maxSize?: number
  onOversize?: () => void
}

const guessMimeType = (uri: string) => {
  const lowered = uri.toLowerCase()
  if (lowered.endsWith('.png')) return 'image/png'
  if (lowered.endsWith('.webp')) return 'image/webp'
  if (lowered.endsWith('.heic')) return 'image/heic'
  if (lowered.endsWith('.gif')) return 'image/gif'
  return 'image/jpeg'
}

const normalizeImagePickerAssets = (assets: ImagePicker.ImagePickerAsset[]) => {
  return assets.map((asset, index) => {
    const uri = asset.uri
    const fileName = (asset as any).fileName as string | undefined
    const mimeType = ((asset as any).mimeType as string | undefined) ?? guessMimeType(uri)
    const fileSize = (asset as any).fileSize as number | undefined
    const file = {
      uri,
      name: fileName ?? `image-${Date.now()}-${index}.jpg`,
      type: mimeType,
      size: fileSize,
    }

    const item: UploaderValueItem = {
      key: `${Date.now()}-${index}`,
      url: uri,
      filename: file.name,
      file,
    }

    return item
  })
}

export const useNativeImagePickerUpload = (options: PickOptions = {}) => {
  const { multiple = false, maxCount, maxSize, onOversize } = options

  return React.useCallback(async () => {
    if (Platform.OS === 'web') {
      return
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      return
    }

    const pickerOptions: any = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: multiple,
      // 部分版本的 expo-image-picker types 可能不包含 selectionLimit，这里用 any 兜底
      selectionLimit: typeof maxCount === 'number' ? maxCount : 0,
      quality: 1,
    }

    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions)

    if (result.canceled) {
      return
    }

    const assets = result.assets ?? []
    let picked = normalizeImagePickerAssets(assets)

    if (typeof maxSize === 'number' && maxSize > 0) {
      const next = picked.filter(item => {
        const size = (item.file as any)?.size as number | undefined
        return typeof size !== 'number' ? true : size <= maxSize
      })
      if (next.length !== picked.length) {
        onOversize?.()
      }
      picked = next
    }

    if (typeof maxCount === 'number' && maxCount >= 0) {
      picked = picked.slice(0, maxCount)
    }

    return picked
  }, [maxCount, maxSize, multiple, onOversize])
}

export const uploadFromUri = async (file: { uri: string; name?: string; type?: string }) => {
  try {
    const body = new FormData()
    body.append('source', {
      uri: file.uri,
      name: file.name ?? 'image.jpg',
      type: file.type ?? guessMimeType(file.uri),
    } as any)

    const resp = await fetch(DEMO_UPLOAD_API, {
      method: 'POST',
      body,
    })
    const json = await resp.json()
    return json.image
  } catch {
    return { url: file.uri }
  }
}
