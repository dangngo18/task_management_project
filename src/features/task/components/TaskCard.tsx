import type { Task } from "../types";
import {
  formatDate,
  getStatusColor,
  isTaskOverdue,
  isDeadlineNear,
  getDueInText,
} from "../utils";
import { useTaskActions } from "../hooks/useTaskActions";
import { useState } from "react";
import { TaskForm } from "./TaskForm";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { LucidePen } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { handleDeleteTask, handleChangeStatus } = useTaskActions();
  const [isEditing, setIsEditing] = useState(false);
  const overdue = isTaskOverdue(task);
  const deadlineNear = isDeadlineNear(task);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      handleDeleteTask(task.id);
      toast.success("Task deleted");
    }
  };

  const handleStatusChange = (newStatus: Task["status"]) => {
    handleChangeStatus(task.id, newStatus);
    toast.success(`Task marked as ${newStatus}`);
  };

  return (
    <AnimatePresence mode="wait">
      {isEditing ? (
        <motion.div
          className="mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transitionEnd: { y: -10 } }}
          transition={{
            ease: "easeOut",
            duration: 0.15,
          }}
          key={"formEdit"}
        >
          <TaskForm
            initialTask={task}
            isEditing
            onSubmit={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        </motion.div>
      ) : (
        <motion.div
          key={"cardItem"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: 20,
            transitionEnd: {
              y: 0,
            },
          }}
          transition={{
            ease: "easeOut",
            duration: 0.2,
          }}
          className={`rounded-lg border p-4 shadow-sm transition-all ${
            overdue ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1 text-sm text-gray-600">{task.description}</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(task.status)}`}
            >
              {task.status}
            </span>

            {task.deadline && (
              <span
                className={`text-xs font-medium ${
                  overdue
                    ? "text-red-700"
                    : deadlineNear
                      ? "text-orange-700"
                      : "text-gray-600"
                }`}
              >
                {overdue && "⚠️ Overdue: "}
                {deadlineNear && !overdue && getDueInText(task.deadline)}
                {formatDate(task.deadline)}
              </span>
            )}
          </div>

          <div className="mt-4 flex gap-2 justify-between">
            <div className="space-x-4">
              {task.status !== "DONE" && task.status !== "TODO" && (
                <button
                  onClick={() => handleStatusChange("DONE")}
                  className="cursor-pointer rounded-md border border-green-600 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
                >
                  Complete
                </button>
              )}
              {task.status === "TODO" && (
                <button
                  onClick={() => handleStatusChange("IN_PROGRESS")}
                  className="cursor-pointer rounded-md border border-blue-600 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                >
                  Start
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="cursor-pointer rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 flex items-center gap-x-2"
              >
                Edit
                <LucidePen className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
