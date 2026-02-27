import type { Task, TaskTag, TaskPriority } from "./types";

const STORAGE_KEY = "flowy-todo-tasks";
const NEXT_ID_KEY = "flowy-todo-nextid";
export const DEFAULT_NEXT_ID = 8;

function isTaskTag(value: string): value is TaskTag {
  return ["personal", "work", "health", "study"].includes(value);
}

function isTaskPriority(value: string): value is TaskPriority {
  return ["low", "medium", "high"].includes(value);
}

function isValidTask(task: unknown): task is Task {
  if (!task || typeof task !== "object") return false;
  const t = task as Record<string, unknown>;
  return (
    typeof t.id === "number" &&
    typeof t.title === "string" &&
    isTaskTag(String(t.tag)) &&
    isTaskPriority(String(t.priority)) &&
    typeof t.time === "string" &&
    typeof t.completed === "boolean"
  );
}

export const defaultTasks: Task[] = [
  {
    id: 1,
    title: "完成项目提案文档",
    tag: "work",
    priority: "high",
    time: "今天 · 下午 3:00",
    completed: false,
  },
  {
    id: 2,
    title: "准备周末的生日派对",
    tag: "personal",
    priority: "medium",
    time: "周六 · 下午 6:00",
    completed: false,
  },
  {
    id: 3,
    title: "晨跑 5 公里",
    tag: "health",
    priority: "low",
    time: "每天 · 早上 7:00",
    completed: false,
  },
  {
    id: 4,
    title: "阅读《设计心理学》第三章",
    tag: "study",
    priority: "medium",
    time: "已完成",
    completed: true,
  },
  {
    id: 5,
    title: "团队周会",
    tag: "work",
    priority: "high",
    time: "周三 · 上午 10:00",
    completed: true,
  },
  {
    id: 6,
    title: "给花浇水",
    tag: "personal",
    priority: "low",
    time: "每周二、四",
    completed: true,
  },
  {
    id: 7,
    title: "整理工作邮件",
    tag: "work",
    priority: "low",
    time: "每天",
    completed: true,
  },
];

export function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultTasks;
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.every(isValidTask)) {
      return parsed;
    }
    return defaultTasks;
  } catch {
    return defaultTasks;
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadNextId(): number {
  try {
    const saved = localStorage.getItem(NEXT_ID_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_NEXT_ID;
  } catch {
    return DEFAULT_NEXT_ID;
  }
}

export function saveNextId(nextId: number): void {
  localStorage.setItem(NEXT_ID_KEY, nextId.toString());
}
