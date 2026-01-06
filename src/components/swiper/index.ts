import Swiper from './Swiper'
import SwiperItem from './SwiperItem'
import SwiperPagIndicator from './SwiperPagIndicator'

const SwiperWithItem = Object.assign(Swiper, {
  Item: SwiperItem,
  PagIndicator: SwiperPagIndicator,
})

export default SwiperWithItem
export { Swiper, SwiperItem, SwiperPagIndicator }
export { useSwiperPagIndicatorTokens } from './SwiperPagIndicator'
export type { SwiperPagIndicatorProps, SwiperPagIndicatorTokens } from './SwiperPagIndicator'
export type { SwiperProps, SwiperInstance, SwiperItemProps } from './types'
