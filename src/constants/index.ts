export const APP_NAME = 'Task Manager';
export const APP_DESCRIPTION = 'Organize your tasks efficiently';

export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'] as const;

export const STATUS_COLORS = {
  TODO: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  DONE: 'bg-green-100 text-green-800',
  DEFAULT: 'bg-gray-100 text-gray-800',
} as const;

export const STORAGE_KEYS = {
  TASKS: 'tasks',
  USER_PREFERENCES: 'user_preferences',
} as const;

export const DEADLINE_WARNING_DAYS = 1;
