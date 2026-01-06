import type { PickerOption } from './types'

import { clamp } from '../../utils/number'
import { findEnabledIndex } from './utils'

const MOMENTUM_LIMIT_TIME = 500
const MOMENTUM_LIMIT_DISTANCE = 8

const adjustIndex = (index: number, options: PickerOption[]) => {
  const total = options.length
  if (!total) return 0
  const i = clamp(index, 0, total - 1)
  const next = findEnabledIndex(options, i)
  return next >= 0 ? next : i
}

export const indexToOffset = (index: number, itemHeight: number) => -index * itemHeight

export const offsetToIndex = (offset: number, itemHeight: number, total: number, options: PickerOption[]) => {
  const minOffset = -Math.max(0, total - 1) * itemHeight
  const off = clamp(offset, minOffset, 0)
  let index = Math.round(-off / itemHeight)
  index = adjustIndex(index, options)
  const snapOffset = indexToOffset(index, itemHeight)
  return { index, snapOffset }
}

export const shouldMomentum = (distance: number, duration: number) =>
  duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE

export const momentumTarget = (
  distance: number,
  duration: number,
  currentOffset: number,
  itemHeight: number,
  minOffset: number,
) => {
  const speed = Math.abs(distance / duration)
  const extra = (speed / 0.0025) * (distance < 0 ? -1 : 1)
  const target = clamp(currentOffset + extra, minOffset, 0)
  const snapIndex = Math.round(-target / itemHeight)
  return indexToOffset(snapIndex, itemHeight)
}
