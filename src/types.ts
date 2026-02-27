export type TaskTag = "personal" | "work" | "health" | "study";
export type TaskPriority = "low" | "medium" | "high";
export type FilterType = "all" | "inProgress" | "completed";

export interface Task {
  id: number;
  title: string;
  tag: TaskTag;
  priority: TaskPriority;
  time: string;
  completed: boolean;
}

export const tagLabels: Record<TaskTag, string> = {
  personal: "个人",
  work: "工作",
  health: "健康",
  study: "学习",
};

export const priorityLabels: Record<TaskPriority, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export const tagOptions: { value: TaskTag; label: string }[] = [
  { value: "personal", label: "个人" },
  { value: "work", label: "工作" },
  { value: "health", label: "健康" },
  { value: "study", label: "学习" },
];

export const priorityOptions: { value: TaskPriority; label: string }[] = [
  { value: "high", label: "高" },
  { value: "medium", label: "中" },
  { value: "low", label: "低" },
];

export const filterOptions: { value: FilterType; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "inProgress", label: "进行中" },
  { value: "completed", label: "已完成" },
];
