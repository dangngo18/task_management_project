import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "../schema";
import { useTaskActions } from "../hooks/useTaskActions";
import toast from "react-hot-toast";
import type { Task } from "../types";
import { useState } from "react";
import type { TaskFormData } from "../types/form";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit?: () => void;
  isEditing?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmit,
  isEditing = false,
}) => {
  const { handleAddTask, handleUpdateTask } = useTaskActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialTask
      ? {
          title: initialTask.title,
          description: initialTask.description || "",
          status: initialTask.status,
          deadline: initialTask.deadline || "",
        }
      : {
          title: "",
          description: "",
          status: "TODO",
          deadline: "",
        },
  });

  const onSubmitForm = async (data: TaskFormData) => {
    try {
      setIsSubmitting(true);
      if (isEditing && initialTask) {
        handleUpdateTask(initialTask.id, {
          title: data.title,
          description: data.description,
          status: data.status,
          deadline: data.deadline,
        });
        toast.success("Task updated successfully!");
      } else {
        handleAddTask({
          title: data.title,
          description: data.description,
          status: data.status,
          deadline: data.deadline,
        });
        toast.success("Task added successfully!");
      }
      reset();
      onSubmit?.();
    } catch (error) {
      toast.error("Failed to save task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Task Title *
        </label>
        <input
          {...register("title")}
          id="title"
          type="text"
          placeholder="Enter task title"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          id="description"
          placeholder="Enter task description (optional)"
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            {...register("status")}
            id="status"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700"
          >
            Deadline
          </label>
          <input
            {...register("deadline")}
            id="deadline"
            type="date"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};
