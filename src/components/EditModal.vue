<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3 class="modal-title">编辑任务</h3>
      <input
        ref="inputRef"
        v-model="form.title"
        type="text"
        class="modal-input"
        placeholder="任务内容..."
        @keypress.enter="save"
      />
      <div class="modal-select-group">
        <label>分类</label>
        <select v-model="form.tag">
          <option v-for="opt in tagOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
      <div class="modal-select-group">
        <label>优先级</label>
        <select v-model="form.priority">
          <option
            v-for="opt in priorityOptions"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>
      <div class="modal-actions">
        <button class="modal-btn cancel" @click="$emit('close')">取消</button>
        <button class="modal-btn save" @click="save">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import type { Task } from "../types";
import { tagOptions, priorityOptions } from "../types";

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", task: Task): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const form = reactive({
  title: props.task.title,
  tag: props.task.tag,
  priority: props.task.priority,
});

watch(
  () => props.task,
  (newTask) => {
    form.title = newTask.title;
    form.tag = newTask.tag;
    form.priority = newTask.priority;
    inputRef.value?.focus();
  },
  { immediate: true },
);

function save() {
  if (!form.title.trim()) {
    alert("请输入任务内容");
    return;
  }
  emit("save", {
    ...props.task,
    title: form.title.trim(),
    tag: form.tag,
    priority: form.priority,
  });
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 20px 60px rgba(124, 106, 239, 0.2);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.modal-input {
  width: 100%;
  border: none;
  outline: none;
  padding: 14px 16px;
  font-size: 15px;
  color: #333;
  background: #f8f7ff;
  border-radius: 12px;
  margin-bottom: 16px;
}

.modal-select-group {
  margin-bottom: 16px;
}

.modal-select-group label {
  display: block;
  font-size: 13px;
  color: #9896b1;
  margin-bottom: 8px;
}

.modal-select-group select {
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: #f8f7ff;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  outline: none;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-btn.cancel {
  background: #f8f7ff;
  color: #9896b1;
}

.modal-btn.cancel:hover {
  background: #ebeaf5;
}

.modal-btn.save {
  background: linear-gradient(135deg, #7c6aef 0%, #59d0ff 100%);
  color: white;
}

.modal-btn.save:hover {
  box-shadow: 0 4px 15px rgba(124, 106, 239, 0.4);
}
</style>
