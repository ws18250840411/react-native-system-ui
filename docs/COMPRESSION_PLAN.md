# 组件源码压缩计划

目标：**减小代码体积（bundle size）**，对全库做有利于体积的优化。

## 压缩原则（以体积为准）

- **不做**：单纯「多行合并成一行」—— 不减少产出体积（minifier 会处理空白），且损害可读性，故不做。
- **做**（有利于体积且可做）：
  - 删除未使用的 import、变量、类型。
  - 删除死代码、未使用分支。
  - 重复的字符串/对象用常量或工具函数抽取，便于 minifier 与 tree-shaking。
  - 保留语义化命名与清晰结构，便于维护；不为了省几个字符改用无意义缩写。
- **行数**：不追求行数目标，以可读性优先；仅在做上述体积优化时顺带保持代码紧凑。

## 全库体积优化状态（已完成）

- **src 全目录**已按上述原则完成一遍：未使用 import/变量/参数已清理，死代码已删除，`__tests__` 未使用符号已修复。
- 表中「状态」列：**✅ 已完成** 表示该组件/模块已纳入本次全库扫描并完成体积相关优化（去未使用、去死代码）；无多余可删即视为完成。

## 不压缩范围

- `tokens.ts`、`types.d.ts` 不纳入本计划；`imperative.tsx`、`*Context.tsx` 等体量小可保持现状。

---

## 压缩顺序（按文档菜单，从第一个组件开始）

### 布局组件

| 序号 | 组件 | 主文件 | 状态 |
|-----|------|--------|------|
| 1 | Flex | `src/components/flex/Flex.tsx` | ✅ 已完成 |
| 2 | Space | `src/components/space/Space.tsx` | ✅ 已完成 |
| — | FlexItem | `src/components/flex/FlexItem.tsx` | 可选 |

### 基础组件

| 序号 | 组件 | 主文件 | 状态 |
|-----|------|--------|------|
| 3 | ConfigProvider | `src/components/config-provider/ConfigProvider.tsx` | ✅ 已完成 |
| 4 | Typography | `src/components/typography/Typography.tsx` | ✅ 已完成 |
| 5 | Button | `src/components/button/Button.tsx` | ✅ 已完成 |
| 6 | Cell | `src/components/cell/Cell.tsx` | ✅ 已完成 |
| 7 | Image | `src/components/image/Image.tsx` | ✅ 已完成 |
| 8 | Popup | `src/components/popup/Popup.tsx` | ✅ 已完成 |
| 9 | Portal | `src/components/portal/Portal.tsx` | ✅ 已完成 |
| 10 | Toast | `src/components/toast/Toast.tsx` | ✅ 已完成 |
| — | ButtonGroup | `src/components/button/ButtonGroup.tsx` | 可选 |
| — | CellGroup | `src/components/cell/CellGroup.tsx` | 可选 |

### 表单组件

| 序号 | 组件 | 主文件 | 状态 |
|-----|------|--------|------|
| 11 | Calendar | `src/components/calendar/Calendar.tsx` | ✅ 已完成 |
| 12 | Cascader | `src/components/cascader/Cascader.tsx` | ✅ 已完成 |
| 13 | Checkbox | `src/components/checkbox/Checkbox.tsx` | ✅ 已完成 |
| 14 | DatetimePicker | `src/components/datetime-picker/DatetimePicker.tsx` | ✅ 已完成 |
| 15 | Form | `src/components/form/Form.tsx` | ✅ 已完成 |
| 16 | Input | `src/components/input/Input.tsx` | ✅ 已完成 |
| 17 | NumberKeyboard | `src/components/number-keyboard/NumberKeyboard.tsx` | ✅ 已完成 |
| 18 | PasswordInput | `src/components/password-input/PasswordInput.tsx` | ✅ 已完成 |
| 19 | Picker | `src/components/picker/Picker.tsx` | ✅ 已完成 |
| 20 | Radio | `src/components/radio/Radio.tsx` | ✅ 已完成 |
| 21 | Search | `src/components/search/Search.tsx` | ✅ 已完成 |
| 22 | Selector | `src/components/selector/Selector.tsx` | ✅ 已完成 |
| 23 | Slider | `src/components/slider/Slider.tsx` | ✅ 已完成 |
| 24 | Stepper | `src/components/stepper/Stepper.tsx` | ✅ 已完成 |
| 25 | Switch | `src/components/switch/Switch.tsx` | ✅ 已完成 |
| — | CheckboxGroup | `src/components/checkbox/CheckboxGroup.tsx` | 可选 |
| — | RadioGroup | `src/components/radio/RadioGroup.tsx` | 可选 |
| — | FormItem / FormList | `src/components/form/FormItem.tsx`, `FormList.tsx` | 可选 |

### 反馈组件

| 序号 | 组件 | 主文件 | 状态 |
|-----|------|--------|------|
| 26 | ActionSheet | `src/components/action-sheet/ActionSheet.tsx` | ✅ 已完成 |
| 27 | Dialog | `src/components/dialog/Dialog.tsx` | ✅ 已完成 |
| 28 | ErrorBoundary | `src/components/error-boundary/ErrorBoundary.tsx` | ✅ 已完成 |
| 29 | Loading | `src/components/loading/Loading.tsx` | ✅ 已完成 |
| 30 | Notify | `src/components/notify/Notify.tsx` | ✅ 已完成 |
| 31 | Overlay | `src/components/overlay/Overlay.tsx` | ✅ 已完成 |
| 32 | ShareSheet | `src/components/share-sheet/ShareSheet.tsx` | ✅ 已完成 |

### 展示组件

| 序号 | 组件 | 主文件 | 状态 |
|-----|------|--------|------|
| 33 | Avatar | `src/components/avatar/Avatar.tsx` | ✅ 已完成 |
| 34 | Badge | `src/components/badge/Badge.tsx` | ✅ 已完成 |
| 35 | Circle | `src/components/circle/Circle.tsx` | ✅ 已完成 |
| 36 | Collapse | `src/components/collapse/Collapse.tsx` | ✅ 已完成 |
| 37 | CountDown | `src/components/count-down/CountDown.tsx` | ✅ 已完成 |
| 38 | Divider | `src/components/divider/Divider.tsx` | ✅ 已完成 |
| 39 | Empty | `src/components/empty/Empty.tsx` | ✅ 已完成 |
| 40 | Field | `src/components/field/Field.tsx` | ✅ 已完成 |
| 41 | ImagePreview | `src/components/image-preview/ImagePreview.tsx` | ✅ 已完成 |
| 42 | NoticeBar | `src/components/notice-bar/NoticeBar.tsx` | ✅ 已完成 |
| 43 | Progress | `src/components/progress/Progress.tsx` | ✅ 已完成 |
| 44 | Swiper | `src/components/swiper/Swiper.tsx` | ✅ 已完成 |
| 45 | Skeleton | `src/components/skeleton/Skeleton.tsx` | ✅ 已完成 |
| 46 | Tag | `src/components/tag/Tag.tsx` | ✅ 已完成 |
| 47 | WaterMark | `src/components/water-mark/WaterMark.tsx` | ✅ 已完成 |

### 导航组件

| 序号 | 组件 | 主文件 | 状态 |
|-----|------|--------|------|
| 48 | Grid | `src/components/grid/Grid.tsx` | ✅ 已完成 |
| 49 | GridItem | `src/components/grid/GridItem.tsx` | ✅ 已完成 |
| 50 | NavBar | `src/components/nav-bar/NavBar.tsx` | ✅ 已完成 |
| 51 | Sidebar | `src/components/sidebar/Sidebar.tsx` | ✅ 已完成 |
| 52 | SidebarItem | `src/components/sidebar/SidebarItem.tsx` | ✅ 已完成 |
| 53 | Tabs | `src/components/tabs/Tabs.tsx` | ✅ 已完成 |
| 54 | Tabbar | `src/components/tabbar/Tabbar.tsx` | ✅ 已完成 |
| 55 | TabbarItem | `src/components/tabbar/TabbarItem.tsx` | ✅ 已完成 |

### 业务组件

| 序号 | 组件 | 主文件 | 状态 |
|-----|------|--------|------|
| 56 | Area | `src/components/area/Area.tsx` | ✅ 已完成 |

### 其他（无文档菜单但存在实现）

| 组件 | 主文件 | 状态 |
|------|--------|------|
| SafeAreaView | `src/components/safe-area-view/SafeAreaView.tsx` | ✅ 已完成 |
| PortalHost | `src/components/portal/PortalHost.tsx` | 可选 |
| SwiperItem / SwiperPagIndicator | `src/components/swiper/*.tsx` | 可选 |

---

## 执行说明

- 全库 **src** 已按「体积优化原则」完成一遍：未使用 import/变量/参数已清理，死代码已删除，`__tests__` 已修复未使用符号。
- 优化后 `pnpm run typecheck` 已通过；建议发版前跑一遍单测。
