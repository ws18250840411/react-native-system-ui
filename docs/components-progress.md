# 组件对齐进度表

> 流程要求（每个组件依次完成并更新状态）：
> 1. 设计思路优先参考 React Native Paper，如无对应场景再回到 React Vant 细节。
> 2. 对照 React Vant 的文档、API、demo，缺失项补齐；若受限于 `@react-native-aria` 等因素无法实现，在备注说明。
> 3. 检查代码实现是否可精简/优化到生产级别，并按需补充测试。
> 4. 调整示例视觉使其与 React Vant 相似，必要时抽离样式；若 React Vant demo 包含弹层入口、Cell 触发等组合交互，需同步实现并在文档展示。
> 5. 核查完毕后在下列表中将状态改为 ✅，未开始/进行中用 ⏳ 并备注当前结论或阻塞。

## 布局组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Flex 布局 | ✅ | 默认 `gutter` 改为 0、示例样式抽离 CSS，`Flex.Item` 支持数字与字符串 flex |
| Space 间距 | ✅ | 修复 Web 端 `fill/vertical` 间距失效、文档补充 stretch/默认 block；示例同步 |

## 基础组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Button 按钮 | ✅ | 对齐成功类型/事件说明，demo 使用统一样式并覆盖渐变、自定义色等场景 |
| Cell 单元格 | ✅ | 支持自定义 `value` 节点与卡片阴影，补充 onPress/children 文档并同步 demo 讲解 |
| ConfigProvider 全局配置 | ✅ | 语言/主题 demo 对齐 React Vant，补布局样式与交互切换 |
| Typography 文本 | ✅ | Demo 覆盖类型/尺寸/省略/链接场景并同步文案风格 |
| Image 图片 | ✅ | Demo 补充填充模式/圆角/状态提示，文档同步 API 描述 |
| Popup 弹出层 | ✅ | 与 react-vant 对齐 + 参考 React Native Paper Modal：统一动画状态、补 BackHandler/无障碍提示、overlay/safe-area 示例同步 |
| Portal 传送门 | ✅ | 改为 Paper 风格 PortalHost/PortalManager 队列 + 自动 Host，保留 `Portal.clear()` 与文档/demo/测试同步 |
| Toast 轻提示 | ✅ | 对齐 React Vant：demo 改用 Cell 入口并补“多条提示”场景，静态 API 增加 allowMultiple 实例测试，文档写明全局配置/静态调用细节 |

## 表单组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Calendar 日历 | ✅ | 单选/多选/范围支持 `allowSameDay`、`maxRange`、自定义周标题与月份文案；新增 `poppable` 弹层/Cell 入口 demo 与 Popup API 说明，修复跨区间禁选与确认按钮主题色 |
| Cascader 级联选择 | ✅ | 参考 React Vant：新增 `poppable` + render props Cell 触发、Popup/受控显隐与 `actions`；示例、文档、数据源与 React Vant demo 完全对齐（基础/Form/异步/字段名/受控），默认开启 Tabs 滑动动画，可关闭 `swipeable`；最终值只在叶子/达最大层级时提交，避免重复回调 |
| Checkbox 复选框 | ✅ | 对齐 React Vant：支持 `iconRender`/`bindGroup`、`toggleAll(skipDisabled)`、组向 iconSize/checkedColor 透传与最大可选数；标签点击禁用/左右布局已覆盖；单节点 Pressable + a11y 状态统一，context value memo 化，横向换行间距补齐 |
| DatetimePicker 时间选择 | ✅ | 对齐 React Vant：补全 date/time/datetime/datehour/year-month/month-day/columnsOrder/filter/formatter/popup demo；Picker 端新增 columnsTop/columnsBottom、swipeDuration、visibleItemCount=6，值在 min/max 边界自动 clamp |
| Form 表单 | ✅ | 校验/依赖更新去重，setFieldsValue 只处理实际变更，API memo 化 |
| Input 输入框 | ✅ | 基础/清除/插入内容/多行/字数统计/对齐/状态示例对齐官方 |
| NumberKeyboard 数字键盘 | ⏳ |  |
| Picker 选择器 | ✅ | 级联判定/受控同步/首帧副作用处理完成，Web 滚轮体验优化并补 utils 单测；demo 对齐 React Vant |
| Radio 单选框 | ⏳ |  |
| Rate 评分 | ⏳ |  |
| Search 搜索 | ⏳ |  |
| Selector 多选器 | ⏳ |  |
| Slider 滑块 | ⏳ |  |
| Stepper 步进器 | ⏳ |  |
| Switch 开关 | ⏳ |  |
| Uploader 上传 | ⏳ |  |

## 反馈组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| ActionSheet 动作面板 | ⏳ |  |
| Dialog 弹窗 | ⏳ |  |
| DropdownMenu 下拉菜单 | ⏳ |  |
| Loading 加载 | ⏳ |  |
| PullRefresh 下拉刷新 | ⏳ |  |
| ShareSheet 分享面板 | ⏳ |  |

## 展示组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Avatar 头像 | ✅ | 新增头像组件（图片/文本/徽标/尺寸），示例与 Ant Design Mobile 对齐 |
| Badge 徽标 | ⏳ |  |
| Collapse 折叠面板 | ⏳ |  |
| CountDown 倒计时 | ⏳ |  |
| Divider 分割线 | ⏳ |  |
| Empty 空状态 | ⏳ |  |
| Field 输入项 | ✅ | onBlur 格式化、可达性 aria-describedby/invalid、样式 useMemo，清除/对齐逻辑已对齐官方 |
| FloatingBall 浮动球 | ⏳ |  |
| ImagePreview 图片预览 | ⏳ |  |
| List 列表 | ⏳ |  |
| NoticeBar 通知栏 | ⏳ |  |
| Popover 气泡卡片 | ⏳ |  |
| Progress 进度条 | ✅ | 渐变兼容（Web 背景图/原生回退纯色）、动画容错&去抖、a11y progressbar、百分比/行高解析完善并补单测 |
| Skeleton 骨架屏 | ⏳ |  |
| Tag 标签 | ⏳ |  |
| WaterMark 水印 | ⏳ |  |

## 导航组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Grid 宫格 | ⏳ |  |
| IndexBar 索引栏 | ⏳ |  |
| NavBar 导航栏 | ⏳ |  |
| Pagination 分页 | ⏳ |  |
| Sidebar 侧边栏 | ⏳ |  |
| Tabs 选项卡 | ⏳ | scrollspy + swipeable + lazyRenderPlaceholder 已齐，Sticky 模式因体验问题下线，下一步联动 Portal/Popup |
| Tabbar 标签栏 | ⏳ |  |

## 业务组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Area 省市区 | ⏳ |  |
