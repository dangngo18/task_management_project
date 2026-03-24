import { type Task } from "../";
import { STATUS_COLORS } from "../../../constants";
import dayjs from "../../../lib/dayjs";

export const isTaskOverdue = (task: Task): boolean => {
  if (!task.deadline) return false;
  return (
    dayjs(task.deadline).isBefore(dayjs(), "day") && task.status !== "DONE"
  );
};

export const isDeadlineNear = (task: Task): boolean => {
  if (!task.deadline) return false;
  const deadline = dayjs(task.deadline);
  const today = dayjs();
  const daysUntil = deadline.diff(today, "day");
  return daysUntil >= 0 && daysUntil <= 3 && task.status !== "DONE";
};

export const formatDate = (date?: string): string => {
  if (!date) return "";
  return dayjs(date).format("MMM DD, YYYY");
};

export const getStatusColor = (status: Task["status"]): string => {
  switch (status) {
    case "TODO":
      return STATUS_COLORS.TODO;
    case "IN_PROGRESS":
      return STATUS_COLORS.IN_PROGRESS;
    case "DONE":
      return STATUS_COLORS.DONE;
    default:
      return STATUS_COLORS.DEFAULT;
  }
};
