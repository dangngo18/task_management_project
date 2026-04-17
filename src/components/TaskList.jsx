import React, { useContext, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import { filterTasks, sortTasks } from '../utils/taskUtils';
import { SORT_OPTIONS } from '../constants/taskConstants';

const TaskList = () => {
  const { 
    tasks, 
    filterStatus, 
    setFilterStatus, 
    sortBy, 
    setSortBy,
    updateTask,
    deleteTask,
    getFilteredAndSortedTasks
  } = useContext(TaskContext);

  const displayedTasks = useMemo(() => {
    return getFilteredAndSortedTasks();
  }, [getFilteredAndSortedTasks]);

  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      review: tasks.filter(t => t.status === 'review').length,
      done: tasks.filter(t => t.status === 'done').length
    };
  }, [tasks]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Task List View</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-white rounded p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
            <div className="text-xs text-gray-600 font-medium">Total Tasks</div>
          </div>
          <div className="bg-white rounded p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-gray-500">{taskStats.todo}</div>
            <div className="text-xs text-gray-600 font-medium">To Do</div>
          </div>
          <div className="bg-white rounded p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-blue-500">{taskStats.inProgress}</div>
            <div className="text-xs text-gray-600 font-medium">In Progress</div>
          </div>
          <div className="bg-white rounded p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-yellow-500">{taskStats.review}</div>
            <div className="text-xs text-gray-600 font-medium">Review</div>
          </div>
          <div className="bg-white rounded p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-green-500">{taskStats.done}</div>
            <div className="text-xs text-gray-600 font-medium">Done</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium cursor-pointer"
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium cursor-pointer"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Displaying {displayedTasks.length} of {tasks.length} tasks
        </h3>

        {displayedTasks.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600 font-medium">No tasks found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task}
                onUpdate={(updatedTask) => updateTask(task.id, updatedTask)}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
