# 组件对齐进度表

> 流程要求（每个组件依次完成并更新状态）：
> 1. 设计思路优先参考 React Native Paper，如无对应场景再参考成熟的 Web 端实现细节。
> 2. 对照参考实现的文档、API、demo，缺失项补齐；若受限于 `@react-native-aria` 等因素无法实现，在备注说明。
> 3. 检查代码实现是否可精简/优化到生产级别，并按需补充测试。
> 4. 调整示例视觉使其与参考实现相似，必要时抽离样式；若参考实现 demo 包含弹层入口、Cell 触发等组合交互，需同步实现并在文档展示。
> 5. 核查完毕后在下列表中将状态改为 ✅，未开始/进行中用 ⏳ 并备注当前结论或阻塞。

## 布局组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Flex 布局 | ✅ | 二次审计通过：去除无用 context 字段、`columns/gutter` 做健壮兜底并移除多余 `useMemo`（默认 `gutter=0`、示例样式已抽离 CSS，`Flex.Item` 支持数字与字符串 flex） |
| Space 间距 | ✅ | 二次审计通过：修复 `direction="vertical"` 默认 block 判定；原生端间距统一为 padding+负 margin（divider/wrap 无尾部空隙），并补齐单测（Web 端 gap 逻辑保持） |

## 基础组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Button 按钮 | ✅ | 二次审计通过：修复 loading 态误用 disabledOpacity、去除 loading 图标重复间距；`Button.Group` key 更稳定（类型/文档/demo 已对齐） |
| Cell 单元格 | ✅ | 二次审计通过：修复 title/value/children/label/extra 对 `0/''/false` 的渲染判定，label 支持非 Text 节点；移除 View 上无效 `lineHeight` 与 ref 类型修正（文档/demo 已对齐） |
| ConfigProvider 全局配置 | ✅ | 二次审计通过：移除无意义 `useMemo`，Provider 值保持稳定（语言/主题 demo 已对齐） |
| Typography 文本 | ✅ | 二次审计通过：移除死代码、精简结构（非 center/ellipsis 场景不再额外包 View），ellipsis 截断判定改为函数式 setState 降低重渲染 |
| Icon 图标 | ✅ | 使用 `react-native-system-icon` 按需引入（支持 Tree Shaking），文档补齐图标列表（搜索/复制）与基础 demo；Web 端通过 `src/compat/react-native-svg.*` alias 规避 `react-native-svg` 引入问题 |
| Image 图片 | ✅ | 二次审计通过：修复 tokens 访问不存在的 palette 字段；loadingText/errorText 支持非文本节点并移除 `gap`（三端兼容）；同步 `style` 中的布局属性到容器并调整 children 层级（与参考实现一致），ref 类型修正并补齐单测 |
| Popup 弹出层 | ✅ | 二次审计通过：实现复核（动画/栈管理/a11y/安全区）无改动 |
| Portal 传送门 | ✅ | 二次审计通过：实现复核（PortalHost/自动 Host/静态 API）无改动 |
| Toast 轻提示 | ✅ | 二次审计通过：修复关闭后 `onClosed` 不触发导致静态 Toast 不清理；message 支持非文本节点并补齐单测（其余对齐保持） |

## 表单组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Calendar 日历 | ✅ | 二次审计通过：标题/月份/星期/确认文案支持非文本节点（避免嵌套 Text 崩溃），确认禁用逻辑精简；其余能力保持（`allowSameDay`/`maxRange`/自定义文案、`poppable` 弹层 demo 等） |
| Cascader 级联选择 | ✅ | 二次审计通过：默认 option 渲染支持 `text: ReactNode`（避免 View 嵌套 Text 崩溃），header 标题 number 兜底并补齐单测；其余对齐保持（poppable/异步/字段名/受控/Tabs 动画等） |
| Checkbox 复选框 | ✅ | 二次审计通过：label 支持非文本节点、`aria-label` 对数字 children 兜底并补齐单测；其余对齐保持（iconRender/bindGroup/toggleAll/max/间距等） |
| DatetimePicker 时间选择 | ✅ | 二次审计通过：实现复核无改动（功能与 demo/文档保持对齐：多类型/columnsOrder/filter/formatter/popup 等） |
| Form 表单 | ✅ | 二次审计通过：实现复核无改动（校验/依赖更新去重、setFieldsValue 去重、API memo 化保持） |
| Input 输入框 | ✅ | 二次审计通过：实现复核无改动（示例/文档对齐官方，基于 Field 的薄封装保持） |
| NumberKeyboard 数字键盘 | ✅ | 修复按键文字颜色/按压态 tokens 未生效问题，randomKeyOrder 仅在展示时洗牌；简化渲染并补齐 a11y disabled |
| PasswordInput 密码输入框 | ✅ | 新增格子密码输入组件，支持掩码/校验/自动提交，文档同步 |
| Picker 选择器 | ✅ | 级联判定/受控同步/首帧副作用处理完成，Web 滚轮体验优化并补 utils 单测；demo 对齐参考实现 |
| Radio 单选框 | ✅ | 文档与示例完全对齐参考实现（基础/方向/禁用/形状/颜色/尺寸/禁用文本/异步/Cell），补齐 `iconRender`/`onClick`；修复 Radio 条件 hooks、a11y/交互与间距，RadioGroup context memo 化并补横向换行间距 |
| Rate 评分 | ✅ | 对齐参考实现：补齐官方 demo（图标/样式/半星/数量/禁用/只读小数）与文档；实现改为 `useControllableValue`，`touchable` 仅控制滑动手势（点击仍可用），并支持 `count/size/gutter` 传字符串；补齐 Web 端半星点击坐标兼容、非只读半星值展示按 0.5 步进、滑动 10px 横向阈值 + `preventDefault`，`onIconPress` 仅在值变化时触发 |
| Search 搜索 | ✅ | 对齐参考实现：补齐官方 demo（基础/事件/对齐/禁用/背景/自定义按钮）与文档；新增 `align`/`onChange`（兼容 `onChangeText`），`actionText` 为自定义节点时不再触发默认取消逻辑；内部改为 `useControllableValue` 简化受控/非受控并补齐单测 |
| Selector 多选器 | ✅ | 对齐参考实现：补齐类型定义/泛型说明与基础示例；实现改为 `useControllableValue` 统一受控/非受控，`extend.items` 按官方用 getter 计算；columns 兜底为 ≥1，a11y 角色按单选/多选区分并补单测 |
| Slider 滑块 | ✅ | 对齐参考实现：补齐官方 demo（基础/双滑块/范围/禁用/步长/样式/按钮/垂直单双）与文档；支持 `min/max/step/barHeight/buttonSize` 字符串解析与 `button` render props；readOnly 不降级样式仅禁用交互，`onDragStart/End` 触发时机与自定义按钮渲染对齐 |
| Stepper 步进器 | ✅ | 对齐参考实现：补齐 placeholder/onClick/ref 方法与 onChange(detail.name)/onPlus/onMinus(event,value) 等事件签名；重构为 `useControllableValue`，长按加减无“松手多加一步”问题并修复浮点精度；样式补齐 `round` 主题与默认态 pressed/disabled 视觉，默认 `max=Number.MAX_VALUE` 且 `inputWidth/buttonSize/decimalLength` 支持字符串解析 |
| Switch 开关 | ✅ | 对齐参考实现：支持 `activeValue/inactiveValue`、`size number|string`（默认单位 px）；loading 可点击但不切换（仍触发 onClick）、disabled 不触发 onClick；补齐官方 demo（基础/禁用/加载/大小/颜色/异步/Cell）与单测 |
| Uploader 上传 | ✅ | 对齐参考实现：补齐 `accept/multiple/capture/beforeRead/maxSize/onOversize/resultType/upload`（Web 端）与 ref `chooseFile/closeImagePreview`；disabled/readOnly 仅禁用上传区域；新增 `deleteRender/isImageUrl` 与任务态（pending/failed）；文档与 demo（基础/自动上传/限制/预览/异步删除/Form）同步；RN 原生端文件选择需通过 `onUpload` 扩展或业务侧接入选择器回填 |

## 反馈组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| ActionSheet 动作面板 | ✅ | 修复 hooks 在条件/循环内调用（抽出 Header/Item/Cancel 子组件），交互与测试用例保持一致 |
| Dialog 弹窗 | ✅ | 已具备受控/静态 API、OverlayStack 返回键处理与 a11y（dialog/alert）映射；实现复核通过 |
| DropdownMenu 下拉菜单 | ✅ | Menu/Item 实现与交互复核通过，遮罩与面板状态管理简洁；测试覆盖已存在 |
| Loading 加载 | ✅ | circular/spinner 三端兼容（Web 下禁用 native driver），tokens 可覆盖；实现复核通过 |
| Notify 消息提示 | ✅ | 顶部/底部通知组件（受控 + 静态 API），支持类型/自定义颜色/自动关闭与 safeArea；进入/退出动画一致 |
| Overlay 遮罩层 | ✅ | 通用遮罩组件，支持点击回调/滚动锁/返回键关闭与自定义层级；复用 Portal + OverlayStack |
| PullRefresh 下拉刷新 | ✅ | 基于 RefreshControl 的轻量实现，受控/非受控与成功态提示已覆盖；实现复核通过 |
| ShareSheet 分享面板 | ✅ | 修复 hooks 在循环内调用并统一 demo 入口/描述文案（展示面板/描述信息），交互保持一致 |

## 展示组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Avatar 头像 | ✅ | 新增头像组件（图片/文本/徽标/尺寸），示例与 Ant Design Mobile 对齐 |
| Badge 徽标 | ✅ | 数字/红点/最大值/偏移/独立展示已覆盖，子元素定位与测量逻辑稳定；实现复核通过 |
| Circle 环形进度条 | ✅ | Web 使用 conic-gradient，Native 端依赖 react-native-svg；支持顺/逆时针、起始位置与动画 |
| Collapse 折叠面板 | ✅ | 对齐参考实现：修正外边框/内边框语义并补齐 `border/isLink/size/readOnly`、`ref.toggle`；箭头旋转与内容测量动画优化，新增“禁用状态” demo（文案统一） |
| CountDown 倒计时 | ✅ | 对齐参考实现：补齐“自定义格式/自定义样式/手动控制” demo 并统一标题；默认文字样式 tokens 化；倒计时 tick 与 reset/onChange 语义对齐，文档补齐 format/events/类型/方法说明 |
| Divider 分割线 | ✅ | 对齐参考实现：实现/文档复核通过；demo 文案统一为“文字”，标题命名与结构对齐并补齐单测验证 |
| Empty 空状态 | ✅ | 对齐参考实现：预置 `default/error/network/search` 使用官方插画 URL，`image` 支持图片 URL/ReactNode 且自定义图片应用 `imageSize/imageStyle`；描述支持非文本节点，demo 结构与文案统一并补齐单测 |
| Field 输入项 | ✅ | onBlur 格式化、可达性 aria-describedby/invalid、样式 useMemo，清除/对齐逻辑已对齐官方 |
| FloatingBall 浮动球 | ✅ | 对齐参考实现：补齐 `menu/adsorb/boundary/offset` 与 ref `open/close`；demo 文案统一并补齐单测覆盖 |
| ImagePreview 图片预览 | ✅ | 对齐参考实现：支持受控与静态 API（`open/clear/Host`），补齐页码/指示器/关闭控制与 `beforeClose`；暂未实现缩放/拖拽等高级手势 |
| List 列表 | ✅ | 对齐参考实现：默认 `offset=300`、内部防并发与错误重试（error 状态阻止自动加载，点击 `errorText` 重试），补齐错误/下拉刷新 demo 与单测；因基于 `ScrollView`，下拉刷新建议用 `refreshControl` 组合 |
| SwipeCell 滑动单元格 | ✅ | 左右滑动单元格（PanResponder），支持左右操作区、阈值/动画、onOpen/onClose/onChange 与 ref 控制 |
| NoticeBar 通知栏 | ✅ | 对齐参考实现：滚动/换行/模式/自定义样式与 `onReplay`；补齐 `onPress` 类型与文档，支持非文本 `children`（避免嵌套 Text 崩溃）并补齐单测 |
| Popover 气泡卡片 | ✅ | demo 文案已统一为占位内容（按钮/内容/方向），便于对比展示效果 |
| Progress 进度条 | ✅ | 渐变兼容（Web 背景图/原生回退纯色）、动画容错&去抖、a11y progressbar、百分比/行高解析完善并补单测 |
| Skeleton 骨架屏 | ✅ | 对齐参考实现：默认最后一行 `60%`、title 高度跟随 `rowHeight`，avatar/title/row 动画一致；Web 下禁用 native driver，单测覆盖保持 |
| Tag 标签 | ✅ | 对齐参考实现：默认灰底白字（自定义 `color` 时保持可读性），支持 `plain/round/mark/closeable` 与自定义配色，并补齐默认色单测 |
| WaterMark 水印 | ✅ | 对齐参考实现：支持文字水印与全屏/局部覆盖，token 可配置（gap/rotate/fontSize/color/opacity）；补齐 `textStyle` 类型为 `StyleProp<TextStyle>`，暂不支持图片水印（大屏全屏会渲染较多节点） |

## 导航组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Grid 宫格 | ✅ | 对齐参考实现：支持列数/间距/边框/正方形/图文方向与反转/徽标/自定义内容；修复 `direction="horizontal"` 与 `reverse` 下图文间距与对齐 |
| IndexBar 索引栏 | ✅ | 对齐基础交互：侧边索引/吸顶标题/触摸指示器；修复 sticky 模式下跳转锚点需扣除吸顶高度（避免被标题遮挡），并补齐受控与自定义样式 demo |
| NavBar 导航栏 | ✅ | demo 文案统一为“标题/描述信息/按钮/内容”，避免业务化描述干扰 |
| Pagination 分页 | ✅ | 对齐参考实现：支持 `multi/simple`、受控/非受控、ellipsis 跳转；修复受控页码越界未被 clamp 的问题，并允许 `prevText/nextText/pageDesc/pageRender` 传非文本节点（避免 Text 嵌套崩溃） |
| Sidebar 侧边栏 | ✅ | 对齐参考实现：受控/非受控、禁用态与徽标提示；修复 `badge=0`/`title=0` 等渲染判定并支持非文本标题节点，移除未使用的 `SidebarProps.contentStyle` 干扰 |
| Tabs 选项卡 | ✅ | demo 文案已统一为“标签名/内容/描述信息”，保留 scrollspy/swipeable 展示能力 |
| Tabbar 标签栏 | ✅ | demo 文案统一为“标签名* / 内容 / 描述信息”，保留 badge/fixed 展示能力 |

## 业务组件

| 组件 | 状态 | 备注 |
| --- | --- | --- |
| Area 省市区 | ✅ | 基于 Picker 的省市区联动封装（`columnsNum`/受控/确认回调），demo 与单测已覆盖；数据结构兼容常见 AreaList（province_list/city_list/county_list） |
