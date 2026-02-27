<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <div
      class="task-checkbox"
      :class="{ checked: task.completed }"
      @click="$emit('toggle', task.id)"
    ></div>
    <div class="task-content">
      <div class="task-title">{{ task.title }}</div>
      <div class="task-meta">
        <span class="task-tag" :class="task.tag">{{
          tagLabels[task.tag]
        }}</span>
        <span class="task-priority" :class="task.priority">{{
          priorityLabels[task.priority]
        }}</span>
        <span class="task-time">{{ task.time }}</span>
      </div>
    </div>
    <div class="task-actions">
      <button
        class="task-action-btn edit"
        @click="$emit('edit', task)"
        title="编辑"
      >
        ✏️
      </button>
      <button
        class="task-action-btn delete"
        @click="$emit('delete', task.id)"
        title="删除"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "../types";
import { tagLabels, priorityLabels } from "../types";

defineProps<{
  task: Task;
}>();

defineEmits<{
  (e: "toggle", id: number): void;
  (e: "edit", task: Task): void;
  (e: "delete", id: number): void;
}>();
</script>

<style scoped>
.task-item {
  background: white;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  box-shadow: 0 4px 20px rgba(124, 106, 239, 0.06);
  transition: opacity 0.3s;
}

.task-item.completed {
  opacity: 0.6;
}

.task-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.task-checkbox.checked {
  background: linear-gradient(135deg, #7c6aef 0%, #59d0ff 100%);
  border-color: transparent;
}

.task-checkbox.checked::after {
  content: "✓";
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #9896b1;
}

.task-meta {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.task-tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}

.task-tag.work {
  background: #e8f4ff;
  color: #4a9eff;
}
.task-tag.personal {
  background: #ffeef4;
  color: #ff6b9a;
}
.task-tag.health {
  background: #e8fff0;
  color: #36d399;
}
.task-tag.study {
  background: #f0e8ff;
  color: #9b7cff;
}

.task-priority {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.task-priority.high {
  background: #ffeaea;
  color: #ff5252;
}
.task-priority.medium {
  background: #fff7e0;
  color: #ff9800;
}
.task-priority.low {
  background: #e8f5e9;
  color: #4caf50;
}

.task-time {
  font-size: 12px;
  color: #9896b1;
}

.task-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.task-action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #9896b1;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-action-btn:hover {
  background: #f8f7ff;
  color: #7c6aef;
}

.task-action-btn.delete:hover {
  color: #ff5252;
}
</style>
