import { PRIORITY_LEVELS, PRIORITY_CONFIG } from '../constants/taskConstants';

/**
 * Filter tasks by multiple criteria
 */
export const filterTasks = (tasks, filters = {}) => {
  let filtered = [...tasks];

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(task => task.status === filters.status);
  }

  if (filters.priority) {
    filtered = filtered.filter(task => task.priority === filters.priority);
  }

  if (filters.assignee) {
    filtered = filtered.filter(task => task.assignee === filters.assignee);
  }

  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(task => 
      task.title.toLowerCase().includes(term) || 
      task.description?.toLowerCase().includes(term)
    );
  }

  return filtered;
};

/**
 * Sort tasks by specified criteria
 */
export const sortTasks = (tasks, sortBy = 'priority') => {
  const sorted = [...tasks];

  switch (sortBy) {
    case 'priority':
      sorted.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
      break;
    case 'dueDate':
      sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      break;
    case 'title':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'assignee':
      sorted.sort((a, b) => a.assignee.localeCompare(b.assignee));
      break;
    default:
      break;
  }

  return sorted;
};

/**
 * Group tasks by status
 */
export const groupTasksByStatus = (tasks, statusOrder = ['todo', 'in-progress', 'review', 'done']) => {
  const grouped = {};
  
  statusOrder.forEach(status => {
    grouped[status] = tasks.filter(task => task.status === status);
  });

  return grouped;
};

/**
 * Calculate task statistics
 */
export const calculateTaskStats = (tasks) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    overdue: 0,
    highPriority: tasks.filter(t => t.priority === 'high').length
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  stats.overdue = tasks.filter(task => {
    if (!task.dueDate || task.status === 'done') return false;
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  }).length;

  return stats;
};

/**
 * Get tasks due soon
 */
export const getTasksDueSoon = (tasks, daysAhead = 7) => {
  const today = new Date();
  const futureDate = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  return tasks.filter(task => {
    if (!task.dueDate || task.status === 'done') return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate <= futureDate;
  });
};

/**
 * Format due date for display
 */
export const formatDueDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/**
 * Get priority color
 */
export const getPriorityColor = (priority) => {
  return PRIORITY_CONFIG[priority] || PRIORITY_CONFIG[PRIORITY_LEVELS.LOW];
};

/**
 * Validate task data
 */
export const validateTask = (task) => {
  const errors = [];

  if (!task.title || task.title.trim() === '') {
    errors.push('Title is required');
  }

  if (task.title && task.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  if (!['high', 'medium', 'low'].includes(task.priority)) {
    errors.push('Invalid priority level');
  }

  if (!['todo', 'in-progress', 'review', 'done'].includes(task.status)) {
    errors.push('Invalid status');
  }

  if (task.dueDate && isNaN(new Date(task.dueDate).getTime())) {
    errors.push('Invalid due date');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
