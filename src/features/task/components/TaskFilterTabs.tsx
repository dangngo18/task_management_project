import { useTaskActions } from "../hooks/useTaskActions";
import type { TaskStatus } from "../types";
import { motion } from "framer-motion";

const FILTER_OPTIONS: Array<{ label: string; value: TaskStatus | "ALL" }> = [
  { label: "All", value: "ALL" },
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

export const TaskFilterTabs: React.FC = () => {
  const { filter, handleSetFilter } = useTaskActions();

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
      {FILTER_OPTIONS.map((option) => (
        <motion.button
          key={option.value}
          onClick={() => handleSetFilter(option.value)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            filter === option.value
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {option.label}
        </motion.button>
      ))}
    </div>
  );
};
