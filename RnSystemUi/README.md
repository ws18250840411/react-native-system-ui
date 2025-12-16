# RnSystemUi

用于在原生端（iOS/Android/Web）运行 `react-native-system-ui` 的全部组件 Demo，菜单与 demo 列表从仓库 `docs/` 自动同步生成。

## 运行

1) 在仓库根目录安装依赖（用于本地组件库与 docs demo）

```bash
pnpm install
pnpm rn:demos:sync
```

2) 安装 Expo App 依赖并启动

```bash
cd RnSystemUi
npm install
npm run ios
# 或 npm run android / npm run start
```

## 同步规则

- 组件菜单来源：`rndoc.config.ts` 的 `menus['/components']`
- Demo 列表来源：`docs/components/*.md` 内的 `<code src="..." title="...">`
- 生成结果：`RnSystemUi/demo/registry.ts`（由 `scripts/generate-rn-demo-registry.js` 生成）
