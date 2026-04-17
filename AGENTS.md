# 仓库协作约束

- 保持中文交流。
- 涉及组件库“极致压缩 / 极致实现 / 逐组件审计”任务时，优先读取并遵循 [`skills/react-native-system-ui-extreme-audit/SKILL.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/SKILL.md)。
- 每次修改组件实现、共享 `hooks / utils / internal / internal/aria`、组件分数、审计结论或验证结果后，必须同步更新 [`docs/component-extreme-audit.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/component-extreme-audit.md) 与 [`skills/react-native-system-ui-extreme-audit/references/project-state.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/references/project-state.md)。
- 如果 skill 的适用范围、流程或默认提示发生变化，必须同步更新 [`skills/react-native-system-ui-extreme-audit/SKILL.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/SKILL.md) 与 [`skills/react-native-system-ui-extreme-audit/agents/openai.yaml`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/agents/openai.yaml)。
- 每轮优化后，优先执行 `npm run build`、`npm run check:imports`、`npm run typecheck`，并诚实记录既有旧问题与新增问题的边界。
