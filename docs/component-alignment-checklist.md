# 组件对齐清单（动画/复杂交互优先）

本清单用于对齐 React Native 习惯与性能体验，优先关注动画、手势、复杂交互、表单联动等高风险组件。

## 高复杂度（动画 + 手势）

- Swiper (`src/components/swiper/`)
- PullRefresh (`src/components/pull-refresh/`)
- Picker / WheelPicker (`src/components/picker/`)
- Tabs (`src/components/tabs/`)
- ImagePreview (`src/components/image-preview/`)

## 中等复杂度（动画为主）

- Popup (`src/components/popup/`)
- Collapse (`src/components/collapse/`)
- DropdownMenu (`src/components/dropdown-menu/`)
- Notify (`src/components/notify/`)
- NumberKeyboard (`src/components/number-keyboard/`)
- NoticeBar (`src/components/notice-bar/`)
- Circle (`src/components/circle/`)
- Skeleton (`src/components/skeleton/`)

## 手势交互为主

- IndexBar (`src/components/index-bar/`)
- Slider (`src/components/slider/`)
- Stepper (`src/components/stepper/`)

## 复杂交互（非动画为主）

- Form (`src/components/form/`)
