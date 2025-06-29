# blazwitcher

## 0.5.4

### Patch Changes

- b20f451: filter the history that is not a valid url or is a chrome-extension url

## 0.5.3

### Patch Changes

- 8d20cc0: new panel for showing contact and new icon for creating issue

## 0.5.2

### Patch Changes

- b23cfdf: improve display mode in iframe window

## 0.5.1

### Patch Changes

- 9e2a53f: new icon for setting entrance and separate css for options page

## 0.5.0

### Minor Changes

- release setting page and upgrade text-search-engine to 1.4.4

### Patch Changes

- 1f37b82: setting page
- 4ee54c9: add search panel & window config
- a7e02a5: get windowConfig from extension storage and apply it when restart it
- 002fd17: add language setting plugin
- 149f406: add monorepo
- b952ee2: move history param from web storage to extension storage
- 930af33: fix js error

## 0.4.2

### Patch Changes

- 98f7b3b: readjust the window size opened

## 0.4.1

### Patch Changes

- 98fdfbb: update languageAtom from navigator.language when launch and optimize contants for i18n atom
- 2b8d646: refine ts type and optimize css for divide item

## 0.4.0

### Minor Changes

- d026c0c: new feature for top suggestions and display empty status when no data found

### Patch Changes

- 3dbe00d: optimize type hints for i18n
- 6fa3efc: init setting page and use chrome i18n

## 0.3.2

### Patch Changes

- ea00224: fix active tab in sidePanel
- 1b0ac8b: add i18n with jotai

## 0.3.1

### Patch Changes

- 26ba805: support open a modal when current tab is in fullscreen state
- 26ba805: 支持在全屏状态下打开一个模态框

## 0.3.0

### Minor Changes

- c40830f: add plugin system to integrate commands
- c40830f: 添加插件系统以集成命令

## 0.2.3

### Patch Changes

- upgrade text-search-engine to 1.4.2
- 升级 text-search-engine 到 1.4.2 版本

## 0.2.2

### Patch Changes

- 6ab84e8: feat: add debounce when change active tab
- 6ab84e8: 功能：切换活动标签页时添加防抖
- 487b209: Determine if chrome.tabGroups exists to adapt for 360 Browser
- 487b209: 检测 chrome.tabGroups 是否存在以适配 360 浏览器

## 0.2.1

### Patch Changes

- 50bb1b6: feat: add tabGroup title and color
- 50bb1b6: 功能：添加标签组标题和颜色

## 0.2.0

### Minor Changes

- 27d2199: support hybrid searching which include host and title
- 27d2199: 支持包含域名和标题的混合搜索

## 0.1.10

### Patch Changes

- 4598a09: optimize operation button styles
- 4598a09: 优化操作按钮样式
- 8c56975: only listen to keydown event when not in composition(typing chinese in pinyin)
- 8c56975: 仅在非输入法组合状态下监听键盘按下事件（使用拼音输入中文时）

## 0.1.9

### Patch Changes

- 977844c: add strictness coefficient to filter out results that are not highly relevant to the search value
- 977844c: 添加严格系数以过滤掉与搜索值相关度不高的结果

## 0.1.7

### Patch Changes

- efa9a0f: 优化中文输入法状态下通过拼音搜索
- efa9a0f: Optimize pinyin search under Chinese input method state

## 0.1.6

### Patch Changes

- 9df10bb: add operations for each item which includes query, delete, close and so on
- 9df10bb: 为每个项目添加操作，包括查询、删除、关闭等
