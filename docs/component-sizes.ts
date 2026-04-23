/**
 * 组件体积数据（由 scripts/generate-docs-size-data.mjs 生成，以组件为主）
 * 数据源: dist/es/components
 * 口径: 各组件目录下 .ts/.tsx/.js 文件分别 gzip 后相加（字节），非实际打包单 chunk 体积。
 * 先执行 pnpm run build 再执行 pnpm run docs:update-size 将优先使用 dist/es/components，必要时回退到 dist/cjs/components。
 * 同命令会同步 README.md 中 <!-- docs:component-sizes:start/end --> 内表格及文首/「核心优势」中的均值与最小组件体积。
 */
export default [
  {
    "name": "tabs",
    "size": 7023
  },
  {
    "name": "picker",
    "size": 6751
  },
  {
    "name": "dialog",
    "size": 4634
  },
  {
    "name": "cascader",
    "size": 4616
  },
  {
    "name": "form",
    "size": 4597
  },
  {
    "name": "field",
    "size": 4473
  },
  {
    "name": "radio",
    "size": 4362
  },
  {
    "name": "checkbox",
    "size": 4322
  },
  {
    "name": "calendar",
    "size": 4298
  },
  {
    "name": "number-keyboard",
    "size": 4150
  },
  {
    "name": "slider",
    "size": 4148
  },
  {
    "name": "popup",
    "size": 3984
  },
  {
    "name": "swiper",
    "size": 3880
  },
  {
    "name": "stepper",
    "size": 3667
  },
  {
    "name": "toast",
    "size": 3519
  },
  {
    "name": "button",
    "size": 3483
  },
  {
    "name": "notify",
    "size": 3439
  },
  {
    "name": "image-preview",
    "size": 3377
  },
  {
    "name": "cell",
    "size": 3293
  },
  {
    "name": "grid",
    "size": 3108
  },
  {
    "name": "notice-bar",
    "size": 2914
  },
  {
    "name": "tabbar",
    "size": 2870
  },
  {
    "name": "collapse",
    "size": 2840
  },
  {
    "name": "action-sheet",
    "size": 2824
  },
  {
    "name": "password-input",
    "size": 2822
  },
  {
    "name": "image",
    "size": 2745
  },
  {
    "name": "config-provider",
    "size": 2559
  },
  {
    "name": "datetime-picker",
    "size": 2497
  },
  {
    "name": "sidebar",
    "size": 2471
  },
  {
    "name": "share-sheet",
    "size": 2393
  },
  {
    "name": "selector",
    "size": 2378
  },
  {
    "name": "progress",
    "size": 2279
  },
  {
    "name": "nav-bar",
    "size": 2216
  },
  {
    "name": "portal",
    "size": 2093
  },
  {
    "name": "circle",
    "size": 2090
  },
  {
    "name": "typography",
    "size": 2064
  },
  {
    "name": "search",
    "size": 1999
  },
  {
    "name": "tag",
    "size": 1866
  },
  {
    "name": "water-mark",
    "size": 1835
  },
  {
    "name": "skeleton",
    "size": 1822
  },
  {
    "name": "badge",
    "size": 1800
  },
  {
    "name": "space",
    "size": 1575
  },
  {
    "name": "avatar",
    "size": 1551
  },
  {
    "name": "divider",
    "size": 1451
  },
  {
    "name": "empty",
    "size": 1437
  },
  {
    "name": "flex",
    "size": 1388
  },
  {
    "name": "input",
    "size": 1325
  },
  {
    "name": "area",
    "size": 1229
  },
  {
    "name": "count-down",
    "size": 1131
  },
  {
    "name": "switch",
    "size": 1090
  },
  {
    "name": "loading",
    "size": 1060
  },
  {
    "name": "overlay",
    "size": 649
  },
  {
    "name": "error-boundary",
    "size": 616
  },
  {
    "name": "safe-area-view",
    "size": 402
  }
]