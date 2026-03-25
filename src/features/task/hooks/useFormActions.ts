import { useForm } from "react-hook-form";
import type { TaskFormData } from "../types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "../schema";
import type { TaskFormProps } from "../types/props";
import { useState } from "react";
import { useTaskActions } from "./useTaskActions";
import toast from "react-hot-toast";

export const useFormActions = <T extends TaskFormProps>({
  initialTask,
  onSubmit,
  onCancel,
  onReset,
  isEditing = false,
}: T & { onReset?: () => void }) => {
  const { handleAddTask, handleUpdateTask } = useTaskActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TaskFormData>({
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
      form.reset();
      onReset?.();
      onSubmit?.();
    } catch {
      toast.error("Failed to save task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCancelClick = () => {
    form.reset();
    onReset?.();
    onCancel?.();
  };

  return {
    form,
    onSubmitForm,
    onCancelClick,
    isSubmitting,
  };
};
