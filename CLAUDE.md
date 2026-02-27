# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 提供在此代码仓库中工作的指导。

## 项目概述

这是 **Flowy Todo**，一个使用 Vue 3 + TypeScript + Vite 构建的美观待办事项应用程序。它具有分类、优先级和 localStorage 持久化的任务管理功能。

## 技术栈

- **框架**: Vue 3（使用 `<script setup>` 的组合式 API）
- **语言**: TypeScript
- **构建工具**: Vite 5
- **样式**: Vue SFC 中的 scoped CSS

## 常用命令

| 命令                | 说明                   |
| ------------------- | ---------------------- |
| `npm run dev`     | 启动开发服务器         |
| `npm run build`   | 类型检查并构建生产版本 |
| `npm run preview` | 本地预览生产构建       |

## 架构

### 核心文件

- **`src/App.vue`**: 带有状态管理的主应用组件

  - 任务列表管理（添加、切换、编辑、删除）
  - 筛选（全部/进行中/已完成）
  - 统计显示（全部、进行中、已完成）
  - 用于自动持久化的 localStorage 监听器
- **`src/types.ts`**: TypeScript 类型定义

  - `Task`: 任务接口，包含 id、title、tag、priority、time、completed
  - `TaskTag`: 'personal' | 'work' | 'health' | 'study'
  - `TaskPriority`: 'low' | 'medium' | 'high'
  - `FilterType`: 'all' | 'inProgress' | 'completed'
- **`src/storage.ts`**: localStorage 持久化层

  - `loadTasks()` / `saveTasks()`: 任务列表存储
  - `loadNextId()` / `saveNextId()`: ID 计数器存储
  - `defaultTasks`: 默认示例数据

### 组件

- **`src/components/TaskItem.vue`**: 单个任务显示组件

  - 事件: `toggle(id)`、`edit(task)`、`delete(id)`
- **`src/components/EditModal.vue`**: 编辑任务模态对话框

  - 属性: `task`
  - 事件: `close()`、`save(task)`

## 数据流

1. 状态在 `App.vue` 中使用 Vue 的 `ref` 和 `computed` 管理
2. `watch` 监听任务变化并自动保存到 localStorage
3. 组件通过事件（`emit`）通信
4. 所有任务通过 localStorage 在会话间持久化

## 设计说明

- 配色方案：紫/蓝渐变主题（#7c6aef 到 #59d0ff）
- 最大宽度容器：420px（移动端优先设计）
- 中文 UI 标签（为中文用户本地化）
- 柔和阴影和圆角，外观现代

**重要提示**：修改统计数据时，请记住 Vue 的 ref 在计算属性中需要使用 `.value` 访问（请参阅 App.vue 中的 `totalCount`、`inProgressCount`、`completedCount`）。

## 注意事项

每次回答的最后，必须追加下面这句话：

> happy coding !!!
