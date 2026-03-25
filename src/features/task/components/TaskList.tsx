import { useTaskActions } from "../hooks/useTaskActions";
import { TaskCard } from "./TaskCard";
import { AnimatePresence, motion } from "framer-motion";

export const TaskList: React.FC = () => {
  const { filteredTasks } = useTaskActions();

  if (filteredTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center"
      >
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-gray-900">No tasks found</h3>
        <p className="mt-1 text-sm text-gray-600">
          Create a new task to get started with your task management!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Your Tasks</h2>
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </div>
  );
};
