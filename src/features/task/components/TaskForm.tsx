import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "../schema";
import { useTaskActions } from "../hooks/useTaskActions";
import toast from "react-hot-toast";
import type { Task } from "../types";
import { useState } from "react";
import type { TaskFormData } from "../types/form";
import { Button } from "../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../../../components/ui/calendar";
import dayjs from "dayjs";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit?: () => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const { handleAddTask, handleUpdateTask } = useTaskActions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | null>(
    initialTask?.deadline ? new Date(initialTask.deadline) : null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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
    } catch {
      toast.error("Failed to save task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCancelClick = () => {
    onCancel?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      onReset={onCancelClick}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="w-full mt-1 justify-between text-left data-[empty=true]:text-muted-foreground border-gray-300 rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {date ? (
                  dayjs(date).format("MMMM D, YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date || undefined}
                onSelect={(date) => {
                  setDate(date!);
                  // setDate to dealine field in form
                  if (date) {
                    const formattedDate = dayjs(date).format("YYYY-MM-DD");
                    setValue("deadline", formattedDate, { shouldDirty: true });
                  }
                }}
                defaultMonth={date || undefined}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
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
      <div className="flex gap-x-4">
        <Button
          type="reset"
          className="flex-1 cursor-pointer"
          size={"lg"}
          variant={"ghost"}
        >
          {isEditing ? "Cancel Edit" : "Cancel"}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          size={"lg"}
          className="flex-2 rounded-lg bg-blue-600 text-base font-medium text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update Task" : "Add Task"}
        </Button>
      </div>
    </form>
  );
};
