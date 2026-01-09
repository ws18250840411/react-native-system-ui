# Demo 对齐清单

> 本页用于跟踪各组件 demo 与 `docs/guide/demo-style.md` 的对齐进度，方便按优先级逐个完善。

## 处理顺序（约定）

1. **P0**：Button / Cell / Popup / Form（高频且影响整体观感）
2. **P1**：Picker/DatetimePicker/Calendar/Cascader/Area + Tabs/Tabbar/NavBar/IndexBar/Sidebar + DropdownMenu/ActionSheet/ShareSheet/Dialog
3. **P2**：其余组件按“使用频率 + 差异大小”推进

## 进度表

| 优先级 | 组件 | 状态 | 备注 |
| --- | --- | --- | --- |
| P0 | Button | ✅ | demo 文案已统一为中文，并对齐统一结构 |
| P0 | Cell | ✅ | demo 标题/结构已对齐统一结构，并统一占位文案 |
| P0 | Popup | ✅ | demo 触发/结构已对齐，并同步更新文档描述 |
| P0 | Form | ✅ | demo 文案已收敛，移除说明性 Text，改用 Toast/Field 展示 |
| P1 | Picker | ✅ | demo 结构已统一并更易横向对比 |
| P1 | DatetimePicker | ✅ | popup 用 Field 触发，去掉“当前选择”类文案 |
| P1 | Calendar | ✅ | demo 文案已收敛（移除“当前/已选”类表述）并统一代码风格 |
| P1 | Cascader | ✅ | 统一触发方式（Field + onClick），占位/展示文案对齐为“请选择地区” |
| P1 | Area | ✅ | 受控 demo 去掉说明性 Text，改用 Field 展示结果 |
| P1 | Tabs | ✅ | demo 文案统一为“标签名/内容/描述信息”，便于横向对比 |
| P1 | Tabbar | ✅ | demo 文案统一为“标签名* / 内容 / 描述信息” |
| P1 | NavBar | ✅ | demo 文案统一为“标题/描述信息/按钮/内容” |
| P1 | IndexBar | ✅ | 受控/自定义 demo 文案收敛，并统一标题为“索引 *” |
| P1 | Sidebar | ✅ | 已统一为“标签名*”并用 Toast 展示切换结果 |
| P1 | DropdownMenu | ✅ | 受控 demo 用 Toast 提示值，文案已对齐 |
| P1 | ActionSheet | ✅ | demo 入口文案统一为“展示面板”，描述文案收敛 |
| P1 | ShareSheet | ✅ | demo 入口文案统一为“展示面板”，描述文案收敛 |
| P1 | Dialog | ✅ | 文案去掉“当前”类表述，避免干扰对比 |
| P1 | ImagePreview | ✅ | 自定义索引文案收敛为“x / y”格式 |
| P2 | Checkbox | ✅ | demo 文案/结构已统一，并移除状态说明文本 |
| P2 | Radio | ✅ | 异步 demo 去掉说明性 Text，并统一“单选框1/2”文案 |
| P2 | Switch | ✅ | demo 文案已统一（无“当前/已选”类表述） |
| P2 | Stepper | ✅ | 已移除 demo 内说明性文本，保留纯展示 |
| P2 | Selector | ✅ | demo 文案已统一为“选项一/二/三”并补齐示例结构 |
| P2 | Slider | ✅ | Toast 提示文案统一，去掉“当前”类表述 |
| P2 | PasswordInput | ✅ | demo 文案收敛，去掉“当前”类表述 |
| P2 | Grid | ✅ | demo 文案统一为“文字”，并对齐统一结构 |
| P2 | Collapse | ✅ | demo 文案已统一（标题1/2/3、文字、描述信息）并补齐“禁用状态”示例 |
| P2 | CountDown | ✅ | demo 标题/结构已统一，并补齐“自定义格式/自定义样式/手动控制” |
| P2 | Divider | ✅ | 垂直分割线 demo 文案已统一为“文字” |
| P2 | Empty | ✅ | demo 文案统一为“描述信息/按钮”，图片类型示例结构统一 |
| P2 | Space | ✅ | demo 文案统一为中文（文字/按钮/信息/编辑/删除） |
| P2 | Tag | ✅ | demo 文案统一为中文（主要/成功/警告/危险/默认，尺寸同理） |
| P2 | 其它 | ⏳ | 后续按目录逐个推进（见 `docs/components/*`） |

## 快速定位命令

```bash
# 定位 demo 内的“当前/已选”等状态文案
rg -n "当前|已选" docs/components -S

# 定位 demo 内的英文 text= 文案
rg -n 'text="[^"]*[A-Za-z][^"]*"' docs/components -S
```
