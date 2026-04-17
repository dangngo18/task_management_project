import React, { createContext, useState, useCallback } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design landing page', status: 'todo', priority: 'high', assignee: 'Alice', dueDate: '2024-04-20' },
    { id: 2, title: 'Setup database schema', status: 'in-progress', priority: 'high', assignee: 'Bob', dueDate: '2024-04-18' },
    { id: 3, title: 'Create API endpoints', status: 'in-progress', priority: 'medium', assignee: 'Charlie', dueDate: '2024-04-25' },
    { id: 4, title: 'Write unit tests', status: 'todo', priority: 'medium', assignee: 'Alice', dueDate: '2024-04-30' },
    { id: 5, title: 'Setup CI/CD pipeline', status: 'done', priority: 'high', assignee: 'Bob', dueDate: '2024-04-15' },
    { id: 6, title: 'Document API', status: 'todo', priority: 'low', assignee: 'Charlie', dueDate: '2024-05-05' },
  ]);

  const [viewMode, setViewMode] = useState('kanban');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const addTask = useCallback((task) => {
    // Feature branch: Enhanced task creation with better defaults
    const newTask = {
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      ...task,
      status: task.status || 'todo',
      priority: task.priority || 'medium',
      tags: task.tags || [],
      comments: []
    };
    // Validate before adding
    if (!newTask.title) {
      console.warn('Warning: Task created without title');
    }
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, [tasks]);

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, ...updates } : task));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const getFilteredAndSortedTasks = useCallback(() => {
    let filtered = filterStatus === 'all' ? tasks : tasks.filter(t => t.status === filterStatus);
    
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'dueDate') {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return filtered;
  }, [tasks, filterStatus, sortBy]);

  const getTasksByStatus = useCallback((status) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  const value = {
    tasks,
    viewMode,
    setViewMode,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
    getFilteredAndSortedTasks,
    getTasksByStatus,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
