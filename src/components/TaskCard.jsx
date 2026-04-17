import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '../constants/taskConstants';
import { formatDueDate } from '../utils/taskUtils';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { updateTask } = useContext(TaskContext);
  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus });
    onUpdate && onUpdate({ ...task, status: newStatus });
  };

  const handlePriorityChange = (newPriority) => {
    updateTask(task.id, { priority: newPriority });
    onUpdate && onUpdate({ ...task, priority: newPriority });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800 flex-1 break-words">{task.title}</h3>
        <button
          onClick={() => onDelete && onDelete(task.id)}
          className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
          title="Delete task"
        >
          ✕
        </button>
      </div>

      <p className="text-xs text-gray-600 mb-3">{task.description || 'No description'}</p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`text-xs font-medium px-2 py-1 rounded ${statusConfig.color} ${statusConfig.textColor}`}>
          {statusConfig.icon} {statusConfig.label}
        </span>
        <span className={`text-xs font-medium px-2 py-1 rounded ${priorityConfig.color} ${priorityConfig.textColor}`}>
          {priorityConfig.label}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Assigned to:</span>
          <span className="font-medium text-gray-700">{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Due:</span>
          <span className="font-medium text-gray-700">{formatDueDate(task.dueDate)}</span>
        </div>
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-300 rounded bg-white cursor-pointer"
          title="Change status"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
        <select
          value={task.priority}
          onChange={(e) => handlePriorityChange(e.target.value)}
          className="text-xs px-2 py-1 border border-gray-300 rounded bg-white cursor-pointer"
          title="Change priority"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
