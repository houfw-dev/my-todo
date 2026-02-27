# Flowy Todo

一个使用 Vue 3 + TypeScript + Vite 构建的美观待办事项应用程序。让每一天都井井有条！

## 功能特性

- ✅ **任务管理**: 添加、编辑、删除和标记任务完成
- 📂 **任务分类**: 个人、工作、健康、学习四大分类
- ⭐ **优先级**: 高、中、低三个优先级
- 🔍 **智能筛选**: 查看全部/进行中/已完成任务
- 📊 **统计面板**: 实时显示任务统计数据
- 💾 **本地持久化**: 使用 localStorage 自动保存数据
- 🎨 **精美界面**: 紫蓝渐变主题，现代化设计

## 技术栈

| 技术       | 版本 |
| ---------- | ---- |
| Vue        | 3.4+ |
| TypeScript | 5.3+ |
| Vite       | 5.0+ |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查并构建生产版本
npm run build

# 本地预览生产构建
npm run preview
```

## 项目结构

```
my-todo/
├── src/
│   ├── App.vue              # 主应用组件（状态管理）
│   ├── main.ts              # 应用入口
│   ├── style.css            # 全局样式
│   ├── types.ts             # TypeScript 类型定义
│   ├── storage.ts           # localStorage 持久化层
│   ├── vite-env.d.ts        # Vite 环境类型声明
│   └── components/
│       ├── TaskItem.vue     # 单个任务显示组件
│       └── EditModal.vue    # 编辑任务模态对话框
├── index.html               # HTML 模板
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 数据类型

### Task（任务）

```typescript
interface Task {
  id: number; // 任务 ID
  title: string; // 任务标题
  tag: TaskTag; // 分类：personal | work | health | study
  priority: TaskPriority; // 优先级：low | medium | high
  time: string; // 创建时间
  completed: boolean; // 是否完成
}
```

## 设计说明

- **配色方案**: 紫/蓝渐变主题（#7c6aef 到 #59d0ff）
- **响应式设计**: 最大宽度 420px，移动端优先
- **中文界面**: 为中文用户本地化
- **交互体验**: 柔和阴影、圆角设计、悬停动画

## 许可证

MIT

> happy coding !!!
