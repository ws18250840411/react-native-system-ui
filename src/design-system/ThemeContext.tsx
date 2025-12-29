import React from 'react'

import type { DeepPartial } from '../types'
import type { ActionSheetTokens } from '../components/action-sheet/tokens'
import type { AvatarTokens } from '../components/avatar/Avatar'
import type { BadgeTokens } from '../components/badge/Badge'
import type { ButtonTokens } from '../components/button/tokens'
import type { CalendarTokens } from '../components/calendar/tokens'
import type { CascaderTokens } from '../components/cascader/tokens'
import type { CellTokens } from '../components/cell/tokens'
import type { CheckboxTokens } from '../components/checkbox/tokens'
import type { CircleTokens } from '../components/circle/Circle'
import type { CollapseTokens } from '../components/collapse/Collapse'
import type { CountDownTokens } from '../components/count-down/tokens'
import type { DialogTokens } from '../components/dialog/tokens'
import type { DividerTokens } from '../components/divider/Divider'
import type { DropdownMenuTokens } from '../components/dropdown-menu/tokens'
import type { EmptyTokens } from '../components/empty/Empty'
import type { FieldTokens } from '../components/field/tokens'
import type { FlexTokens } from '../components/flex/tokens'
import type { GridTokens } from '../components/grid/GridContext'
import type { ImageTokens } from '../components/image/tokens'
import type { ImagePreviewTokens } from '../components/image-preview/tokens'
import type { IndexBarTokens } from '../components/index-bar/tokens'
import type { InputTokens } from '../components/input/tokens'
import type { ListTokens } from '../components/list/List'
import type { LoadingTokens } from '../components/loading/Loading'
import type { NavBarTokens } from '../components/nav-bar/tokens'
import type { NoticeBarTokens } from '../components/notice-bar/tokens'
import type { NotifyTokens } from '../components/notify/Notify'
import type { NumberKeyboardTokens } from '../components/number-keyboard/tokens'
import type { OverlayTokens } from '../components/overlay/tokens'
import type { PaginationTokens } from '../components/pagination/tokens'
import type { PasswordInputTokens } from '../components/password-input/PasswordInput'
import type { PickerTokens } from '../components/picker/tokens'
import type { PopoverTokens } from '../components/popover/tokens'
import type { PopupTokens } from '../components/popup/tokens'
import type { ProgressTokens } from '../components/progress/tokens'
import type { PullRefreshTokens } from '../components/pull-refresh/tokens'
import type { RadioTokens } from '../components/radio/tokens'
import type { RateTokens } from '../components/rate/tokens'
import type { SearchTokens } from '../components/search/tokens'
import type { SelectorTokens } from '../components/selector/tokens'
import type { ShareSheetTokens } from '../components/share-sheet/tokens'
import type { SidebarTokens } from '../components/sidebar/tokens'
import type { SkeletonTokens } from '../components/skeleton/tokens'
import type { SliderTokens } from '../components/slider/tokens'
import type { SpaceTokens } from '../components/space/tokens'
import type { StepperTokens } from '../components/stepper/tokens'
import type { SwitchTokens } from '../components/switch/tokens'
import type { SwiperPagIndicatorTokens } from '../components/swiper/SwiperPagIndicator'
import type { TabsTokens } from '../components/tabs/tokens'
import type { TabbarTokens } from '../components/tabbar/tokens'
import type { TagTokens } from '../components/tag/Tag'
import type { ToastTokens } from '../components/toast/tokens'
import type { TypographyTokens } from '../components/typography/Typography'
import type { UploaderTokens } from '../components/uploader/tokens'
import type { WaterMarkTokens } from '../components/water-mark/tokens'
import { createTokens, defaultTokens, type ThemeTokens } from './tokens'

export interface ThemeComponentTokensMap {
  actionSheet: ActionSheetTokens
  avatar: AvatarTokens
  badge: BadgeTokens
  button: ButtonTokens
  calendar: CalendarTokens
  cascader: CascaderTokens
  cell: CellTokens
  checkbox: CheckboxTokens
  circle: CircleTokens
  collapse: CollapseTokens
  countDown: CountDownTokens
  dialog: DialogTokens
  divider: DividerTokens
  dropdownMenu: DropdownMenuTokens
  empty: EmptyTokens
  field: FieldTokens
  flex: FlexTokens
  grid: GridTokens
  image: ImageTokens
  imagePreview: ImagePreviewTokens
  indexBar: IndexBarTokens
  input: InputTokens
  list: ListTokens
  loading: LoadingTokens
  navBar: NavBarTokens
  noticeBar: NoticeBarTokens
  notify: NotifyTokens
  numberKeyboard: NumberKeyboardTokens
  overlay: OverlayTokens
  pagination: PaginationTokens
  passwordInput: PasswordInputTokens
  picker: PickerTokens
  popover: PopoverTokens
  popup: PopupTokens
  progress: ProgressTokens
  pullRefresh: PullRefreshTokens
  radio: RadioTokens
  rate: RateTokens
  search: SearchTokens
  selector: SelectorTokens
  shareSheet: ShareSheetTokens
  sidebar: SidebarTokens
  skeleton: SkeletonTokens
  slider: SliderTokens
  space: SpaceTokens
  stepper: StepperTokens
  switch: SwitchTokens
  swiperPagIndicator: SwiperPagIndicatorTokens
  tabs: TabsTokens
  tabbar: TabbarTokens
  tag: TagTokens
  toast: ToastTokens
  typography: TypographyTokens
  uploader: UploaderTokens
  waterMark: WaterMarkTokens
}

export type ThemeComponentKey = keyof ThemeComponentTokensMap

export type ThemeComponents = Partial<{
  [K in ThemeComponentKey]: DeepPartial<ThemeComponentTokensMap[K]>
}>

export interface ThemeContextValue {
  foundations: ThemeTokens
  components?: ThemeComponents
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  foundations: defaultTokens,
  components: undefined,
})

export const ensureFoundations = (overrides?: DeepPartial<ThemeTokens>) => {
  return overrides ? createTokens(overrides) : defaultTokens
}
