import type { ActionSheetTokens } from './action-sheet/types'
import type { AreaTokens } from './area/tokens'
import type { AvatarTokens } from './avatar/types'
import type { BadgeTokens } from './badge/types'
import type { ButtonTokens } from './button/types'
import type { CalendarTokens } from './calendar/types'
import type { CascaderTokens } from './cascader/types'
import type { CellTokens } from './cell/types'
import type { CheckboxTokens } from './checkbox/types'
import type { CircleTokens } from './circle/types'
import type { CollapseTokens } from './collapse/types'
import type { ConfigProviderTokens } from './config-provider/tokens'
import type { CountDownTokens } from './count-down/types'
import type { DatetimePickerTokens } from './datetime-picker/tokens'
import type { DialogTokens } from './dialog/tokens'
import type { DividerTokens } from './divider/types'
import type { DropdownMenuTokens } from './dropdown-menu/tokens'
import type { EmptyTokens } from './empty/types'
import type { FieldTokens } from './field/tokens'
import type { FlexTokens } from './flex/types'
import type { FormTokens } from './form/tokens'
import type { GridTokens } from './grid/types'
import type { ImageTokens } from './image/types'
import type { ImagePreviewTokens } from './image-preview/tokens'
import type { IndexBarTokens } from './index-bar/tokens'
import type { InputTokens } from './input/types'
import type { ListTokens } from './list/types'
import type { LoadingTokens } from './loading/types'
import type { NavBarTokens } from './nav-bar/types'
import type { NoticeBarTokens } from './notice-bar/tokens'
import type { NotifyTokens } from './notify/types'
import type { NumberKeyboardTokens } from './number-keyboard/tokens'
import type { OverlayTokens } from './overlay/tokens'
import type { PaginationTokens } from './pagination/types'
import type { PasswordInputTokens } from './password-input/tokens'
import type { PickerTokens } from './picker/tokens'
import type { PopupTokens } from './popup/tokens'
import type { ProgressTokens } from './progress/types'
import type { PortalTokens } from './portal/tokens'
import type { PullRefreshTokens } from './pull-refresh/tokens'
import type { RadioTokens } from './radio/types'
import type { RateTokens } from './rate/types'
import type { SearchTokens } from './search/tokens'
import type { SelectorTokens } from './selector/types'
import type { ShareSheetTokens } from './share-sheet/tokens'
import type { SidebarTokens } from './sidebar/types'
import type { SkeletonTokens } from './skeleton/types'
import type { SliderTokens } from './slider/tokens'
import type { SpaceTokens } from './space/types'
import type { StepperTokens } from './stepper/tokens'
import type { SwiperTokens } from './swiper/tokens'
import type { SwiperPagIndicatorTokens } from './swiper/SwiperPagIndicator'
import type { SwitchTokens } from './switch/types'
import type { TabbarTokens } from './tabbar/tokens'
import type { TabsTokens } from './tabs/tokens'
import type { TagTokens } from './tag/types'
import type { ToastTokens } from './toast/tokens'
import type { TypographyTokens } from './typography/types'
import type { UploaderTokens } from './uploader/tokens'
import type { SafeAreaViewTokens } from './safe-area-view/tokens'
import type { WaterMarkTokens } from './water-mark/types'

declare module '../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    actionSheet: ActionSheetTokens
    area: AreaTokens
    avatar: AvatarTokens
    badge: BadgeTokens
    button: ButtonTokens
    calendar: CalendarTokens
    cascader: CascaderTokens
    cell: CellTokens
    checkbox: CheckboxTokens
    circle: CircleTokens
    collapse: CollapseTokens
    configProvider: ConfigProviderTokens
    countDown: CountDownTokens
    datetimePicker: DatetimePickerTokens
    dialog: DialogTokens
    divider: DividerTokens
    dropdownMenu: DropdownMenuTokens
    empty: EmptyTokens
    field: FieldTokens
    flex: FlexTokens
    form: FormTokens
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
    popup: PopupTokens
    progress: ProgressTokens
    portal: PortalTokens
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
    swiper: SwiperTokens
    swiperPagIndicator: SwiperPagIndicatorTokens
    switch: SwitchTokens
    safeAreaView: SafeAreaViewTokens
    tabbar: TabbarTokens
    tabs: TabsTokens
    tag: TagTokens
    toast: ToastTokens
    typography: TypographyTokens
    uploader: UploaderTokens
    waterMark: WaterMarkTokens
  }
}
