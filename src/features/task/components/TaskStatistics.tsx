import {
  LucideAlertCircle,
  LucideChartGantt,
  LucideCheckCircle,
  LucideClock,
} from "lucide-react";
import type { StatCardProps } from "../types/props";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { useTaskActions } from "../hooks/useTaskActions";
import { isTaskOverdue } from "../utils";

export function TaskStatistics() {
  const { tasks } = useTaskActions();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "DONE").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;
  const overdueTasks = tasks.filter(isTaskOverdue).length;

  const stats: StatCardProps[] = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <LucideChartGantt className="text-blue-500" />,
      color: "bg-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <LucideCheckCircle className="text-green-500" />,
      color: "bg-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: <LucideClock className="text-yellow-500" />,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: <LucideAlertCircle className="text-red-500" />,
      color: "bg-red-500",
      bgColor: "bg-red-200",
    },
  ];
  return (
    <div className="flex gap-x-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "flex-1 rounded-2xl bg-white p-6",
            stat.title == "Overdue" && "bg-red-100",
          )}
        >
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-2xl",
              stat.bgColor,
            )}
          >
            {stat.icon}
          </div>
          <p className="text-sm text-gray-600 mt-4 uppercase font-medium tracking-wide">
            {stat.title}
          </p>
          <h2 className="text-2xl font-bold text-gray-900">{stat.value}</h2>
        </motion.div>
      ))}
    </div>
  );
}
