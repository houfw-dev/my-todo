# 修改记录

## 功能变更

### 默认筛选器调整

- **修改内容**: 将首页默认显示的标签从"全部"改为"进行中"
- **修改位置**: `src/App.vue:117`
- **修改前**: `const currentFilter = ref<FilterType>("all");`
- **修改后**: `const currentFilter = ref<FilterType>("inProgress");`

## 修改目的

让用户打开应用时优先看到正在进行中的任务，提升使用体验，帮助用户更聚焦于当前需要完成的工作。
