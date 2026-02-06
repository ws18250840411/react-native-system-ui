import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default function SkeletonCustomDemo() {
  return (
  <Skeleton
    title
    row={4}
    rowWidth={['100%', '80%', '60%', '40%']}
    rowHeight={[18, 18, 12, 12]}
    round
  />
  )
}
