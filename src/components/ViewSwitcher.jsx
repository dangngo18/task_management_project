import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { VIEW_MODES } from '../constants/taskConstants';

const ViewSwitcher = ({ onViewChange }) => {
  const { viewMode, setViewMode, tasks } = useContext(TaskContext);

  const handleViewChange = (mode) => {
    setViewMode(mode);
    onViewChange && onViewChange(mode);
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      done: tasks.filter(t => t.status === 'done').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length
    };
  };

  const stats = getTaskStats();
  const completionPercentage = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Management Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and organize your tasks efficiently</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-600 font-medium">Total Tasks</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => handleViewChange(VIEW_MODES.KANBAN)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                viewMode === VIEW_MODES.KANBAN
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📊 Kanban View
            </button>
            <button
              onClick={() => handleViewChange(VIEW_MODES.LIST)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                viewMode === VIEW_MODES.LIST
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📋 List View
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 font-medium mb-1">In Progress</div>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-sm text-gray-600 font-medium mb-1">Completion</div>
              <div className="text-2xl font-bold text-green-600">{completionPercentage}%</div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ViewSwitcher;
