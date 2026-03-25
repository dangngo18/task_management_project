import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../../components/ui/calendar";
import dayjs from "dayjs";
import type { TaskFormProps } from "../types/props";
import { useFormActions } from "../hooks/useFormActions";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Controller } from "react-hook-form";

export const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [date, setDate] = useState<Date | null>(
    initialTask?.deadline ? new Date(initialTask.deadline) : null,
  );
  const [time, setTime] = useState<string>(
    initialTask?.deadline
      ? dayjs(initialTask.deadline).format("HH:mm:ss")
      : "",
  );

  const { form, onSubmitForm, onCancelClick, isSubmitting } = useFormActions({
    initialTask,
    onSubmit,
    onCancel,
    isEditing,
    onReset: () => {
      setDate(initialTask?.deadline ? new Date(initialTask.deadline) : null);
      setTime(
        initialTask?.deadline
          ? dayjs(initialTask.deadline).format("HH:mm:ss")
          : "--:--:--",
      );
    },
  });

  const updateDeadline = (newDate: Date | null, newTime: string) => {
    if (newDate) {
      const resolvedTime = newTime || "00:00:00";
      const [h, m, s] = resolvedTime.split(":").map(Number);
      const combined = dayjs(newDate).hour(h).minute(m).second(s || 0).toISOString();
      form.setValue("deadline", combined, { shouldValidate: true });
    } else {
      form.setValue("deadline", "", { shouldValidate: true });
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmitForm)}
      onReset={onCancelClick}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup className="md:max-w-100">
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="TODO" className={"text-blue-600"}>
                        Todo
                      </SelectItem>
                      <SelectItem
                        value="IN_PROGRESS"
                        className={"text-yellow-600"}
                      >
                        In Progress
                      </SelectItem>
                      <SelectItem value="DONE" className={"text-green-600"}>
                        Done
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </FieldGroup>

        {/* Combined Date and Time Fields — wired to form deadline field */}
        <FieldGroup className="flex-row gap-x-4">
          <Field className="gap-2">
            <FieldLabel htmlFor="deadline">Deadline</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="w-full justify-between text-left data-[empty=true]:text-muted-foreground border-gray-300 rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {date ? (
                    dayjs(date).format("MMMM D, YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date || undefined}
                  onSelect={(newDate) => {
                    setDate(newDate!);
                    updateDeadline(newDate!, time);
                  }}
                  defaultMonth={date || undefined}
                />
              </PopoverContent>
            </Popover>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="deadlineTime">Time</FieldLabel>
            <Input
              type="time"
              id="deadlineTime"
              step="1"
              lang="en-GB"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                updateDeadline(date, e.target.value);
              }}
              className="bg-background"
            />
          </Field>
        </FieldGroup>
      </div>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Task Title *</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="Enter task title"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <textarea
                {...field}
                id="description"
                placeholder="Enter task description (optional)"
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </Field>
          )}
        />
      </FieldGroup>
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
