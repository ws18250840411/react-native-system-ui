import Swiper from './Swiper'
import SwiperItem from './SwiperItem'
import SwiperPagIndicator from './SwiperPagIndicator'
import type { SwiperProps, SwiperInstance, SwiperItemProps } from './types'

// 将 SwiperItem 挂载到 Swiper 上，以便使用 Swiper.Item
const SwiperWithItem = Object.assign(Swiper, {
  Item: SwiperItem,
  PagIndicator: SwiperPagIndicator,
}) as typeof Swiper & {
  Item: typeof SwiperItem
  PagIndicator: typeof SwiperPagIndicator
}

export default SwiperWithItem
export { Swiper, SwiperItem, SwiperPagIndicator }
export type { SwiperProps, SwiperInstance, SwiperItemProps }

