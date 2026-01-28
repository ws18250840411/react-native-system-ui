# Picker 体积压到 10KB 以内：分析（不改逻辑）

## 当前体积（gzip）

| 文件 | gzip | raw |
|------|------|-----|
| WheelPicker.js | 4599 | 17750 |
| Picker.js | 3772 | 14549 |
| utils.js | 1611 | 4767 |
| tokens.js | 501 | 1149 |
| index.js | 65 | 72 |
| **合计** | **10548** | **38287** |

目标：10548 → ≤10240，需减少 **≥308 bytes**。

---

## 不改逻辑下可做的优化

### 1. 删除源码中的中文注释（构建会保留）

- **utils.ts**：5 行注释（currentIndex/默认值/修正/深度/匹配逻辑）→ 会进 dist/utils.js。
- **WheelPicker.tsx**：6 行注释（级联选择器相关）→ 会进 dist/WheelPicker.js。
- **预估**：约 200–280 bytes gzip。

### 2. WheelPicker 内联动量常量

- `MOMENTUM_LIMIT_TIME = 500`、`MOMENTUM_LIMIT_DISTANCE = 8` 仅在 `shouldMomentum` 使用，可改为字面量 `500`、`8`，少两个长标识符。
- **预估**：约 15–25 bytes gzip。

### 3. utils.ts 去掉冗余变量

- `prepareColumns` 里 `const column = col` 仅用于 `column.options`、`column.defaultValue`，可直接用 `col`。
- **预估**：约 20–30 bytes gzip。

### 4. utils normalizeMultiple 内联单次使用变量

- `isCurrentValid` 只在一处参与赋值，可内联到 `values[index] = ...` 表达式。
- **预估**：约 10–20 bytes gzip。

---

## 合计与结论

- **合计预估**：约 245–355 bytes gzip，**有机会压到 10KB 以内**（需 ≥308 bytes）。
- **实施结果**：已按上述 1–4 在源码中实施，重新 build 后 **picker gzip 总体积 9849 bytes（9.62 KB）**，已低于 10KB；单测全部通过。
