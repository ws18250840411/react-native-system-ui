# 组件对齐进度表

> 流程要求（每个组件依次完成并更新状态）：
> 1. 对照 React Vant 的文档、API、demo，缺失项补齐；若受限于 `@react-native-aria` 等因素无法实现，在备注说明。
> 2. 检查实现是否可精简/优化到生产级别，并按需补充测试。
> 3. 调整示例视觉使其与 React Vant 相似，必要时抽离样式。
> 4. 核查完毕后在下列表中将状态改为 ✅，未开始/进行中用 ⏳ 并备注当前结论或阻塞。

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
| Icon 图标 | ⏳ |  |
| Image 图片 | ⏳ |  |
| Popup 弹出层 | ⏳ |  |
| Portal 传送门 | ⏳ |  |
| Toast 轻提示 | ⏳ |  |

## 表单组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Calendar 日历 | ⏳ |  |
| Cascader 级联选择 | ⏳ |  |
| Checkbox 复选框 | ⏳ |  |
| DatetimePicker 时间选择 | ⏳ |  |
| Form 表单 | ⏳ |  |
| Input 输入框 | ⏳ |  |
| NumberKeyboard 数字键盘 | ⏳ |  |
| Picker 选择器 | ⏳ |  |
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
| Field 输入项 | ⏳ |  |
| FloatingBall 浮动球 | ⏳ |  |
| ImagePreview 图片预览 | ⏳ |  |
| List 列表 | ⏳ |  |
| NoticeBar 通知栏 | ⏳ |  |
| Popover 气泡卡片 | ⏳ |  |
| Progress 进度条 | ⏳ |  |
| Skeleton 骨架屏 | ⏳ |  |
| Sticky 粘性布局 | ⏳ |  |
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
| Tabs 选项卡 | ⏳ |  |
| Tabbar 标签栏 | ⏳ |  |

## 业务组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Area 省市区 | ⏳ |  |
