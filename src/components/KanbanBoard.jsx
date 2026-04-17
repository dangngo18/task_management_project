import React, { useContext, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import { STATUS_CONFIG } from '../constants/taskConstants';

const KanbanBoard = () => {
  const { 
    tasks,
    updateTask,
    deleteTask,
    getTasksByStatus
  } = useContext(TaskContext);

  const columns = useMemo(() => [
    { id: 'todo', status: 'todo' },
    { id: 'in-progress', status: 'in-progress' },
    { id: 'review', status: 'review' },
    { id: 'done', status: 'done' }
  ], []);

  const tasksByStatus = useMemo(() => {
    const grouped = {};
    columns.forEach(col => {
      grouped[col.status] = getTasksByStatus(col.status);
    });
    return grouped;
  }, [columns, getTasksByStatus]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Kanban Board View</h2>
        <p className="text-gray-600 mb-6">Drag and drop tasks between columns or use the dropdown to change status</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(column => {
            const statusConfig = STATUS_CONFIG[column.status];
            const columnTasks = tasksByStatus[column.status] || [];

            return (
              <div 
                key={column.id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex flex-col"
              >
                <div className={`${statusConfig.color} ${statusConfig.textColor} rounded-lg p-3 mb-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{statusConfig.icon}</span>
                      <h3 className="font-bold text-lg">{statusConfig.label}</h3>
                    </div>
                    <span className="bg-white bg-opacity-80 text-gray-800 font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto max-h-96">
                  {columnTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-sm font-medium">No tasks here</p>
                    </div>
                  ) : (
                    columnTasks.map(task => (
                      <TaskCard 
                        key={task.id}
                        task={task}
                        onUpdate={(updatedTask) => updateTask(task.id, updatedTask)}
                        onDelete={deleteTask}
                      />
                    ))
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full text-sm text-blue-600 font-medium hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition">
                    + Add Task
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Board Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {columns.map(column => {
              const statusConfig = STATUS_CONFIG[column.status];
              const columnTasks = tasksByStatus[column.status] || [];
              const completionRate = tasks.length > 0 ? Math.round((columnTasks.length / tasks.length) * 100) : 0;

              return (
                <div key={column.id} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 font-medium mb-1">{statusConfig.label}</div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{columnTasks.length}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${statusConfig.color}`}
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{completionRate}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
