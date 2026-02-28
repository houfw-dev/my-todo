<template>
  <div class="app-container">
    <header class="header">
      <div class="logo">
        <div class="logo-icon">☑</div>
        <h1 class="logo-text">Flowy Todo</h1>
      </div>
      <p class="tagline">让每一天都井井有条</p>
    </header>

    <div class="stats-container">
      <div class="stat-card total">
        <div class="stat-number">{{ totalCount }}</div>
        <div class="stat-label">全部任务</div>
      </div>
      <div class="stat-card in-progress">
        <div class="stat-number">{{ inProgressCount }}</div>
        <div class="stat-label">进行中</div>
      </div>
      <div class="stat-card completed">
        <div class="stat-number">{{ completedCount }}</div>
        <div class="stat-label">已完成</div>
      </div>
    </div>

    <div class="add-task-container">
      <input
        v-model="newTaskTitle"
        type="text"
        class="add-task-input"
        placeholder="添加新任务..."
        @keypress.enter="addTask"
      />
      <div class="add-task-options">
        <div class="select-group">
          <label>分类</label>
          <select v-model="newTaskTag">
            <option
              v-for="opt in tagOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>
        </div>
        <div class="select-group">
          <label>优先级</label>
          <select v-model="newTaskPriority">
            <option
              v-for="opt in priorityOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>
        </div>
        <button class="add-task-btn" @click="addTask">+</button>
      </div>
    </div>

    <div class="filter-tabs">
      <button
        v-for="filter in filters"
        :key="filter.value"
        class="filter-tab"
        :class="{ active: currentFilter === filter.value }"
        @click="currentFilter = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="task-list">
      <div v-if="filteredTasks.length === 0" class="empty-state">
        <div class="empty-state-icon">📝</div>
        <div>暂无任务</div>
      </div>
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @edit="openEditModal"
        @delete="deleteTask"
      />
    </div>

    <footer class="footer">用 ❤️ 打造，让生活更美好</footer>

    <EditModal
      v-if="showEditModal"
      :task="editingTask!"
      @close="showEditModal = false"
      @save="saveEditedTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import TaskItem from "./components/TaskItem.vue";
import EditModal from "./components/EditModal.vue";
import type { Task, FilterType, TaskTag, TaskPriority } from "./types";
import { tagOptions, priorityOptions, filterOptions } from "./types";
import {
  loadTasks,
  saveTasks,
  loadNextId,
  saveNextId,
  DEFAULT_NEXT_ID,
} from "./storage";

const tasks = ref<Task[]>([]);
const nextId = ref(DEFAULT_NEXT_ID);
const currentFilter = ref<FilterType>("all");
const newTaskTitle = ref("");
const newTaskTag = ref<TaskTag>("personal");
const newTaskPriority = ref<TaskPriority>("low");
const showEditModal = ref(false);
const editingTask = ref<Task | null>(null);

const filters = filterOptions;

const totalCount = computed(() => tasks.value.length);
const completedCount = computed(
  () => tasks.value.filter((t) => t.completed).length,
);
const inProgressCount = computed(
  () => tasks.value.length - completedCount.value,
);

const filteredTasks = computed(() => {
  if (currentFilter.value === "inProgress") {
    return tasks.value.filter((t) => !t.completed);
  }
  if (currentFilter.value === "completed") {
    return tasks.value.filter((t) => t.completed);
  }
  return tasks.value;
});

watch(
  tasks,
  (newTasks) => {
    saveTasks(newTasks);
  },
  { deep: true },
);

watch(nextId, (newNextId) => {
  saveNextId(newNextId);
});

function toggleTask(id: number) {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
}

function deleteTask(id: number) {
  if (confirm("确定要删除这个任务吗？")) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }
}

function openEditModal(task: Task) {
  editingTask.value = { ...task };
  showEditModal.value = true;
}

function saveEditedTask(updatedTask: Task) {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks.value = [
      ...tasks.value.slice(0, index),
      updatedTask,
      ...tasks.value.slice(index + 1),
    ];
  }
  showEditModal.value = false;
  editingTask.value = null;
}

function addTask() {
  const title = newTaskTitle.value.trim();
  if (!title) return;

  const now = new Date();
  const time = `今天 · ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const newTask: Task = {
    id: nextId.value++,
    title,
    tag: newTaskTag.value,
    priority: newTaskPriority.value,
    time,
    completed: false,
  };

  tasks.value.unshift(newTask);
  newTaskTitle.value = "";
}

onMounted(() => {
  tasks.value = loadTasks();
  nextId.value = loadNextId();
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  background: linear-gradient(180deg, #f8f5ff 0%, #f0f0ff 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px;
}

#app {
  width: 100%;
}

.app-container {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-top: 20px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #7c6aef 0%, #59d0ff 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.logo-text {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #7c6aef 0%, #59d0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  color: #9896b1;
  font-size: 14px;
}

.stats-container {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.stat-card {
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 20px 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(124, 106, 239, 0.08);
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-card.total .stat-number {
  color: #6b73ff;
}

.stat-card.in-progress .stat-number {
  color: #ff6b9a;
}

.stat-card.completed .stat-number {
  color: #8b7cff;
}

.stat-label {
  font-size: 12px;
  color: #9896b1;
}

.add-task-container {
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(124, 106, 239, 0.08);
}

.add-task-input {
  width: 100%;
  border: none;
  outline: none;
  padding: 12px 16px;
  font-size: 15px;
  color: #333;
  background: #f8f7ff;
  border-radius: 12px;
  margin-bottom: 12px;
}

.add-task-input::placeholder {
  color: #c4c2d5;
}

.add-task-options {
  display: flex;
  gap: 12px;
  align-items: center;
}

.select-group {
  flex: 1;
}

.select-group label {
  display: block;
  font-size: 12px;
  color: #9896b1;
  margin-bottom: 4px;
}

.select-group select {
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: #f8f7ff;
  border-radius: 8px;
  font-size: 13px;
  color: #333;
  outline: none;
  cursor: pointer;
}

.add-task-btn {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #7c6aef 0%, #59d0ff 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  flex-shrink: 0;
}

.add-task-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(124, 106, 239, 0.4);
}

.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.filter-tab {
  padding: 8px 20px;
  border: none;
  background: transparent;
  color: #9896b1;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.2s;
}

.filter-tab.active {
  background: white;
  color: #7c6aef;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(124, 106, 239, 0.1);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #9896b1;
}

.empty-state-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.footer {
  text-align: center;
  margin-top: 40px;
  color: #9896b1;
  font-size: 12px;
  padding-bottom: 40px;
}
</style>
