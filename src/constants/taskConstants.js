// Task Status Constants
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  DONE: 'done'
};

// Priority Levels - Feature Branch Version
export const PRIORITY_LEVELS = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  TRIVIAL: 'trivial'
};

// Priority Colors
export const PRIORITY_COLORS = {
  critical: 'bg-red-200 text-red-900',
  high: 'bg-orange-200 text-orange-900',
  medium: 'bg-yellow-200 text-yellow-900',
  low: 'bg-green-200 text-green-900',
  trivial: 'bg-gray-200 text-gray-900'
};

// View Modes
export const VIEW_MODES = {
  KANBAN: 'kanban',
  LIST: 'list'
};

// Sort Options
export const SORT_OPTIONS = [
  { value: 'priority', label: 'Priority' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'title', label: 'Title' }
];

// Status Configuration with colors and display names
export const STATUS_CONFIG = {
  [TASK_STATUS.TODO]: {
    label: 'To Do',
    color: 'bg-gray-100',
    textColor: 'text-gray-800',
    icon: '📋'
  },
  [TASK_STATUS.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    icon: '🔄'
  },
  [TASK_STATUS.REVIEW]: {
    label: 'Review',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: '👀'
  },
  [TASK_STATUS.DONE]: {
    label: 'Done',
    color: 'bg-green-100',
    textColor: 'text-green-800',
    icon: '✅'
  }
};

// Priority Configuration
export const PRIORITY_CONFIG = {
  [PRIORITY_LEVELS.HIGH]: {
    label: 'High',
    color: 'bg-red-100',
    textColor: 'text-red-800',
    value: 3
  },
  [PRIORITY_LEVELS.MEDIUM]: {
    label: 'Medium',
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    value: 2
  },
  [PRIORITY_LEVELS.LOW]: {
    label: 'Low',
    color: 'bg-green-100',
    textColor: 'text-green-800',
    value: 1
  }
};
